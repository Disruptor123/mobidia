// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./MBDToken.sol";

contract DataMining is ReentrancyGuard, Pausable, AccessControl {
    using SafeMath for uint256;
    using Counters for Counters.Counter;
    
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant VERIFIER_ROLE = keccak256("VERIFIER_ROLE");
    
    MBDToken public immutable mbdToken;
    
    struct DataContribution {
        address contributor;
        bytes32 dataHash;
        bytes32 zkProofHash;
        uint256 timestamp;
        uint256 rewardAmount;
        string dataType;
        string region;
        uint256 quality; // 1-100 quality score
        bool verified;
        bool rewarded;
    }
    
    struct DataMiner {
        uint256 totalContributions;
        uint256 totalRewards;
        uint256 lastContribution;
        uint256 reputation; // 0-10000
        uint256 qualityScore; // Average quality
        bool isActive;
        bool isBlacklisted;
    }
    
    struct RewardTier {
        string dataType;
        uint256 baseReward;
        uint256 qualityMultiplier; // Basis points
        uint256 rarityMultiplier; // Basis points
        bool active;
    }
    
    mapping(address => DataMiner) public miners;
    mapping(bytes32 => bool) public usedDataHashes;
    mapping(uint256 => DataContribution) public contributions;
    mapping(string => RewardTier) public rewardTiers;
    mapping(address => uint256[]) public minerContributions;
    mapping(string => uint256) public dataTypeCount;
    
    Counters.Counter private _contributionCounter;
    
    uint256 public constant MAX_QUALITY_SCORE = 100;
    uint256 public constant MIN_QUALITY_SCORE = 1;
    uint256 public constant VERIFICATION_PERIOD = 48 hours;
    uint256 public constant DAILY_CONTRIBUTION_LIMIT = 10;
    
    address public zkVerifier;
    uint256 public totalDataContributions;
    uint256 public totalRewardsDistributed;
    
    event DataContributed(
        uint256 indexed contributionId,
        address indexed contributor,
        bytes32 dataHash,
        string dataType,
        uint256 rewardAmount
    );
    event DataVerified(uint256 indexed contributionId, bool verified, uint256 qualityScore);
    event RewardClaimed(address indexed miner, uint256 amount);
    event RewardTierUpdated(string dataType, uint256 baseReward);
    event MinerBlacklisted(address indexed miner, bool blacklisted);
    
    modifier onlyActiveMiner() {
        require(!miners[msg.sender].isBlacklisted, "Miner is blacklisted");
        _;
    }
    
    modifier validContribution(uint256 contributionId) {
        require(contributionId < _contributionCounter.current(), "Invalid contribution ID");
        _;
    }
    
    constructor(address _mbdToken, address _zkVerifier, address admin) {
        require(_mbdToken != address(0), "Invalid token address");
        require(admin != address(0), "Invalid admin address");
        
        mbdToken = MBDToken(_mbdToken);
        zkVerifier = _zkVerifier;
        
        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        _grantRole(ADMIN_ROLE, admin);
        _grantRole(VERIFIER_ROLE, admin);
        
        // Initialize reward tiers
        _initializeRewardTiers();
    }
    
    function _initializeRewardTiers() internal {
        rewardTiers["location"] = RewardTier({
            dataType: "location",
            baseReward: 1 * 10**18, // 1 MBD
            qualityMultiplier: 150, // 1.5x for high quality
            rarityMultiplier: 200, // 2x for rare locations
            active: true
        });
        
        rewardTiers["usage"] = RewardTier({
            dataType: "usage",
            baseReward: 0.5 * 10**18, // 0.5 MBD
            qualityMultiplier: 120,
            rarityMultiplier: 150,
            active: true
        });
        
        rewardTiers["network_stats"] = RewardTier({
            dataType: "network_stats",
            baseReward: 2 * 10**18, // 2 MBD
            qualityMultiplier: 200,
            rarityMultiplier: 300,
            active: true
        });
    }
    
    function contributeData(
        bytes32 _dataHash,
        bytes32 _zkProofHash,
        string memory _dataType,
        string memory _region,
        bytes memory _zkProof
    ) external whenNotPaused onlyActiveMiner returns (uint256) {
        require(!usedDataHashes[_dataHash], "Data already contributed");
        require(bytes(_dataType).length > 0, "Data type required");
        require(bytes(_region).length > 0, "Region required");
        require(rewardTiers[_dataType].active, "Data type not supported");
        require(_zkProof.length > 0, "ZK proof required");
        
        // Check daily contribution limit
        uint256 todayContributions = _getTodayContributions(msg.sender);
        require(todayContributions < DAILY_CONTRIBUTION_LIMIT, "Daily limit exceeded");
        
        // Verify ZK proof
        require(_verifyZKProof(_zkProof, _dataHash, _zkProofHash), "Invalid ZK proof");
        
        usedDataHashes[_dataHash] = true;
        
        uint256 contributionId = _contributionCounter.current();
        _contributionCounter.increment();
        
        // Calculate initial reward
        uint256 estimatedReward = _calculateEstimatedReward(_dataType, _region);
        
        contributions[contributionId] = DataContribution({
            contributor: msg.sender,
            dataHash: _dataHash,
            zkProofHash: _zkProofHash,
            timestamp: block.timestamp,
            rewardAmount: estimatedReward,
            dataType: _dataType,
            region: _region,
            quality: 0, // Set during verification
            verified: false,
            rewarded: false
        });
        
        minerContributions[msg.sender].push(contributionId);
        dataTypeCount[_dataType] = dataTypeCount[_dataType].add(1);
        
        // Update miner stats
        DataMiner storage miner = miners[msg.sender];
        miner.totalContributions = miner.totalContributions.add(1);
        miner.lastContribution = block.timestamp;
        miner.isActive = true;
        
        totalDataContributions = totalDataContributions.add(1);
        
        emit DataContributed(contributionId, msg.sender, _dataHash, _dataType, estimatedReward);
        return contributionId;
    }
    
    function verifyContribution(
        uint256 _contributionId, 
        bool _isValid, 
        uint256 _qualityScore
    ) external onlyRole(VERIFIER_ROLE) validContribution(_contributionId) {
        DataContribution storage contribution = contributions[_contributionId];
        require(!contribution.verified, "Already verified");
        require(_qualityScore >= MIN_QUALITY_SCORE && _qualityScore <= MAX_QUALITY_SCORE, "Invalid quality score");
        
        contribution.verified = true;
        contribution.quality = _qualityScore;
        
        if (_isValid) {
            uint256 finalReward = _calculateFinalReward(
                contribution.dataType,
                contribution.region,
                _qualityScore
            );
            contribution.rewardAmount = finalReward;
            _updateMinerStats(contribution.contributor, _qualityScore, true);
        } else {
            contribution.rewardAmount = 0;
            _updateMinerStats(contribution.contributor, 0, false);
        }
        
        emit DataVerified(_contributionId, _isValid, _qualityScore);
    }
    
    function claimRewards() external nonReentrant onlyActiveMiner {
        uint256 totalReward = 0;
        uint256[] memory userContributions = minerContributions[msg.sender];
        
        for (uint256 i = 0; i < userContributions.length; i++) {
            DataContribution storage contribution = contributions[userContributions[i]];
            if (contribution.verified && !contribution.rewarded && contribution.rewardAmount > 0) {
                totalReward = totalReward.add(contribution.rewardAmount);
                contribution.rewarded = true;
            }
        }
        
        require(totalReward > 0, "No rewards to claim");
        
        miners[msg.sender].totalRewards = miners[msg.sender].totalRewards.add(totalReward);
        totalRewardsDistributed = totalRewardsDistributed.add(totalReward);
        
        mbdToken.mint(msg.sender, totalReward);
        
        emit RewardClaimed(msg.sender, totalReward);
    }
    
    function getPendingRewards(address miner) external view returns (uint256) {
        uint256 totalReward = 0;
        uint256[] memory userContributions = minerContributions[miner];
        
        for (uint256 i = 0; i < userContributions.length; i++) {
            DataContribution storage contribution = contributions[userContributions[i]];
            if (contribution.verified && !contribution.rewarded && contribution.rewardAmount > 0) {
                totalReward = totalReward.add(contribution.rewardAmount);
            }
        }
        
        return totalReward;
    }
    
    function _calculateEstimatedReward(string memory _dataType, string memory _region) 
        internal 
        view 
        returns (uint256) 
    {
        RewardTier memory tier = rewardTiers[_dataType];
        uint256 baseReward = tier.baseReward;
        
        // Apply rarity bonus for less common regions
        if (_isRareRegion(_region)) {
            baseReward = baseReward.mul(tier.rarityMultiplier).div(100);
        }
        
        return baseReward;
    }
    
    function _calculateFinalReward(
        string memory _dataType, 
        string memory _region, 
        uint256 _qualityScore
    ) internal view returns (uint256) {
        RewardTier memory tier = rewardTiers[_dataType];
        uint256 baseReward = tier.baseReward;
        
        // Apply quality multiplier
        uint256 qualityMultiplier = 100 + ((_qualityScore - 50) * tier.qualityMultiplier) / 100;
        baseReward = baseReward.mul(qualityMultiplier).div(100);
        
        // Apply rarity bonus
        if (_isRareRegion(_region)) {
            baseReward = baseReward.mul(tier.rarityMultiplier).div(100);
        }
        
        return baseReward;
    }
    
    function _isRareRegion(string memory _region) internal view returns (bool) {
        bytes32 regionHash = keccak256(abi.encodePacked(_region));
        return uint256(regionHash) % 100 < 10; // 10% of regions are "rare"
    }
    
    function _verifyZKProof(
        bytes memory _proof, 
        bytes32 _dataHash, 
        bytes32 _zkProofHash
    ) internal view returns (bool) {
        // Simplified verification - integrate with actual ZK proof library
        require(_proof.length >= 32, "Proof too short");
        require(_dataHash != bytes32(0), "Invalid data hash");
        require(_zkProofHash != bytes32(0), "Invalid proof hash");
        
        // In production, call actual ZK verifier contract
        return zkVerifier != address(0);
    }
    
    function _getTodayContributions(address miner) internal view returns (uint256) {
        uint256 count = 0;
        uint256 dayStart = block.timestamp - (block.timestamp % 86400);
        uint256[] memory userContributions = minerContributions[miner];
        
        for (uint256 i = 0; i < userContributions.length; i++) {
            if (contributions[userContributions[i]].timestamp >= dayStart) {
                count++;
            }
        }
        
        return count;
    }
    
    function _updateMinerStats(address miner, uint256 qualityScore, bool success) internal {
        DataMiner storage minerData = miners[miner];
        
        if (success) {
            // Update average quality score
            if (minerData.qualityScore == 0) {
                minerData.qualityScore = qualityScore;
            } else {
                minerData.qualityScore = (minerData.qualityScore.add(qualityScore)).div(2);
            }
            
            // Update reputation
            if (minerData.reputation < 10000) {
                uint256 reputationGain = qualityScore.div(10);
                minerData.reputation = minerData.reputation.add(reputationGain);
                if (minerData.reputation > 10000) {
                    minerData.reputation = 10000;
                }
            }
        } else {
            // Penalty for invalid data
            if (minerData.reputation > 100) {
                minerData.reputation = minerData.reputation.sub(100);
            }
        }
    }
    
    // Admin functions
    function updateRewardTier(
        string memory _dataType,
        uint256 _baseReward,
        uint256 _qualityMultiplier,
        uint256 _rarityMultiplier,
        bool _active
    ) external onlyRole(ADMIN_ROLE) {
        rewardTiers[_dataType] = RewardTier({
            dataType: _dataType,
            baseReward: _baseReward,
            qualityMultiplier: _qualityMultiplier,
            rarityMultiplier: _rarityMultiplier,
            active: _active
        });
        
        emit RewardTierUpdated(_dataType, _baseReward);
    }
    
    function setZKVerifier(address _zkVerifier) external onlyRole(ADMIN_ROLE) {
        zkVerifier = _zkVerifier;
    }
    
    function blacklistMiner(address miner, bool blacklisted) external onlyRole(ADMIN_ROLE) {
        miners[miner].isBlacklisted = blacklisted;
        emit MinerBlacklisted(miner, blacklisted);
    }
    
    function pause() external onlyRole(ADMIN_ROLE) {
        _pause();
    }
    
    function unpause() external onlyRole(ADMIN_ROLE) {
        _unpause();
    }
}