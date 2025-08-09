import { useState, useEffect } from 'react';
import { useToast } from './use-toast';

interface PriceData {
  price: number;
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}

export function useWETHPrice(): PriceData {
  const [priceData, setPriceData] = useState<PriceData>({
    price: 0,
    loading: true,
    error: null,
    lastUpdated: null,
  });

  const { showError } = useToast();

  const fetchWETHPrice = async () => {
    try {
      setPriceData(prev => ({ ...prev, loading: true, error: null }));
      
      const response = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=weth&vs_currencies=usd&include_last_updated_at=true',
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.weth || !data.weth.usd) {
        throw new Error('Invalid price data received');
      }

      setPriceData({
        price: data.weth.usd,
        loading: false,
        error: null,
        lastUpdated: new Date(data.weth.last_updated_at * 1000),
      });

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch WETH price';
      
      setPriceData(prev => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));

      showError(`Price fetch failed: ${errorMessage}`);
      
      setPriceData(prev => ({
        ...prev,
        price: 2400,
        loading: false,
      }));
    }
  };


  useEffect(() => {
    fetchWETHPrice();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchWETHPrice();
    }, 60000); 

    return () => clearInterval(interval);
  }, []);

  return priceData;
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}

export function getPriceAge(lastUpdated: Date | null): string {
  if (!lastUpdated) return 'Unknown';
  
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - lastUpdated.getTime()) / 1000);
  
  if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  return `${Math.floor(diffInSeconds / 3600)}h ago`;
}