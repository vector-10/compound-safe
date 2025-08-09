import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

interface AlertRequest {
 walletAddress: string
 healthPercentage: number
 riskLevel: 'safe' | 'warning' | 'danger'
 positionData: {
   collateralValueUSD: number
   borrowedUSDCFormatted: string
   liquidationPrice: number
   bufferAmount: number
   wethPrice: number
 }
}

interface TelegramUser {
 chatId: string
 lastAlert50?: number
 lastAlert20?: number
 lastAlert5?: number
 [key: string]: string | number | undefined
}

interface TelegramUsers {
 [walletAddress: string]: TelegramUser
}

const DATA_FILE = path.join(process.cwd(), 'data', 'telegram-users.json')

async function getTelegramUser(walletAddress: string): Promise<TelegramUser | null> {
 try {
   const data = await fs.readFile(DATA_FILE, 'utf8')
   const users: TelegramUsers = JSON.parse(data)
   return users[walletAddress] || null
 } catch {
   return null
 }
}

async function updateLastAlertTime(walletAddress: string, healthLevel: number): Promise<void> {
 try {
   let users: TelegramUsers = {}
   try {
     const data = await fs.readFile(DATA_FILE, 'utf8')
     users = JSON.parse(data)
   } catch {
     await fs.mkdir(path.dirname(DATA_FILE), { recursive: true })
   }

   if (users[walletAddress]) {
     const alertKey = `lastAlert${healthLevel}` as keyof TelegramUser
     users[walletAddress][alertKey] = Date.now()
     await fs.writeFile(DATA_FILE, JSON.stringify(users, null, 2))
   }
 } catch (error) {
   console.error('Failed to update alert time:', error)
 }
}

function shouldSendAlert(healthPercentage: number, user: TelegramUser): boolean {
 const now = Date.now()
 const oneHour = 60 * 60 * 1000

 if (healthPercentage <= 5) {
   return !user.lastAlert5 || (now - user.lastAlert5) >= oneHour
 }
 if (healthPercentage <= 20) {
   return !user.lastAlert20 || (now - user.lastAlert20) >= oneHour
 }
 if (healthPercentage <= 50) {
   return !user.lastAlert50 || (now - user.lastAlert50) >= oneHour
 }

 return false
}

async function sendTelegramMessage(chatId: string, message: string): Promise<void> {
 const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`
 
 await fetch(url, {
   method: 'POST',
   headers: { 'Content-Type': 'application/json' },
   body: JSON.stringify({
     chat_id: chatId,
     text: message,
     parse_mode: 'Markdown'
   })
 })
}




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


export async function POST(request: NextRequest) {
 try {
   const alertData: AlertRequest = await request.json()
   
   const telegramUser = await getTelegramUser(alertData.walletAddress)
   if (!telegramUser) {
     return NextResponse.json({ message: 'No Telegram user found' })
   }

   if (!shouldSendAlert(alertData.healthPercentage, telegramUser)) {
     return NextResponse.json({ message: 'Alert threshold not met' })
   }

   const healthLevel = alertData.healthPercentage <= 5 ? 5 : 
                      alertData.healthPercentage <= 20 ? 20 : 50

   const message = await generateHealthAlert(alertData)
   await sendTelegramMessage(telegramUser.chatId, message)
   await updateLastAlertTime(alertData.walletAddress, healthLevel)

   return NextResponse.json({ success: true })
 } catch (error) {
   console.error('Alert API error:', error)
   return NextResponse.json({ error: 'Failed to send alert' }, { status: 500 })
 }
}