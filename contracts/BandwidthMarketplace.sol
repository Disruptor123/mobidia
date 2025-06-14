// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./MBDToken.sol";

contract BandwidthMarketplace is ReentrancyGuard, Pausable, AccessControl {
    using SafeMath for uint256;
    using Counters for Counters.Counter;
    using Address for address payable;
    
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant MODERATOR_ROLE = keccak256("MODERATOR_ROLE");
    
    MBDToken public immutable mbdToken;
    
    struct DataListing {
        address seller;
        uint256 dataAmount; // in MB
        uint256 pricePerMB; // in wei
        uint256 expiryTime;
        uint256 createdAt;
        bool active;
        string dataType; // "4G", "5G", "WiFi"
        string region; // Geographic region
        uint256 minPurchase; // Minimum purchase amount in MB
        uint256 maxPurchase; // Maximum purchase amount in MB
    }
    
    struct DataPurchase {
        address buyer;
        address seller;
        uint256 listingId;
        uint256 dataAmount;
        uint256 totalPrice;
        uint256 timestamp;
        uint256 confirmationDeadline;
        bool completed;
        bool refunded;
        bool disputed;
    }
    
    struct UserStats {
        uint256 totalSold;
        uint256 totalPurchased;
        uint256 successfulTransactions;
        uint256 reputation; // 0-10000 (100.00%)
        bool isVerified;
    }
    
    mapping(uint256 => DataListing) public listings;
    mapping(uint256 => DataPurchase) public purchases;
    mapping(address => uint256[]) public userListings;
    mapping(address => uint256[]) public userPurchases;
    mapping(address => UserStats) public userStats;
    mapping(string => bool) public supportedDataTypes;
    mapping(address => bool) public bannedUsers;
    
    Counters.Counter private _listingIdCounter;
    Counters.Counter private _purchaseIdCounter;
    
    uint256 public platformFeePercent = 250; // 2.5% (basis points)
    uint256 public constant MAX_PLATFORM_FEE = 1000; // 10% max
    uint256 public constant CONFIRMATION_PERIOD = 24 hours;
    uint256 public constant MIN_LISTING_DURATION = 1 hours;
    uint256 public constant MAX_LISTING_DURATION = 30 days;
    
    address public feeRecipient;
    uint256 public totalVolume;
    uint256 public totalFees;
    
    event ListingCreated(
        uint256 indexed listingId, 
        address indexed seller, 
        uint256 dataAmount, 
        uint256 pricePerMB,
        string dataType,
        string region
    );
    event ListingCancelled(uint256 indexed listingId);
    event DataPurchased(
        uint256 indexed purchaseId, 
        uint256 indexed listingId, 
        address indexed buyer, 
        uint256 dataAmount,
        uint256 totalPrice
    );
    event TransactionCompleted(uint256 indexed purchaseId);
    event TransactionRefunded(uint256 indexed purchaseId);
    event DisputeRaised(uint256 indexed purchaseId);
    event UserBanned(address indexed user, bool banned);
    
    modifier onlyActiveUser() {
        require(!bannedUsers[msg.sender], "User is banned");
        _;
    }
    
    modifier validListing(uint256 listingId) {
        require(listingId < _listingIdCounter.current(), "Invalid listing ID");
        _;
    }
    
    modifier validPurchase(uint256 purchaseId) {
        require(purchaseId < _purchaseIdCounter.current(), "Invalid purchase ID");
        _;
    }
    
    constructor(address _mbdToken, address _feeRecipient, address admin) {
        require(_mbdToken != address(0), "Invalid token address");
        require(_feeRecipient != address(0), "Invalid fee recipient");
        require(admin != address(0), "Invalid admin address");
        
        mbdToken = MBDToken(_mbdToken);
        feeRecipient = _feeRecipient;
        
        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        _grantRole(ADMIN_ROLE, admin);
        
        // Initialize supported data types
        supportedDataTypes["4G"] = true;
        supportedDataTypes["5G"] = true;
        supportedDataTypes["WiFi"] = true;
        supportedDataTypes["LTE"] = true;
    }
    
    function createListing(
        uint256 _dataAmount,
        uint256 _pricePerMB,
        uint256 _duration,
        string memory _dataType,
        string memory _region,
        uint256 _minPurchase,
        uint256 _maxPurchase
    ) external whenNotPaused onlyActiveUser returns (uint256) {
        require(_dataAmount > 0, "Data amount must be positive");
        require(_pricePerMB > 0, "Price must be positive");
        require(_duration >= MIN_LISTING_DURATION && _duration <= MAX_LISTING_DURATION, "Invalid duration");
        require(supportedDataTypes[_dataType], "Unsupported data type");
        require(bytes(_region).length > 0, "Region cannot be empty");
        require(_minPurchase > 0 && _minPurchase <= _dataAmount, "Invalid min purchase");
        require(_maxPurchase >= _minPurchase && _maxPurchase <= _dataAmount, "Invalid max purchase");
        
        uint256 listingId = _listingIdCounter.current();
        _listingIdCounter.increment();
        
        listings[listingId] = DataListing({
            seller: msg.sender,
            dataAmount: _dataAmount,
            pricePerMB: _pricePerMB,
            expiryTime: block.timestamp.add(_duration),
            createdAt: block.timestamp,
            active: true,
            dataType: _dataType,
            region: _region,
            minPurchase: _minPurchase,
            maxPurchase: _maxPurchase
        });
        
        userListings[msg.sender].push(listingId);
        
        emit ListingCreated(listingId, msg.sender, _dataAmount, _pricePerMB, _dataType, _region);
        return listingId;
    }
    
    function purchaseData(uint256 _listingId, uint256 _dataAmount) 
        external 
        payable 
        whenNotPaused 
        onlyActiveUser
        validListing(_listingId)
        nonReentrant 
        returns (uint256) 
    {
        DataListing storage listing = listings[_listingId];
        
        require(listing.active, "Listing not active");
        require(block.timestamp < listing.expiryTime, "Listing expired");
        require(_dataAmount >= listing.minPurchase, "Below minimum purchase");
        require(_dataAmount <= listing.maxPurchase, "Above maximum purchase");
        require(_dataAmount <= listing.dataAmount, "Insufficient data available");
        require(msg.sender != listing.seller, "Cannot buy own listing");
        
        uint256 totalPrice = _dataAmount.mul(listing.pricePerMB);
        require(msg.value >= totalPrice, "Insufficient payment");
        
        // Calculate fees
        uint256 platformFee = totalPrice.mul(platformFeePercent).div(10000);
        uint256 sellerAmount = totalPrice.sub(platformFee);
        
        // Update listing
        listing.dataAmount = listing.dataAmount.sub(_dataAmount);
        if (listing.dataAmount == 0) {
            listing.active = false;
        }
        
        // Create purchase record
        uint256 purchaseId = _purchaseIdCounter.current();
        _purchaseIdCounter.increment();
        
        purchases[purchaseId] = DataPurchase({
            buyer: msg.sender,
            seller: listing.seller,
            listingId: _listingId,
            dataAmount: _dataAmount,
            totalPrice: totalPrice,
            timestamp: block.timestamp,
            confirmationDeadline: block.timestamp.add(CONFIRMATION_PERIOD),
            completed: false,
            refunded: false,
            disputed: false
        });
        
        userPurchases[msg.sender].push(purchaseId);
        
        // Transfer platform fee immediately
        payable(feeRecipient).sendValue(platformFee);
        
        totalVolume = totalVolume.add(totalPrice);
        totalFees = totalFees.add(platformFee);
        
        // Mint bonus MBD tokens to seller (1% of transaction value)
        uint256 bonusTokens = totalPrice.mul(100).div(10000).div(1e12); // Convert wei to token units
        if (bonusTokens > 0) {
            mbdToken.mint(listing.seller, bonusTokens);
        }
        
        // Refund excess payment
        if (msg.value > totalPrice) {
            payable(msg.sender).sendValue(msg.value.sub(totalPrice));
        }
        
        emit DataPurchased(purchaseId, _listingId, msg.sender, _dataAmount, totalPrice);
        return purchaseId;
    }
    
    function confirmDataTransfer(uint256 _purchaseId) 
        external 
        validPurchase(_purchaseId)
        nonReentrant 
    {
        DataPurchase storage purchase = purchases[_purchaseId];
        require(purchase.buyer == msg.sender, "Not the buyer");
        require(!purchase.completed && !purchase.refunded, "Transaction already finalized");
        require(!purchase.disputed, "Transaction disputed");
        
        purchase.completed = true;
        
        // Release funds to seller
        uint256 platformFee = purchase.totalPrice.mul(platformFeePercent).div(10000);
        uint256 sellerAmount = purchase.totalPrice.sub(platformFee);
        payable(purchase.seller).sendValue(sellerAmount);
        
        // Update user stats
        _updateUserStats(purchase.seller, purchase.buyer, purchase.dataAmount, true);
        
        // Mint reward tokens to buyer (0.5% of transaction value)
        uint256 rewardTokens = purchase.totalPrice.mul(50).div(10000).div(1e12);
        if (rewardTokens > 0) {
            mbdToken.mint(msg.sender, rewardTokens);
        }
        
        emit TransactionCompleted(_purchaseId);
    }
    
    function raiseDispute(uint256 _purchaseId) 
        external 
        validPurchase(_purchaseId) 
    {
        DataPurchase storage purchase = purchases[_purchaseId];
        require(purchase.buyer == msg.sender, "Not the buyer");
        require(!purchase.completed && !purchase.refunded, "Transaction already finalized");
        require(block.timestamp <= purchase.confirmationDeadline, "Cannot dispute after deadline");
        
        purchase.disputed = true;
        emit DisputeRaised(_purchaseId);
    }
    
    function cancelListing(uint256 _listingId) 
        external 
        validListing(_listingId) 
    {
        DataListing storage listing = listings[_listingId];
        require(listing.seller == msg.sender, "Not the seller");
        require(listing.active, "Listing not active");
        
        listing.active = false;
        emit ListingCancelled(_listingId);
    }
    
    function _updateUserStats(address seller, address buyer, uint256 dataAmount, bool successful) internal {
        UserStats storage sellerStats = userStats[seller];
        UserStats storage buyerStats = userStats[buyer];
        
        if (successful) {
            sellerStats.totalSold = sellerStats.totalSold.add(dataAmount);
            buyerStats.totalPurchased = buyerStats.totalPurchased.add(dataAmount);
            sellerStats.successfulTransactions = sellerStats.successfulTransactions.add(1);
            buyerStats.successfulTransactions = buyerStats.successfulTransactions.add(1);
            
            // Update reputation
            if (sellerStats.reputation < 10000) {
                sellerStats.reputation = sellerStats.reputation.add(10);
                if (sellerStats.reputation > 10000) sellerStats.reputation = 10000;
            }
        }
    }
    
    function getActiveListings(uint256 offset, uint256 limit) 
        external 
        view 
        returns (uint256[] memory listingIds, uint256 total) 
    {
        uint256 activeCount = 0;
        uint256 currentCount = _listingIdCounter.current();
        
        // Count active listings
        for (uint256 i = 0; i < currentCount; i++) {
            if (listings[i].active && block.timestamp < listings[i].expiryTime) {
                activeCount++;
            }
        }
        
        total = activeCount;
        
        if (offset >= activeCount) {
            return (new uint256[](0), total);
        }
        
        uint256 resultLength = limit;
        if (offset.add(limit) > activeCount) {
            resultLength = activeCount.sub(offset);
        }
        
        listingIds = new uint256[](resultLength);
        uint256 found = 0;
        uint256 index = 0;
        
        for (uint256 i = 0; i < currentCount && index < resultLength; i++) {
            if (listings[i].active && block.timestamp < listings[i].expiryTime) {
                if (found >= offset) {
                    listingIds[index] = i;
                    index++;
                }
                found++;
            }
        }
    }
    
    // Admin functions
    function setPlatformFee(uint256 _feePercent) external onlyRole(ADMIN_ROLE) {
        require(_feePercent <= MAX_PLATFORM_FEE, "Fee too high");
        platformFeePercent = _feePercent;
    }
    
    function setFeeRecipient(address _feeRecipient) external onlyRole(ADMIN_ROLE) {
        require(_feeRecipient != address(0), "Invalid address");
        feeRecipient = _feeRecipient;
    }
    
    function addDataType(string memory _dataType) external onlyRole(ADMIN_ROLE) {
        supportedDataTypes[_dataType] = true;
    }
    
    function banUser(address user, bool banned) external onlyRole(MODERATOR_ROLE) {
        require(user != address(0), "Invalid address");
        bannedUsers[user] = banned;
        emit UserBanned(user, banned);
    }
    
    function pause() external onlyRole(ADMIN_ROLE) {
        _pause();
    }
    
    function unpause() external onlyRole(ADMIN_ROLE) {
        _unpause();
    }
    
    function emergencyWithdraw() external onlyRole(DEFAULT_ADMIN_ROLE) {
        payable(msg.sender).sendValue(address(this).balance);
    }
}