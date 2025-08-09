import { useReadContract } from 'wagmi'
import { Address, formatUnits } from 'viem'
import { useToast } from './use-toast'
import { useEffect } from 'react'
import { useWETHPrice } from './utilities'

const LIQUIDATION_THRESHOLD = 0.8; 

export interface HealthData {
  healthPercentage: number;
  healthFactor: number; 
  riskLevel: 'safe' | 'warning' | 'danger';
  maxBorrowableUSD: number;
  currentBorrowCapacityUsed: number;
  liquidationPrice: number;
  safeBorrowAmount: number;
  bufferAmount: number;
}

export const COMPOUND_ADDRESSES = {
  COMET_USDC: '0xAec1F48e02Cfb822Be958B68C7957156EB3F0b6e' as Address,
  WETH: '0x2D5ee574e710219a521449679A4A7f2B43f046ad' as Address,
  USDC: '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238' as Address,
}

export interface CompoundPosition {
  suppliedUSDC: bigint
  suppliedUSDCFormatted: string
  borrowedUSDC: bigint
  borrowedUSDCFormatted: string
  collateralWETH: bigint
  collateralWETHFormatted: string
  collateralValueUSD: number
  healthFactor: number
  healthPercentage: number
  utilizationRate: number
  riskLevel: 'safe' | 'warning' | 'danger'
  borrowRate: number
  supplyRate: number
  loading: boolean
  error: string | null
  wethPrice: number
  liquidationPrice: number
  safeBorrowAmount: number
  maxBorrowableUSD: number
  bufferAmount: number
  currentBorrowCapacityUsed: number
}

export function useCompoundPosition(address?: Address): CompoundPosition {
  const { showError } = useToast()
  const wethPrice = useWETHPrice()

  // Individual contract calls instead of useReadContracts
  const { data: borrowBalance, isLoading: borrowLoading, error: borrowError } = useReadContract({
    address: COMPOUND_ADDRESSES.COMET_USDC,
    abi: [
      {
        "inputs": [{"internalType": "address", "name": "account", "type": "address"}],
        "name": "borrowBalanceOf",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
      }
    ],
    functionName: 'borrowBalanceOf',
    args: [address!],
    query: { enabled: !!address },
  })

  const { data: suppliedBalance, isLoading: suppliedLoading } = useReadContract({
    address: COMPOUND_ADDRESSES.COMET_USDC,
    abi: ['function balanceOf(address account) external view returns (uint256)'],
    functionName: 'balanceOf',
    args: [address!],
    query: { enabled: !!address },
  })



  const { data: collateralBalance, isLoading: collateralLoading, error: collateralError } = useReadContract({
    address: COMPOUND_ADDRESSES.COMET_USDC,
    abi: [
      {
        name: 'collateralBalanceOf',
        type: 'function', 
        inputs: [
          { type: 'address', name: 'account' },
          { type: 'address', name: 'asset' }
        ],
        outputs: [{ type: 'uint128' }], 
        stateMutability: 'view'
      }
    ],
    functionName: 'collateralBalanceOf',
    args: [address!, COMPOUND_ADDRESSES.WETH],
    query: { enabled: !!address },
  })

  const { data: utilization, isLoading: utilizationLoading } = useReadContract({
    address: COMPOUND_ADDRESSES.COMET_USDC,
    abi: ['function getUtilization() external view returns (uint256)'],
    functionName: 'getUtilization',
    query: { enabled: !!address },
  })


  useEffect(() => {
    if (borrowError) {
      showError(`Failed to fetch borrow balance: ${borrowError.shortMessage || borrowError.message}`)
    }
  }, [borrowError, showError])

  useEffect(() => {
    if (collateralError) {
      showError(`Failed to fetch collateral balance: ${collateralError.shortMessage || collateralError.message}`)
    }
  }, [collateralError, showError])

  const isLoading = borrowLoading || suppliedLoading || collateralLoading || utilizationLoading || wethPrice.loading

  const borrowedResult = borrowBalance as bigint | undefined
  const suppliedResult = suppliedBalance as bigint | undefined
  const collateralResult = collateralBalance as bigint | undefined
  const utilizationResult = utilization as bigint | undefined

  const healthData = calculateHealthData(
    collateralResult || BigInt(0),
    borrowedResult || BigInt(0),
    wethPrice.price || 2400 
  )

  const processedData: CompoundPosition = {
    suppliedUSDC: suppliedResult || BigInt(0),
    suppliedUSDCFormatted: suppliedResult 
      ? formatUnits(suppliedResult, 6) 
      : '0.00',
    
    borrowedUSDC: borrowedResult || BigInt(0),
    borrowedUSDCFormatted: borrowedResult 
      ? formatUnits(borrowedResult, 6) 
      : '0.00',
    
    collateralWETH: collateralResult || BigInt(0),
    collateralWETHFormatted: collateralResult 
      ? formatUnits(collateralResult, 18) 
      : '0.00',
    
    collateralValueUSD: collateralResult 
      ? Number(formatUnits(collateralResult, 18)) * (wethPrice.price || 2400)
      : 0,
    
    utilizationRate: utilizationResult 
      ? Number(formatUnits(utilizationResult, 18)) * 100 
      : 0,
    
    healthPercentage: healthData.healthPercentage,
    healthFactor: healthData.healthFactor,
    riskLevel: healthData.riskLevel,
    liquidationPrice: healthData.liquidationPrice,
    safeBorrowAmount: healthData.safeBorrowAmount,
    maxBorrowableUSD: healthData.maxBorrowableUSD,
    bufferAmount: healthData.bufferAmount,
    currentBorrowCapacityUsed: healthData.currentBorrowCapacityUsed,
    
    wethPrice: wethPrice.price || 2400,
    
    borrowRate: 0, 
    supplyRate: 0, 
    
    loading: isLoading,
    error: borrowError?.message || null,
  }

  // console.log('Final data:', processedData);
  return processedData
}


function calculateHealthPercentage(
  collateralWETH: bigint, 
  debtUSDC: bigint, 
  wethPrice: number
): number {

  if (debtUSDC === BigInt(0)) return 100;
  
  const collateralValue = Number(formatUnits(collateralWETH, 18)) * wethPrice;
  const debt = Number(formatUnits(debtUSDC, 6));
  const maxBorrowable = collateralValue * LIQUIDATION_THRESHOLD;
  
  if (maxBorrowable === 0) return 0;
  
  const utilizationRatio = debt / maxBorrowable;
  const healthPercentage = (1 - utilizationRatio) * 100;
  
  return Math.max(0, Math.min(100, healthPercentage));
}


function calculateHealthFactor(
  collateralWETH: bigint, 
  debtUSDC: bigint, 
  wethPrice: number
): number {
  if (debtUSDC === BigInt(0)) return 999;
  
  const collateralValue = Number(formatUnits(collateralWETH, 18)) * wethPrice;
  const debt = Number(formatUnits(debtUSDC, 6));
  
  return (collateralValue * LIQUIDATION_THRESHOLD) / debt;
}


function getRiskLevel(healthPercentage: number): 'safe' | 'warning' | 'danger' {
  if (healthPercentage >= 50) return 'safe';    
  if (healthPercentage >= 20) return 'warning';   
  return 'danger';                               
}


function getLiquidationPrice(
  collateralWETH: bigint, 
  debtUSDC: bigint
): number {
  if (collateralWETH === BigInt(0)) return 0;
  
  const debt = Number(formatUnits(debtUSDC, 6));
  const wethAmount = Number(formatUnits(collateralWETH, 18));
  
  return debt / (wethAmount * LIQUIDATION_THRESHOLD);
}


function getSafeBorrowAmount(
  collateralWETH: bigint, 
  wethPrice: number
): number {
  const collateralValue = Number(formatUnits(collateralWETH, 18)) * wethPrice;
  return collateralValue * LIQUIDATION_THRESHOLD;
}


function getAvailableBorrowAmount(
  collateralWETH: bigint, 
  debtUSDC: bigint, 
  wethPrice: number
): number {
  const maxBorrowable = getSafeBorrowAmount(collateralWETH, wethPrice);
  const currentDebt = Number(formatUnits(debtUSDC, 6));
  
  return Math.max(0, maxBorrowable - currentDebt);
}


function calculateHealthData(
  collateralWETH: bigint, 
  debtUSDC: bigint, 
  wethPrice: number
): HealthData {
  const healthPercentage = calculateHealthPercentage(collateralWETH, debtUSDC, wethPrice);
  const healthFactor = calculateHealthFactor(collateralWETH, debtUSDC, wethPrice);
  const riskLevel = getRiskLevel(healthPercentage);
  const maxBorrowableUSD = getSafeBorrowAmount(collateralWETH, wethPrice);
  const currentDebt = Number(formatUnits(debtUSDC, 6));
  const currentBorrowCapacityUsed = maxBorrowableUSD > 0 ? (currentDebt / maxBorrowableUSD) * 100 : 0;
  const liquidationPrice = getLiquidationPrice(collateralWETH, debtUSDC);
  const safeBorrowAmount = getAvailableBorrowAmount(collateralWETH, debtUSDC, wethPrice);
  const bufferAmount = maxBorrowableUSD - currentDebt;

  return {
    healthPercentage,
    healthFactor,
    riskLevel,
    maxBorrowableUSD,
    currentBorrowCapacityUsed,
    liquidationPrice,
    safeBorrowAmount,
    bufferAmount,
  };
}