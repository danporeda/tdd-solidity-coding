import { ethers } from "hardhat";

async function main() {
    const accounts = await ethers.getSigners();
    const [deployer, acct1, acct2] = accounts;
    console.log(`The address of the deployer is ${deployer.address}`);
    const provider = ethers.provider;
    const lastBlock = await provider.getBlock("latest");
    console.log(`The latest block number is \n`);
    console.log({lastBlock});
    const deployerBalance = await provider.getBalance(deployer.address);
    console.log(`The deployer balance is ${ethers.formatEther(deployerBalance)}`);

    const helloWorldFactory = await ethers.getContractFactory("HelloWorld");
    const helloWorldContract = await helloWorldFactory.deploy();
    await helloWorldContract.waitForDeployment();
    const helloWorldContractAddress = await helloWorldContract.getAddress();
    console.log(`The address of the contract is ${helloWorldContractAddress}`);
    const helloWorldBytes = await helloWorldContract.helloWorld();
    const helloWorld = ethers.decodeBytes32String(helloWorldBytes);
    console.log(`The text stored in the contract is ${helloWorld}`);
}

main().catch((err) => {
    console.error(err);
    process.exitCode = 1;
})