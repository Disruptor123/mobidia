// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./MBDToken.sol";
import "./BandwidthMarketplace.sol";
import "./DataMining.sol";
import "./MobidiaDAO.sol";

contract MobidiaDeployer {
    MBDToken public mbdToken;
    BandwidthMarketplace public marketplace;
    DataMining public dataMining;
    MobidiaDAO public dao;
    
    event ContractsDeployed(
        address mbdToken,
        address marketplace,
        address dataMining,
        address dao
    );
    
    function deployAll(address admin, address feeRecipient) external {
        // Deploy MBD Token
        mbdToken = new MBDToken(admin);
        
        // Deploy Marketplace
        marketplace = new BandwidthMarketplace(
            address(mbdToken),
            feeRecipient,
            admin
        );
        
        // Deploy Data Mining
        dataMining = new DataMining(
            address(mbdToken),
            admin, // Temporary ZK verifier
            admin
        );
        
        // Deploy DAO
        dao = new MobidiaDAO(address(mbdToken), admin);
        
        // Setup permissions
        bytes32 MINTER_ROLE = mbdToken.MINTER_ROLE();
        mbdToken.grantRole(MINTER_ROLE, address(marketplace));
        mbdToken.grantRole(MINTER_ROLE, address(dataMining));
        mbdToken.grantRole(MINTER_ROLE, address(dao));
        
        emit ContractsDeployed(
            address(mbdToken),
            address(marketplace),
            address(dataMining),
            address(dao)
        );
    }
    
    function getAddresses() external view returns (
        address _mbdToken,
        address _marketplace,
        address _dataMining,
        address _dao
    ) {
        return (
            address(mbdToken),
            address(marketplace),
            address(dataMining),
            address(dao)
        );
    }
}