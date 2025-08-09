export async function generateHealthAlert(alertData: {
    healthPercentage: number
    riskLevel: 'safe' | 'warning' | 'danger'
    positionData: {
      collateralValueUSD: number
      borrowedUSDCFormatted: string
      liquidationPrice: number
      wethPrice: number
    }
  }): Promise<string> {
    const prompt = `Generate a urgent Telegram alert for Compound Finance position:
  - Health: ${alertData.healthPercentage}%
  - Risk: ${alertData.riskLevel}
  - Collateral: $${alertData.positionData.collateralValueUSD.toFixed(0)}
  - Borrowed: $${alertData.positionData.borrowedUSDCFormatted}
  - Liquidation at: $${alertData.positionData.liquidationPrice.toFixed(0)}
  - Current WETH: $${alertData.positionData.wethPrice}
  
  Make it urgent, actionable, under 100 words. Include specific next steps.`
  
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { maxOutputTokens: 150, temperature: 0.7 }
        })
      }
    )
  
    const data = await response.json()
    return data.candidates?.[0]?.content?.parts?.[0]?.text || 'Health Alert: Check your position immediately!'
  }