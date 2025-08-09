// intergation for the compound finance script to create a position, borrow, supply and monitor.
// the goal of this script is simple suplly WETH to compound as collateral, borrow USDC against it.

require('dotenv').config();
const { ethers } = require('ethers');

const PRIVATE_KEY = process.env.PRIVATE_KEY;


const provider = new ethers.InfuraProvider("sepolia", process.env.SEPOLIA_RPC_API_KEY);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);


const cometAddress = "0xAec1F48e02Cfb822Be958B68C7957156EB3F0b6e";
const wethAddress = "0x2D5ee574e710219a521449679A4A7f2B43f046ad"; 
const usdcAddress = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238";


const cometAbi = [
  "function supply(address asset, uint256 amount) external",
  "function withdraw(address asset, uint256 amount) external",
  "function borrowBalanceOf(address account) external view returns (uint256)"
];

const erc20Abi = [
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function balanceOf(address account) external view returns (uint256)",
  "function decimals() external view returns (uint8)"
];


const comet = new ethers.Contract(cometAddress, cometAbi, signer);
const weth = new ethers.Contract(wethAddress, erc20Abi, signer);
const usdc = new ethers.Contract(usdcAddress, erc20Abi, signer);


async function supplyWethAsCollateral(amount: any) {
  console.log(`Approving ${ethers.formatEther(amount)} WETH for Comet...`);
  const approveTx = await weth.approve(cometAddress, amount);
  await approveTx.wait();
  console.log("WETH approved!");

  console.log(`Supplying ${ethers.formatEther(amount)} WETH to Comet...`);
  const supplyTx = await comet.supply(wethAddress, amount);
  await supplyTx.wait();
  console.log("WETH supplied as collateral!");
}


async function borrowUsdc(amount: any) {
  console.log(`Borrowing ${ethers.formatUnits(amount, 6)} USDC from Comet...`);
  const borrowTx = await comet.withdraw(usdcAddress, amount);
  await borrowTx.wait();
  console.log("USDC borrowed successfully!");
}


async function checkDebt() {
  const debt = await comet.borrowBalanceOf(signer.address);
  const usdcDecimals = await usdc.decimals();
  console.log(`Current USDC debt: ${ethers.formatUnits(debt, usdcDecimals)}`);
  return debt;
}


(async () => {
  try {
    console.log("🚀 Creating Compound position...");
    console.log(`Wallet address: ${signer.address}`);
    
    const wethBalance = await weth.balanceOf(signer.address);
    console.log(`WETH balance: ${ethers.formatEther(wethBalance)}`);
    
    if (wethBalance === BigInt(0)) {
      console.error("❌ No WETH balance found!");
      return;
    }

    const wethSupplyAmount = ethers.parseEther("2.0");
    await supplyWethAsCollateral(wethSupplyAmount);

    const usdcDecimals = await usdc.decimals();
    const borrowAmount = ethers.parseUnits("1000", usdcDecimals);
    await borrowUsdc(borrowAmount);

    await checkDebt();
    
    console.log("✅ Position created successfully!");
    console.log("📊 You can now test your dashboard with this wallet address");
    
  } catch (err) {
    console.error("❌ Error creating position:", err);
  }
})();