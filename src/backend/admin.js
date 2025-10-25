const { getContract } = require("../utils/contract");

async function getCandidates(contractAddress) {
  const Voting = await getContract(contractAddress);
  const count = await Voting.candidatesCount();
  const list = [];
  for (let i = 1; i <= count; i++) {
    const [name, votes] = await Voting.getCandidate(i);
    list.push({ id: i, name, votes: votes.toString() });
  }
  return list;
}

async function getResults(contractAddress) {
  const Voting = await getContract(contractAddress);
  const count = await Voting.candidatesCount();
  const results = [];
  for (let i = 1; i <= count; i++) {
    const [name, votes] = await Voting.getCandidate(i);
    const hashes = await Voting.getCandidateVoters(i);
    results.push({ id: i, name, votes: votes.toString(), voterHashes: hashes });
  }
  return results;
}

module.exports = { getCandidates, getResults };
