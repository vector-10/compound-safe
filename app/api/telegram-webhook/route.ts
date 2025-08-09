import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

interface TelegramUpdate {
 message?: {
   chat: {
     id: number
   }
   text?: string
   from?: {
     first_name?: string
   }
 }
}

interface TelegramUsers {
 [walletAddress: string]: {
   chatId: string
   linkedAt: number
 }
}

const DATA_FILE = path.join(process.cwd(), 'data', 'telegram-users.json')

async function sendTelegramMessage(chatId: number, text: string): Promise<void> {
 await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
   method: 'POST',
   headers: { 'Content-Type': 'application/json' },
   body: JSON.stringify({
     chat_id: chatId,
     text,
     parse_mode: 'Markdown'
   })
 })
}

async function linkWalletToTelegram(walletAddress: string, chatId: string): Promise<void> {
 try {
   let users: TelegramUsers = {}   
   try {
     const data = await fs.readFile(DATA_FILE, 'utf8')
     users = JSON.parse(data)
   } catch {
     await fs.mkdir(path.dirname(DATA_FILE), { recursive: true })
   }

   users[walletAddress] = {
     chatId,
     linkedAt: Date.now()
   }

   await fs.writeFile(DATA_FILE, JSON.stringify(users, null, 2))
 } catch (error) {
   console.error('Failed to link wallet:', error)
   throw error
 }
}

export async function POST(request: NextRequest) {
 try {
   const update: TelegramUpdate = await request.json()
   
   if (!update.message || !update.message.text) {
     return NextResponse.json({ ok: true })
   }

   const { chat, text } = update.message
   const chatId = chat.id

   if (text.startsWith('/start ')) {
     const walletAddress = text.split(' ')[1]
     
     if (!walletAddress || !walletAddress.startsWith('0x')) {
       await sendTelegramMessage(chatId, '❌ Invalid wallet address. Please use the link from CompoundSafe app.')
       return NextResponse.json({ ok: true })
     }

     try {
       await linkWalletToTelegram(walletAddress, chatId.toString())
       
       const welcomeMessage = `🔗 *Alerts Linked Successfully!*

        Your wallet \`${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}\` is now connected to CompoundSafe alerts.

        You'll receive notifications when:
        - Position health drops to 50% (Warning)
        - Position health drops to 20% (Critical) 
        - Position health drops to 5% (Emergency)

        Stay safe! 🛡️`

       await sendTelegramMessage(chatId, welcomeMessage)
     } catch  {
       await sendTelegramMessage(chatId, '❌ Failed to link wallet. Please try again.')
     }
   }
   

   else if (text === '/start') {
     const message = `👋 Welcome to CompoundSafe Bot!

            To get started:
            1. Open the CompoundSafe app
            2. Go to Risk Monitor page
            3. Click "Open in Telegram" to link your wallet

            This will enable real-time liquidation alerts for your Compound positions.`

     await sendTelegramMessage(chatId, message)
   }

   return NextResponse.json({ ok: true })
 } catch (error) {
   console.error('Webhook error:', error)
   return NextResponse.json({ ok: true })
 }
}


//https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook?url=https://yourdomain.com/api/telegram-webhook