import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import TelegramUser from '@/app/models/TelegramUser'

export async function POST(request: NextRequest) {
  try {
    const { walletAddress } = await request.json()
    
    if (!walletAddress) {
      return NextResponse.json({ linked: false })
    }

    await dbConnect()
    const user = await TelegramUser.findOne({ walletAddress })
    
    return NextResponse.json({ 
      linked: !!user,
      linkedAt: user?.linkedAt || null
    })
  } catch (error) {
    console.error('Check telegram link error:', error)
    return NextResponse.json({ linked: false })
  }
}