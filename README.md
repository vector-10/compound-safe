# CompoundSafe 🛡️

> A focused DeFi tool that keeps users from getting liquidated by making their lending positions make sense—visually, intuitively, and with AI that talks like a human, not a whitepaper.

**🏆 Built for Compound Connect Global Hackathon 2025**

## 🎯 Problem Statement

DeFi users face three critical issues with Compound Finance:
- **🔥 Liquidation Risk**: Users lose money when collateral ratios drop below safe thresholds
- **🤯 Complex UX**: Technical interfaces that confuse everyday users
- **📱 Desktop-Only**: Most DeFi tools aren't optimized for mobile usage

**CompoundSafe solves this by combining real-time risk monitoring with AI-powered explanations in a mobile-first interface.**

## ✨ Features

### 🔗 **Smart Wallet Integration**
- Connect MetaMask or WalletConnect seamlessly
- Auto-detect Compound Finance positions
- Real-time balance and position tracking

### 🧠 **AI Risk Explainer**
- Plain English explanations of your lending position
- "If ETH drops 15%, you'll be at risk of liquidation"
- Personalized suggestions: "Consider adding $120 USDC as collateral"

### 📊 **Visual Risk Dashboard**
- **Green Zone**: Your position is safe
- **Yellow Zone**: Moderate risk, monitor closely  
- **Red Zone**: Critical - take action immediately
- Mobile-optimized health score visualization

### 🚨 **Proactive Alerts**
- Telegram or email notifications when risk increases
- Set custom alert thresholds
- Daily position summaries

### 📱 **Mobile-First Design**
- Responsive interface that works perfectly on phones
- Dark/light mode support
- Intuitive swipe and tap interactions

## 🛠️ Tech Stack

| Category | Tools |
|----------|-------|
| **Frontend** | Next.js, TypeScript, React, Tailwind CSS |
| **Wallet** | wagmi, viem, WalletConnect |
| **DeFi Integration** | compound-js, Comet SDK, Ethers.js |
| **AI** | Google Gemini API |
| **Alerts** | Telegram Bot API, Nodemailer |
| **Database** | Supabase (for user preferences) |
| **Deployment** | Vercel with CRON jobs |

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm
- MetaMask browser extension

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/compound-safe.git
cd compound-safe

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Add your API keys (see Environment Setup below)

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### Environment Setup

Create `.env.local` with:

```bash
# Gemini AI API
GEMINI_API_KEY=your_gemini_api_key_here

# Telegram Bot (optional)
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
TELEGRAM_CHAT_ID=your_chat_id

# Database (optional)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 📱 How It Works

### 1. **Connect & Analyze**
```
User connects wallet → CompoundSafe detects positions → 
Calculate collateral ratios → Generate risk score
```

### 2. **AI Explanation**
```
Position data → Gemini AI → Plain English summary →
"You have $1,000 USDC borrowed against $1,500 ETH. 
If ETH drops 20%, you risk liquidation."
```

### 3. **Monitor & Alert**
```
CRON job checks positions → Risk threshold crossed → 
Send Telegram/email alert → User takes action
```

## 🧪 Development Roadmap

### ✅ Phase 1 (Days 1-2): Core Integration
- [x] Next.js + TypeScript setup
- [x] Wallet connection with wagmi
- [x] Compound.js position fetching
- [x] Basic risk calculation logic

### ✅ Phase 2 (Days 3-4): AI & UI
- [x] Gemini API integration
- [x] Mobile-responsive dashboard
- [x] Risk visualization components
- [x] AI explanation display

### ✅ Phase 3 (Days 5-6): Alerts & Polish
- [x] Telegram notification system
- [x] Alert preference forms
- [x] CRON job for monitoring
- [x] UI/UX improvements

### 🔄 Phase 4 (Day 7): Testing & Submission
- [ ] Cross-browser testing
- [ ] Demo video recording
- [ ] Documentation finalization
- [ ] Hackathon submission

## 🎥 Demo

[📺 Watch Demo Video](link-to-demo-video)

**Try it live**: [compound-safe.vercel.app](https://compound-safe.vercel.app)

## 🏗️ Project Structure

compound-safe/
├── app/
│   ├── page.tsx               # Main page (home/dashboard)
│   ├── layout.tsx             # Root layout (global styles)
│   └── api/
│       ├── explain/route.ts   # Gemini AI API route
│       └── check-risk/route.ts # Alert checker route
│
├── components/
│   ├── WalletConnect.tsx      # Connect button (wagmi + rainbowkit)
│   ├── RiskBar.tsx            # Shows risk level visually
│   ├── PositionCard.tsx       # Shows supply/borrow details
│   ├── AlertForm.tsx          # Telegram/email input
│   └── AIExplainer.tsx        # Shows AI explanation
│
├── lib/
│   ├── compound.ts            # Compound.js logic & helpers
│   ├── risk.ts                # Collateral ratio & risk level functions
│   └── telegram.ts            # Alert sending logic
│
├── styles/
│   └── globals.css            # Tailwind styles
│
├── public/                    # Icons, logo, etc.
├── .env.local                 # API keys, bot tokens
├── tailwind.config.ts
├── tsconfig.json
├── next.config.js
└── README.md


## 🤝 Contributing

This project was built for the Compound Connect Global Hackathon. Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Compound Finance** for the amazing DeFi infrastructure
- **Compound Connect Hackathon** organizers
- **Wagmi & Viem** teams for excellent wallet tooling
- **Google Gemini** for AI capabilities
- **Vercel** for seamless deployment

---

**Built with ❤️ for the DeFi community**

*Making DeFi safer, one position at a time.*