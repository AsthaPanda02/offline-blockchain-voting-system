// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Voting {
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    mapping(uint => Candidate) public candidates;
    uint public candidatesCount;

    mapping(uint => bool) public hasVoted;
    mapping(uint => bytes32) public voterHashes;
    mapping(uint => bytes32[]) public candidateVoters;

    address public electionCommission;

    event Voted(uint indexed voterId, uint indexed candidateId, bytes32 voterHash);

    constructor(string[] memory _candidateNames) {
        electionCommission = msg.sender;
        for (uint i = 0; i < _candidateNames.length; i++) {
            candidatesCount++;
            candidates[candidatesCount] = Candidate(candidatesCount, _candidateNames[i], 0);
        }
    }

    function recordVote(uint voterId, uint candidateId) public {
        require(msg.sender == electionCommission, "Only EC can record votes");
        require(!hasVoted[voterId], "Voter already voted");
        require(candidateId > 0 && candidateId <= candidatesCount, "Invalid candidate");

        hasVoted[voterId] = true;

        bytes32 voterHash = keccak256(abi.encodePacked(voterId, block.timestamp));
        voterHashes[voterId] = voterHash;

        candidates[candidateId].voteCount++;
        candidateVoters[candidateId].push(voterHash);

        emit Voted(voterId, candidateId, voterHash);
    }

    function getCandidate(uint id) public view returns (string memory, uint) {
        Candidate memory c = candidates[id];
        return (c.name, c.voteCount);
    }

    function getCandidateVoters(uint candidateId) public view returns (bytes32[] memory) {
        require(candidateId > 0 && candidateId <= candidatesCount, "Invalid candidate");
        return candidateVoters[candidateId];
    }
}
