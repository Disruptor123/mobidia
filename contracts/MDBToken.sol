// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

/**
 * @title MBDToken
 * @dev Simple ERC20 token with access control for the Mobidia ecosystem
 */
contract MBDToken is ERC20, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");
    
    uint256 public constant MAX_SUPPLY = 1_000_000_000 * 10**18; // 1 billion tokens
    uint256 public constant INITIAL_SUPPLY = 100_000_000 * 10**18; // 100 million initial
    
    mapping(address => uint256) private _mintedByContract;
    mapping(address => bool) private _blacklisted;
    
    event TokensMinted(address indexed to, uint256 amount, address indexed minter);
    event TokensBurned(address indexed from, uint256 amount, address indexed burner);
    event AddressBlacklisted(address indexed account, bool blacklisted);
    
    modifier notBlacklisted(address account) {
        require(!_blacklisted[account], "MBD: Account is blacklisted");
        _;
    }
    
    constructor(address admin) ERC20("Mobidia Token", "MBD") {
        require(admin != address(0), "MBD: Admin cannot be zero address");
        
        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        _grantRole(MINTER_ROLE, admin);
        
        // Mint initial supply to admin
        _mint(admin, INITIAL_SUPPLY);
    }
    
    /**
     * @dev Mint tokens to specified address
     * @param to Address to mint tokens to
     * @param amount Amount of tokens to mint
     */
    function mint(address to, uint256 amount) 
        external 
        onlyRole(MINTER_ROLE) 
        notBlacklisted(to)
    {
        require(to != address(0), "MBD: Cannot mint to zero address");
        require(amount > 0, "MBD: Amount must be positive");
        require(totalSupply() + amount <= MAX_SUPPLY, "MBD: Exceeds maximum supply");
        
        _mint(to, amount);
        _mintedByContract[msg.sender] = _mintedByContract[msg.sender] + amount;
        
        emit TokensMinted(to, amount, msg.sender);
    }
    
    /**
     * @dev Burn tokens from specified address
     * @param from Address to burn tokens from
     * @param amount Amount of tokens to burn
     */
    function burnFrom(address from, uint256 amount) 
        external 
        onlyRole(BURNER_ROLE) 
    {
        require(from != address(0), "MBD: Cannot burn from zero address");
        require(amount > 0, "MBD: Amount must be positive");
        require(balanceOf(from) >= amount, "MBD: Insufficient balance to burn");
        
        _burn(from, amount);
        emit TokensBurned(from, amount, msg.sender);
    }
    
    /**
     * @dev Burn tokens from caller's balance
     * @param amount Amount of tokens to burn
     */
    function burn(uint256 amount) external {
        require(amount > 0, "MBD: Amount must be positive");
        require(balanceOf(msg.sender) >= amount, "MBD: Insufficient balance to burn");
        
        _burn(msg.sender, amount);
        emit TokensBurned(msg.sender, amount, msg.sender);
    }
    
    /**
     * @dev Blacklist or unblacklist an address
     * @param account Address to blacklist/unblacklist
     * @param blacklisted Whether to blacklist the address
     */
    function setBlacklisted(address account, bool blacklisted) 
        external 
        onlyRole(DEFAULT_ADMIN_ROLE) 
    {
        require(account != address(0), "MBD: Cannot blacklist zero address");
        _blacklisted[account] = blacklisted;
        emit AddressBlacklisted(account, blacklisted);
    }
    
    /**
     * @dev Check if address is blacklisted
     */
    function isBlacklisted(address account) external view returns (bool) {
        return _blacklisted[account];
    }
    
    /**
     * @dev Get total minted by a specific minter contract
     */
    function getMintedByContract(address minter) external view returns (uint256) {
        return _mintedByContract[minter];
    }
    
    // Override transfer functions to check blacklist
    function transfer(address to, uint256 amount) 
        public 
        override 
        notBlacklisted(msg.sender) 
        notBlacklisted(to) 
        returns (bool) 
    {
        return super.transfer(to, amount);
    }
    
    function transferFrom(address from, address to, uint256 amount) 
        public 
        override 
        notBlacklisted(from) 
        notBlacklisted(to) 
        returns (bool) 
    {
        return super.transferFrom(from, to, amount);
    }
    
    /**
     * @dev Get contract information
     */
    function getInfo() external view returns (
        string memory tokenName,
        string memory tokenSymbol,
        uint8 tokenDecimals,
        uint256 currentTotalSupply,
        uint256 maxSupply
    ) {
        return (
            name(),
            symbol(),
            decimals(),
            totalSupply(),
            MAX_SUPPLY
        );
    }
}