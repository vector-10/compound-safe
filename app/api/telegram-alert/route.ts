import { NextRequest, NextResponse } from 'next/server'
import { generateHealthAlert } from '@/lib/telegram-helper'
import dbConnect from '@/lib/mongodb'
import TelegramUser from '@/app/models/TelegramUser'



interface TelegramUserDocument {
  walletAddress: string
  chatId: string
  linkedAt: Date
  lastAlert50?: Date
  lastAlert20?: Date
  lastAlert5?: Date
}

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

async function getTelegramUser(walletAddress: string): Promise<TelegramUserDocument | null> {
  try {
    await dbConnect()
    const user = await TelegramUser.findOne({ walletAddress })
    return user
  } catch {
    return null
  }
}

function shouldSendAlert(healthPercentage: number, user: TelegramUserDocument): boolean {
  const now = Date.now()
  const oneHour = 60 * 60 * 1000

  if (healthPercentage <= 5) {
    return !user.lastAlert5 || (now - new Date(user.lastAlert5).getTime()) >= oneHour
  }
  if (healthPercentage <= 20) {
    return !user.lastAlert20 || (now - new Date(user.lastAlert20).getTime()) >= oneHour
  }
  if (healthPercentage <= 50) {
    return !user.lastAlert50 || (now - new Date(user.lastAlert50).getTime()) >= oneHour
  }

  return false
}

async function updateLastAlertTime(walletAddress: string, healthLevel: number): Promise<void> {
  try {
    await dbConnect()
    const alertField = `lastAlert${healthLevel}`
    await TelegramUser.findOneAndUpdate(
      { walletAddress },
      { [alertField]: new Date() }
    )
  } catch (error) {
    console.error('Failed to update alert time:', error)
  }
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