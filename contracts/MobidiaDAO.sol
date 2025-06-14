// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./MBDToken.sol";

contract MobidiaDAO is ReentrancyGuard, AccessControl {
    using SafeMath for uint256;
    using Counters for Counters.Counter;
    
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    
    MBDToken public immutable mbdToken;
    
    enum ProposalState { Pending, Active, Succeeded, Defeated, Executed, Cancelled }
    
    struct Proposal {
        address proposer;
        string title;
        string description;
        uint256 votingStart;
        uint256 votingEnd;
        uint256 forVotes;
        uint256 againstVotes;
        uint256 abstainVotes;
        bool executed;
        bool cancelled;
        bytes executionData;
        address targetContract;
        mapping(address => Vote) votes;
    }
    
    struct Vote {
        bool hasVoted;
        uint8 support; // 0=against, 1=for, 2=abstain
        uint256 weight;
    }
    
    struct GovernanceSettings {
        uint256 votingDelay;
        uint256 votingPeriod;
        uint256 proposalThreshold;
        uint256 quorumThreshold;
        uint256 executionDelay;
    }
    
    mapping(uint256 => Proposal) public proposals;
    mapping(address => uint256) public latestProposalIds;
    
    Counters.Counter private _proposalCounter;
    
    GovernanceSettings public settings;
    
    event ProposalCreated(
        uint256 indexed proposalId,
        address indexed proposer,
        string title,
        string description,
        uint256 startBlock,
        uint256 endBlock
    );
    event VoteCast(
        uint256 indexed proposalId,
        address indexed voter,
        uint8 support,
        uint256 weight,
        string reason
    );
    event ProposalExecuted(uint256 indexed proposalId);
    event ProposalCancelled(uint256 indexed proposalId);
    event GovernanceSettingsUpdated();
    
    modifier validProposal(uint256 proposalId) {
        require(proposalId < _proposalCounter.current(), "Invalid proposal ID");
        _;
    }
    
    constructor(address _mbdToken, address admin) {
        require(_mbdToken != address(0), "Invalid token address");
        require(admin != address(0), "Invalid admin address");
        
        mbdToken = MBDToken(_mbdToken);
        
        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        _grantRole(ADMIN_ROLE, admin);
        
        // Initialize governance settings
        settings = GovernanceSettings({
            votingDelay: 1 days,
            votingPeriod: 7 days,
            proposalThreshold: 10000 * 10**18, // 10,000 MBD
            quorumThreshold: 100000 * 10**18, // 100,000 MBD
            executionDelay: 2 days
        });
    }
    
    function propose(
        string memory _title,
        string memory _description,
        address _targetContract,
        bytes memory _executionData
    ) external returns (uint256) {
        require(mbdToken.balanceOf(msg.sender) >= settings.proposalThreshold, "Insufficient tokens to propose");
        require(bytes(_title).length > 0, "Title required");
        require(bytes(_description).length > 0, "Description required");
        
        // Prevent spam by limiting one active proposal per user
        uint256 latestProposalId = latestProposalIds[msg.sender];
        if (latestProposalId != 0) {
            ProposalState state = getProposalState(latestProposalId);
            require(state != ProposalState.Active && state != ProposalState.Pending, "Active proposal exists");
        }
        
        uint256 proposalId = _proposalCounter.current();
        _proposalCounter.increment();
        
        uint256 startTime = block.timestamp.add(settings.votingDelay);
        uint256 endTime = startTime.add(settings.votingPeriod);
        
        Proposal storage proposal = proposals[proposalId];
        proposal.proposer = msg.sender;
        proposal.title = _title;
        proposal.description = _description;
        proposal.votingStart = startTime;
        proposal.votingEnd = endTime;
        proposal.targetContract = _targetContract;
        proposal.executionData = _executionData;
        
        latestProposalIds[msg.sender] = proposalId;
        
        emit ProposalCreated(proposalId, msg.sender, _title, _description, startTime, endTime);
        return proposalId;
    }
    
    function castVote(uint256 _proposalId, uint8 _support) external {
        _castVote(_proposalId, _support, "");
    }
    
    function castVoteWithReason(uint256 _proposalId, uint8 _support, string memory _reason) external {
        _castVote(_proposalId, _support, _reason);
    }
    
    function _castVote(uint256 _proposalId, uint8 _support, string memory _reason) 
        internal 
        validProposal(_proposalId) 
    {
        require(_support <= 2, "Invalid vote type");
        require(getProposalState(_proposalId) == ProposalState.Active, "Voting not active");
        
        Proposal storage proposal = proposals[_proposalId];
        Vote storage vote = proposal.votes[msg.sender];
        
        require(!vote.hasVoted, "Already voted");
        
        uint256 weight = mbdToken.balanceOf(msg.sender);
        require(weight > 0, "No voting power");
        
        vote.hasVoted = true;
        vote.support = _support;
        vote.weight = weight;
        
        if (_support == 0) {
            proposal.againstVotes = proposal.againstVotes.add(weight);
        } else if (_support == 1) {
            proposal.forVotes = proposal.forVotes.add(weight);
        } else {
            proposal.abstainVotes = proposal.abstainVotes.add(weight);
        }
        
        // Reward voters
        mbdToken.mint(msg.sender, 50 * 10**18); // 50 MBD for voting
        
        emit VoteCast(_proposalId, msg.sender, _support, weight, _reason);
    }
    
    function executeProposal(uint256 _proposalId) 
        external 
        nonReentrant 
        validProposal(_proposalId) 
    {
        require(getProposalState(_proposalId) == ProposalState.Succeeded, "Proposal not succeeded");
        
        Proposal storage proposal = proposals[_proposalId];
        require(!proposal.executed, "Already executed");
        require(block.timestamp >= proposal.votingEnd.add(settings.executionDelay), "Execution delay not met");
        
        proposal.executed = true;
        
        // Execute the proposal if target contract is specified
        if (proposal.targetContract != address(0) && proposal.executionData.length > 0) {
            (bool success,) = proposal.targetContract.call(proposal.executionData);
            require(success, "Execution failed");
        }
        
        // Reward successful proposer
        mbdToken.mint(proposal.proposer, 1000 * 10**18); // 1000 MBD reward
        
        emit ProposalExecuted(_proposalId);
    }
    
    function cancelProposal(uint256 _proposalId) 
        external 
        validProposal(_proposalId) 
    {
        Proposal storage proposal = proposals[_proposalId];
        require(
            msg.sender == proposal.proposer || hasRole(ADMIN_ROLE, msg.sender),
            "Not authorized to cancel"
        );
        require(!proposal.executed, "Cannot cancel executed proposal");
        
        proposal.cancelled = true;
        emit ProposalCancelled(_proposalId);
    }
    
    function getProposalState(uint256 _proposalId) 
        public 
        view 
        validProposal(_proposalId) 
        returns (ProposalState) 
    {
        Proposal storage proposal = proposals[_proposalId];
        
        if (proposal.cancelled) {
            return ProposalState.Cancelled;
        }
        
        if (proposal.executed) {
            return ProposalState.Executed;
        }
        
        if (block.timestamp < proposal.votingStart) {
            return ProposalState.Pending;
        }
        
        if (block.timestamp <= proposal.votingEnd) {
            return ProposalState.Active;
        }
        
        uint256 totalVotes = proposal.forVotes.add(proposal.againstVotes).add(proposal.abstainVotes);
        
        if (totalVotes < settings.quorumThreshold) {
            return ProposalState.Defeated;
        }
        
        if (proposal.forVotes > proposal.againstVotes) {
            return ProposalState.Succeeded;
        } else {
            return ProposalState.Defeated;
        }
    }
    
    function getProposal(uint256 _proposalId) 
        external 
        view 
        validProposal(_proposalId) 
        returns (
            address proposer,
            string memory title,
            string memory description,
            uint256 votingStart,
            uint256 votingEnd,
            uint256 forVotes,
            uint256 againstVotes,
            uint256 abstainVotes,
            bool executed,
            bool cancelled
        ) 
    {
        Proposal storage proposal = proposals[_proposalId];
        
        return (
            proposal.proposer,
            proposal.title,
            proposal.description,
            proposal.votingStart,
            proposal.votingEnd,
            proposal.forVotes,
            proposal.againstVotes,
            proposal.abstainVotes,
            proposal.executed,
            proposal.cancelled
        );
    }
    
    function getVote(uint256 _proposalId, address _voter) 
        external 
        view 
        validProposal(_proposalId) 
        returns (bool hasVoted, uint8 support, uint256 weight) 
    {
        Vote storage vote = proposals[_proposalId].votes[_voter];
        return (vote.hasVoted, vote.support, vote.weight);
    }
    
    function getActiveProposals(uint256 offset, uint256 limit) 
        external 
        view 
        returns (uint256[] memory proposalIds, uint256 total) 
    {
        uint256 activeCount = 0;
        uint256 currentCount = _proposalCounter.current();
        
        // Count active proposals
        for (uint256 i = 0; i < currentCount; i++) {
            if (getProposalState(i) == ProposalState.Active) {
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
        
        proposalIds = new uint256[](resultLength);
        uint256 found = 0;
        uint256 index = 0;
        
        for (uint256 i = 0; i < currentCount && index < resultLength; i++) {
            if (getProposalState(i) == ProposalState.Active) {
                if (found >= offset) {
                    proposalIds[index] = i;
                    index++;
                }
                found++;
            }
        }
    }
    
    // Admin functions
    function updateGovernanceSettings(
        uint256 _votingDelay,
        uint256 _votingPeriod,
        uint256 _proposalThreshold,
        uint256 _quorumThreshold,
        uint256 _executionDelay
    ) external onlyRole(ADMIN_ROLE) {
        require(_votingDelay >= 1 hours && _votingDelay <= 7 days, "Invalid voting delay");
        require(_votingPeriod >= 1 days && _votingPeriod <= 30 days, "Invalid voting period");
        require(_proposalThreshold > 0, "Invalid proposal threshold");
        require(_quorumThreshold > 0, "Invalid quorum threshold");
        require(_executionDelay >= 0 && _executionDelay <= 7 days, "Invalid execution delay");
        
        settings.votingDelay = _votingDelay;
        settings.votingPeriod = _votingPeriod;
        settings.proposalThreshold = _proposalThreshold;
        settings.quorumThreshold = _quorumThreshold;
        settings.executionDelay = _executionDelay;
        
        emit GovernanceSettingsUpdated();
    }
}