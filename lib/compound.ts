// import { useReadContracts } from 'wagmi'
// import { Address, formatUnits } from 'viem'

// export const COMPOUND_ADDRESSES = {
//   COMET_USDC: '0xAec1F48e02Cfb822Be958B68C7957156EB3F0b6e' as Address,
//   WETH: '0x2D5ee574e710219a521449679A4A7f2B43f046ad' as Address,
//   USDC: '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238' as Address,
// }

// export const COMET_ABI = [
//   'function borrowBalanceOf(address account) external view returns (uint256)',
//   'function collateralBalanceOf(address account, address asset) external view returns (uint128)',
//   'function balanceOf(address account) external view returns (uint256)',
//   'function getPrice(address priceFeed) external view returns (uint256)',
//   'function getAssetInfo(uint8 i) external view returns (tuple(uint8 offset, address asset, address priceFeed, uint64 scale, uint64 borrowCollateralFactor, uint64 liquidateCollateralFactor, uint64 liquidationFactor, uint128 supplyCap))',
//   'function numAssets() external view returns (uint8)',
//   'function baseToken() external view returns (address)',
//   'function baseScale() external view returns (uint256)',
//   'function getUtilization() external view returns (uint256)',
//   'function getBorrowRate(uint256 utilization) external view returns (uint64)',
//   'function getSupplyRate(uint256 utilization) external view returns (uint64)',
// ] as const

// export const ERC20_ABI = [
//   'function balanceOf(address account) external view returns (uint256)',
//   'function decimals() external view returns (uint8)',
//   'function symbol() external view returns (string)',
//   'function name() external view returns (string)',
// ] as const

// export interface CompoundPosition {
//   suppliedUSDC: bigint
//   suppliedUSDCFormatted: string
  
//   borrowedUSDC: bigint
//   borrowedUSDCFormatted: string
  
//   collateralWETH: bigint
//   collateralWETHFormatted: string
//   collateralValueUSD: number
  
//   healthFactor: number
//   utilizationRate: number
//   riskLevel: 'safe' | 'warning' | 'danger'
  
//   borrowRate: number
//   supplyRate: number
  
//   loading: boolean
//   error: string | null
// }


// export function useCompoundPosition(address?: Address): CompoundPosition {
//   const { data, isLoading, error } = useReadContracts({
//     contracts: [
//       {
//         address: COMPOUND_ADDRESSES.COMET_USDC,
//         abi: COMET_ABI,
//         functionName: 'borrowBalanceOf',
//         args: [address!],
//       },
//       {
//         address: COMPOUND_ADDRESSES.COMET_USDC,
//         abi: COMET_ABI,
//         functionName: 'balanceOf',
//         args: [address!],
//       },
//       {
//         address: COMPOUND_ADDRESSES.COMET_USDC,
//         abi: COMET_ABI,
//         functionName: 'collateralBalanceOf',
//         args: [address!, COMPOUND_ADDRESSES.WETH],
//       },
//       {
//         address: COMPOUND_ADDRESSES.COMET_USDC,
//         abi: COMET_ABI,
//         functionName: 'getUtilization',
//       },
//     ],
//     query: {
//       enabled: !!address,
//     },
//   })

//   const borrowedResult = data?.[0]?.result as bigint | undefined
//   const suppliedResult = data?.[1]?.result as bigint | undefined
//   const collateralResult = data?.[2]?.result as bigint | undefined
//   const utilizationResult = data?.[3]?.result as bigint | undefined

//   const processedData: CompoundPosition = {
//     suppliedUSDC: suppliedResult || BigInt(0),
//     suppliedUSDCFormatted: suppliedResult 
//       ? formatUnits(suppliedResult, 6) 
//       : '0.00',
    
//     borrowedUSDC: borrowedResult || BigInt(0),
//     borrowedUSDCFormatted: borrowedResult 
//       ? formatUnits(borrowedResult, 6) 
//       : '0.00',
    
//     collateralWETH: collateralResult || BigInt(0),
//     collateralWETHFormatted: collateralResult 
//       ? formatUnits(collateralResult, 18) 
//       : '0.00',
    
//     collateralValueUSD: collateralResult 
//       ? Number(formatUnits(collateralResult, 18)) * 2000 
//       : 0,
    
//     utilizationRate: utilizationResult 
//       ? Number(formatUnits(utilizationResult, 18)) * 100 
//       : 0,
    
//     healthFactor: calculateHealthFactor(
//       collateralResult || BigInt(0), 
//       borrowedResult || BigInt(0)   
//     ),
    
//     riskLevel: getRiskLevel(
//       collateralResult || BigInt(0), 
//       borrowedResult || BigInt(0)   
//     ),
    
//     borrowRate: 0, 
//     supplyRate: 0, 
    
//     loading: isLoading,
//     error: error?.message || null,
//   }

//   return processedData
// }



// function calculateHealthFactor(collateralWETH: bigint, debtUSDC: bigint): number {
//   if (debtUSDC === BigInt(0)) return 999 
  
//   const collateralValue = Number(formatUnits(collateralWETH, 18)) * 2000 
//   const debt = Number(formatUnits(debtUSDC, 6))
//   const liquidationThreshold = 0.8 
  
//   return (collateralValue * liquidationThreshold) / debt
// }

// function getRiskLevel(collateralWETH: bigint, debtUSDC: bigint): 'safe' | 'warning' | 'danger' {
//   const healthFactor = calculateHealthFactor(collateralWETH, debtUSDC)
  
//   if (healthFactor > 2) return 'safe'
//   if (healthFactor > 1.2) return 'warning'
//   return 'danger'
// }


// export function useHasCompoundPosition(address?: Address): boolean {
//   const position = useCompoundPosition(address)
  
//   return position.borrowedUSDC > BigInt(0) || 
//          position.suppliedUSDC > BigInt(0) || 
//          position.collateralWETH > BigInt(0)
// }


import { useReadContract } from 'wagmi'
import { Address, formatUnits } from 'viem'

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
  utilizationRate: number
  riskLevel: 'safe' | 'warning' | 'danger'
  borrowRate: number
  supplyRate: number
  loading: boolean
  error: string | null
}

export function useCompoundPosition(address?: Address): CompoundPosition {
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

  const isLoading = borrowLoading || suppliedLoading || collateralLoading || utilizationLoading

  // Debug logs
  console.log('🔍 INDIVIDUAL CALLS DEBUG:');
  console.log('Address:', address);
  console.log('Borrow balance:', borrowBalance, 'Loading:', borrowLoading, 'Error:', borrowError);
  console.log('Supplied balance:', suppliedBalance, 'Loading:', suppliedLoading);
  console.log('Collateral balance:', collateralBalance, 'Loading:', collateralLoading);
  console.log('Utilization:', utilization, 'Loading:', utilizationLoading);
  console.log('Collateral Debug:');
  console.log('- Balance:', collateralBalance);
  console.log('- Loading:', collateralLoading);
  console.log('- Error:', collateralError); 
  console.log('- WETH Address used:', COMPOUND_ADDRESSES.WETH);


  const borrowedResult = borrowBalance as bigint | undefined
  const suppliedResult = suppliedBalance as bigint | undefined
  const collateralResult = collateralBalance as bigint | undefined
  const utilizationResult = utilization as bigint | undefined

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
      ? Number(formatUnits(collateralResult, 18)) * 2000 
      : 0,
    
    utilizationRate: utilizationResult 
      ? Number(formatUnits(utilizationResult, 18)) * 100 
      : 0,
    
    healthFactor: calculateHealthFactor(
      collateralResult || BigInt(0), 
      borrowedResult || BigInt(0)   
    ),
    
    riskLevel: getRiskLevel(
      collateralResult || BigInt(0), 
      borrowedResult || BigInt(0)   
    ),
    
    borrowRate: 0, 
    supplyRate: 0, 
    
    loading: isLoading,
    error: borrowError?.message || null,
  }

  console.log('Final data:', processedData);
  return processedData
}

function calculateHealthFactor(collateralWETH: bigint, debtUSDC: bigint): number {
  if (debtUSDC === BigInt(0)) return 999 
  
  const collateralValue = Number(formatUnits(collateralWETH, 18)) * 2000 
  const debt = Number(formatUnits(debtUSDC, 6))
  const liquidationThreshold = 0.8 
  
  return (collateralValue * liquidationThreshold) / debt
}

function getRiskLevel(collateralWETH: bigint, debtUSDC: bigint): 'safe' | 'warning' | 'danger' {
  const healthFactor = calculateHealthFactor(collateralWETH, debtUSDC)
  
  if (healthFactor > 2) return 'safe'
  if (healthFactor > 1.2) return 'warning'
  return 'danger'
}