const { ethers } = require("ethers");
const path = require("path");
const fs = require("fs");

const providerUrl = process.env.RPC_URL || "http://127.0.0.1:8545";
const provider = new ethers.JsonRpcProvider(providerUrl);

async function getContract(contractAddress) {
  const signer = await provider.getSigner(0);
  const abiPath = path.join(__dirname, "../../artifacts/contracts/Voting.sol/Voting.json");
  const abi = JSON.parse(fs.readFileSync(abiPath)).abi;
  return new ethers.Contract(contractAddress, abi, signer);
}

module.exports = { getContract, provider };
