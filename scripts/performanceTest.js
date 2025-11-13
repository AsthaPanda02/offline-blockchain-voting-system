const fs = require('fs');
const { ethers } = require('hardhat');

async function main() {
  const [deployer] = await ethers.getSigners();

  // Replace with your deployed contract address
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  // Get your Voting contract instance
  const Voting = await ethers.getContractAt("Voting", contractAddress);

  const numTransactions = 50; // number of simulated votes
  const candidateId = 1; // candidate to vote for

  // Generate unique dummy voter IDs starting from a high number
  const startVoterId = 1000; // change if needed to avoid conflicts
  let totalGas = 0;
  let totalTime = 0;
  const results = [];

  console.log(`\n⏳ Starting performance test with ${numTransactions} transactions...\n`);

  for (let i = 0; i < numTransactions; i++) {
    const voterId = startVoterId + i; // unique ID for each tx

    const start = Date.now();
    const tx = await Voting.recordVote(voterId, candidateId);
    const receipt = await tx.wait();
    const end = Date.now();

    const latency = (end - start) / 1000; // seconds
    totalTime += latency;

    const gasUsed = Number(receipt.gasUsed); // ethers v6 fix
    totalGas += gasUsed;

    console.log(`Tx ${i + 1}: ${latency.toFixed(2)}s | Gas: ${gasUsed}`);

    results.push({
      txNumber: i + 1,
      latency: latency.toFixed(2),
      gasUsed: gasUsed,
      txHash: receipt.transactionHash
    });
  }

  const avgLatency = totalTime / numTransactions;
  const avgGas = totalGas / numTransactions;
  const throughput = numTransactions / totalTime;

  console.log("\n=== 📊 Performance Summary ===");
  console.log(`Average Latency: ${avgLatency.toFixed(2)} s`);
  console.log(`Average Gas Used: ${avgGas.toFixed(0)} gas`);
  console.log(`Throughput: ${throughput.toFixed(2)} TPS`);
  console.log(`Total Transactions: ${numTransactions}`);

  // Save results to CSV
  const csvData = [
    "Tx Number,Latency (s),Gas Used,Transaction Hash",
    ...results.map(r => `${r.txNumber},${r.latency},${r.gasUsed},${r.txHash}`)
  ].join("\n");

  fs.writeFileSync("performance_results.csv", csvData);
  console.log("\n✅ Results saved to performance_results.csv");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});