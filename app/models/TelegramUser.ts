import mongoose from 'mongoose'

const TelegramUserSchema = new mongoose.Schema({
  walletAddress: { type: String, required: true, unique: true },
  chatId: { type: String, required: true },
  linkedAt: { type: Date, default: Date.now },
  lastAlert50: { type: Date },
  lastAlert20: { type: Date },
  lastAlert5: { type: Date }
})

export default mongoose.models.TelegramUser || mongoose.model('TelegramUser', TelegramUserSchema)