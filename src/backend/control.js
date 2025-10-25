const { ethers } = require("ethers");
const { getContract } = require("../utils/contract");

// Mock biometric DB
const votersDB = {
  101: "fingerprintHash123",
  102: "fingerprintHash456",
  103: "fingerprintHash789",
  104: "fingerprintHash012",
  105: "fingerprintHash345"
  
};

function verifyBiometric(voterId, fingerprint) {
  return votersDB[voterId] && votersDB[voterId] === fingerprint;
}

async function recordVote(voterId, fingerprint, candidateId, contractAddress) {
  const Voting = await getContract(contractAddress);

  if (!verifyBiometric(voterId, fingerprint)) {
    return { success: false, error: "Biometric verification failed" };
  }

  try {
    const tx = await Voting.recordVote(voterId, candidateId);
    const receipt = await tx.wait();

    const voterHash = ethers.keccak256(
      ethers.AbiCoder.defaultAbiCoder().encode(["uint256","uint256"], [voterId, receipt.blockNumber])
    );

    const [candidateName] = await Voting.getCandidate(candidateId);

    return {
      success: true,
      voterHash,
      candidateName,
      txHash: receipt.hash,
      blockNumber: receipt.blockNumber
    };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

module.exports = { recordVote };
