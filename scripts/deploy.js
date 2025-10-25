async function main() {
  const Voting = await ethers.getContractFactory("Voting");
  const voting = await Voting.deploy(["BJP", "Congress", "AAP", "BSP", "Trinamool"]);
  await voting.waitForDeployment();
  console.log(`Voting contract deployed at: ${await voting.getAddress()}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
