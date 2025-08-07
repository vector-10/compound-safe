import { useReadContract, useReadContracts } from 'wagmi'
import { Address, formatUnits } from 'viem'

// Sepolia Testnet Addresses
export const COMPOUND_ADDRESSES = {
  COMET_USDC: '0xAec1F48e02Cfb822Be958B68C7957156EB3F0b6e' as Address,
  WETH: '0x2D5ee574e710219a521449679A4A7f2B43f043ad' as Address,
  USDC: '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238' as Address,
}

// Contract ABIs
export const COMET_ABI = [
  'function borrowBalanceOf(address account) external view returns (uint256)',
  'function collateralBalanceOf(address account, address asset) external view returns (uint128)',
  'function balanceOf(address account) external view returns (uint256)',
  'function getPrice(address priceFeed) external view returns (uint256)',
  'function getAssetInfo(uint8 i) external view returns (tuple(uint8 offset, address asset, address priceFeed, uint64 scale, uint64 borrowCollateralFactor, uint64 liquidateCollateralFactor, uint64 liquidationFactor, uint128 supplyCap))',
  'function numAssets() external view returns (uint8)',
  'function baseToken() external view returns (address)',
  'function baseScale() external view returns (uint256)',
  'function getUtilization() external view returns (uint256)',
  'function getBorrowRate(uint256 utilization) external view returns (uint64)',
  'function getSupplyRate(uint256 utilization) external view returns (uint64)',
] as const

export const ERC20_ABI = [
  'function balanceOf(address account) external view returns (uint256)',
  'function decimals() external view returns (uint8)',
  'function symbol() external view returns (string)',
  'function name() external view returns (string)',
] as const

// Types
export interface CompoundPosition {
  // Supplied (lending)
  suppliedUSDC: bigint
  suppliedUSDCFormatted: string
  
  // Borrowed (debt)
  borrowedUSDC: bigint
  borrowedUSDCFormatted: string
  
  // Collateral
  collateralWETH: bigint
  collateralWETHFormatted: string
  collateralValueUSD: number
  
  // Health metrics
  healthFactor: number
  utilizationRate: number
  riskLevel: 'safe' | 'warning' | 'danger'
  
  // Rates
  borrowRate: number
  supplyRate: number
  
  loading: boolean
  error: string | null
}

// Custom hook to get Compound position
export function useCompoundPosition(address?: Address): CompoundPosition {
  // Multi-contract read for efficiency
  const { data, isLoading, error } = useReadContracts({
    contracts: [
      // Debt (borrowed USDC)
      {
        address: COMPOUND_ADDRESSES.COMET_USDC,
        abi: COMET_ABI,
        functionName: 'borrowBalanceOf',
        args: [address!],
      },
      // Supplied USDC (base asset balance)
      {
        address: COMPOUND_ADDRESSES.COMET_USDC,
        abi: COMET_ABI,
        functionName: 'balanceOf',
        args: [address!],
      },
      // WETH collateral balance
      {
        address: COMPOUND_ADDRESSES.COMET_USDC,
        abi: COMET_ABI,
        functionName: 'collateralBalanceOf',
        args: [address!, COMPOUND_ADDRESSES.WETH],
      },
      // Utilization rate
      {
        address: COMPOUND_ADDRESSES.COMET_USDC,
        abi: COMET_ABI,
        functionName: 'getUtilization',
      },
    ],
    query: {
      enabled: !!address,
    },
  })

  // Extract results with proper type handling
  const borrowedResult = data?.[0]?.result as bigint | undefined
  const suppliedResult = data?.[1]?.result as bigint | undefined
  const collateralResult = data?.[2]?.result as bigint | undefined
  const utilizationResult = data?.[3]?.result as bigint | undefined

  // Process the data
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
    
    // Rough collateral value calculation (WETH * $2000 estimate)
    collateralValueUSD: collateralResult 
      ? Number(formatUnits(collateralResult, 18)) * 2000 
      : 0,
    
    utilizationRate: utilizationResult 
      ? Number(formatUnits(utilizationResult, 18)) * 100 
      : 0,
    
    // Simple health factor calculation
    healthFactor: calculateHealthFactor(
      collateralResult || BigInt(0), // collateral
      borrowedResult || BigInt(0)    // debt
    ),
    
    riskLevel: getRiskLevel(
      collateralResult || BigInt(0), // collateral
      borrowedResult || BigInt(0)    // debt
    ),
    
    borrowRate: 0, // Will calculate from utilization
    supplyRate: 0, // Will calculate from utilization
    
    loading: isLoading,
    error: error?.message || null,
  }

  return processedData
}

// Helper functions
function calculateHealthFactor(collateralWETH: bigint, debtUSDC: bigint): number {
  if (debtUSDC === BigInt(0)) return 999 // No debt = infinite health
  
  // Rough calculation: (collateral_value * liquidation_threshold) / debt
  const collateralValue = Number(formatUnits(collateralWETH, 18)) * 2000 // WETH price estimate
  const debt = Number(formatUnits(debtUSDC, 6))
  const liquidationThreshold = 0.8 // 80% typical threshold
  
  return (collateralValue * liquidationThreshold) / debt
}

function getRiskLevel(collateralWETH: bigint, debtUSDC: bigint): 'safe' | 'warning' | 'danger' {
  const healthFactor = calculateHealthFactor(collateralWETH, debtUSDC)
  
  if (healthFactor > 2) return 'safe'
  if (healthFactor > 1.2) return 'warning'
  return 'danger'
}

// Hook to check if address has any Compound position
export function useHasCompoundPosition(address?: Address): boolean {
  const position = useCompoundPosition(address)
  
  return position.borrowedUSDC > BigInt(0) || 
         position.suppliedUSDC > BigInt(0) || 
         position.collateralWETH > BigInt(0)
}




