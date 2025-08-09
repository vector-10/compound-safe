import { NextRequest, NextResponse } from 'next/server';

interface ExplainRequest {
  metric: string;
  value: string | number;
  position: {
    healthPercentage: number;
    healthFactor: number;
    riskLevel: 'safe' | 'warning' | 'danger';
    collateralValueUSD: number;
    borrowedUSDCFormatted: string;
    liquidationPrice: number;
    safeBorrowAmount: number;
    wethPrice: number;
    maxBorrowableUSD: number;
    currentBorrowCapacityUsed: number;
  };
}

export async function POST(request: NextRequest) {
  try {
    const { metric, value, position }: ExplainRequest = await request.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'AI service not configured' },
        { status: 500 }
      );
    }

    const prompt = generatePrompt(metric, value, position);
    
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt
                }
              ]
            }
          ],
          generationConfig: {
            maxOutputTokens: 150,
            temperature: 0.7,
          }
        })
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const explanation = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!explanation) {
      throw new Error('No explanation generated');
    }

    return NextResponse.json({ 
      explanation: explanation.trim(),
      success: true 
    });

  } catch (error) {
    console.error('AI Explanation error:', error);
    console.log(error)
    

    let metric = 'unknown';
    let value = 'N/A';
    let position = {};
    
    try {
      const body = await request.json();
      metric = body.metric || 'unknown';
      value = body.value || 'N/A';
      position = body.position || {};
    } catch (parseError) {
      console.error('Failed to parse request for fallback:', parseError);
    }    

    const fallbackExplanation = getFallbackExplanation(metric, value, position);

    return NextResponse.json({ 
      explanation: fallbackExplanation,
      success: true,
      fallback: true
    });
  }
}

function generatePrompt(metric: string, value: string | number, position: any): string {
  const baseContext = `
  Current Position Context:
  - Health: ${position.healthPercentage}% (${position.riskLevel})
  - Collateral: $${position.collateralValueUSD?.toLocaleString()} WETH
  - Borrowed: ${position.borrowedUSDCFormatted} USDC
  - WETH Price: $${position.wethPrice?.toLocaleString()}
  - Liquidation Price: $${position.liquidationPrice?.toLocaleString()}
  `;

  const prompts = {
    'healthPercentage': `${baseContext}
    Explain what "${value}%" position health means in simple terms. Include:
    - What this percentage represents
    - Why it matters for liquidation risk
    - Specific actionable advice based on current ${position.riskLevel} status
    Keep it under 50 words, conversational tone.`,

    'liquidationPrice': `${baseContext}
    Explain what liquidation price $${value} means. Include:
    - What happens if WETH hits this price
    - How far current price ($${position.wethPrice}) is from liquidation
    - Specific advice to avoid liquidation
    Keep it under 50 words, practical tone.`,

    'safeBorrowAmount': `${baseContext}
    Explain what "$${value} available to borrow" means. Include:
    - How this amount is calculated
    - Whether it's safe to borrow this full amount
    - Risk considerations for borrowing more
    Keep it under 50 words, advisory tone.`,

    'riskLevel': `${baseContext}
    Explain why this position is classified as "${value}" risk. Include:
    - What factors determine this risk level
    - Specific thresholds for risk categories
    - Next steps to improve or maintain risk level
    Keep it under 50 words, educational tone.`,

    'currentBorrowCapacityUsed': `${baseContext}
    Explain what "${value}% capacity used" means. Include:
    - What borrowing capacity represents
    - Why this percentage matters
    - When to be concerned about this metric
    Keep it under 50 words, clear tone.`,

    'collateralValueUSD': `${baseContext}
    Explain the collateral value of $${value}. Include:
    - How collateral protects lenders
    - Why WETH price changes matter
    - Relationship to borrowing power
    Keep it under 50 words, informative tone.`
  };

  return prompts[metric as keyof typeof prompts] || `Explain the metric "${metric}" with value "${value}" in the context of DeFi lending. Keep it simple and under 50 words.`;
}

function getFallbackExplanation(metric: string, value: string | number, position: any): string {
  const fallbacks = {
    'healthPercentage': `${value}% health means you're using ${100 - Number(value)}% of your borrowing capacity. Above 50% is safe, below 20% risks liquidation.`,
    
    'liquidationPrice': `If WETH drops to $${value}, your position gets liquidated. Current WETH is $${position.wethPrice}, giving you a ${((position.wethPrice - Number(value)) / position.wethPrice * 100).toFixed(1)}% price buffer.`,
    
    'safeBorrowAmount': `You can safely borrow $${value} more without entering the danger zone. This maintains a healthy safety buffer.`,
    
    'riskLevel': `${value} risk level based on your ${position.healthPercentage}% health. Safe: >50%, Warning: 20-50%, Danger: <20%.`,
    
    'currentBorrowCapacityUsed': `${value}% of your maximum borrowing capacity is currently used. Higher percentages mean greater liquidation risk.`,
    
    'collateralValueUSD': `Your $${value} WETH collateral backs your USDC loan. If WETH price falls, your liquidation risk increases.`
  };

  return fallbacks[metric as keyof typeof fallbacks] || `This metric shows ${value} for your position.`;
}