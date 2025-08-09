import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

interface TelegramUsers {
  [walletAddress: string]: {
    chatId: string
    linkedAt: number
  }
}

const DATA_FILE = path.join(process.cwd(), 'data', 'telegram-users.json')

export async function POST(request: NextRequest) {
  try {
    const { walletAddress } = await request.json()    
    if (!walletAddress) {
      return NextResponse.json({ linked: false, error: 'No wallet address provided' })
    }

    try {
      const data = await fs.readFile(DATA_FILE, 'utf8')
      const users: TelegramUsers = JSON.parse(data)
      
      const isLinked = !!users[walletAddress]      
      return NextResponse.json({ 
        linked: isLinked,
        linkedAt: users[walletAddress]?.linkedAt || null
      })
    } catch {
      return NextResponse.json({ linked: false })
    }
  } catch (error) {
    console.error('Check telegram link error:', error)
    return NextResponse.json({ linked: false, error: 'Internal error' })
  }
}