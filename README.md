# [CompoundSafe](https://compound-safe.vercel.app)

Live Link:  [Live Application](https://compound-safe.vercel.app)

A comprehensive web application, enabling users manage risks and monitor the position of their assets on Compound Finance Protocol. It offers real-time AI powered alerts through a telegram integration for notifications and Conditional emails.

## Problem Statement

UNTIMELY LIQUIDATION remains one of the biggest risk for DeFi users(lenders and borrowers) till date, the current solutions that exist require manual monitoring with complex UX or basic threshold alerts without any context to users positioning.This makes DeFi a very tedious endeavour, with users always havign to be conscious of prices and market volatility. It also keeps the barrier to entry for Web3 DeFi very high, users should be able to let assets work for them and have automated risk management strategies that make DeFi more inclusive.

## Solution

CompoundSafe solves through an intuitive user interface/experience, comprehensive position monitoring and AI powered risk alerts for Compound Finance users with the Comet V3 integration for user assets. 

- **Real-time Position Health Tracking**: Continuous monitoring of Asset positions with a custom health factor calculation( factoring the 80% collateral lending by Compound) to enable healthy risk management
- **AI-Powered Telegram Alerts**: AI Powered Context-aware notifications that explain risks and provide specific actions through a telegram integration for users
- **Proactive Risk Management**: Early warning system with multiple threshold levels (50%, 20%, 5% health) enabling users take actions to save their assets position
- **Intelligent Explanations**: Gemini AI integration provides clear explanations of complex DeFi metrics on the dashboard through an experiment concept called AIUI (Artificial Intelligent User interface). 

## Key Features

### Core Functionality
- **Position Health Monitoring**: Real-time calculation of liquidation risk using Compound V3 data
- **Multi-Level Alert System**: Progressive warnings as positions approach liquidation, additional insights to enable lenders increase yields based on interest rates.
- **Telegram Integration**: Instant notifications with QR code and deep-link setup for Telegram
- **AI-Powered Insights**: Contextual explanations of position metrics and risk factors with AIUI

### Technical Features
- **Security**: Application is purely disconnected from compound to minimize risk of malicious intentions by attackers.
- **Compound V3 Integration**: Direct integration with Comet smart contracts as provided in documentation
- **Real-time Price Feeds**: Live pricing of Collateral Assets(Currently focused on WETH) with CoinGEcko API Integration
- **MongoDB Persistence**: Reliable storage for user preferences and alert history on Telegram
- **Intelligent Alert Throttling**: Prevents spam while ensuring critical alerts are delivered to users.

### User Experience
- **landing Page**: Responsive Landing Page with a mobile-first focus to enable users understand what we do at a glance.
- **Wallet Connect**: Full fetching of user data with just a simple wallet conect, very easy an intuitive
- **Responsive Design**: Mobile first design, philosophy, optimized for desktops
- **Comprehensive Dashboard**: Complete position overview with risk analysis and AI Explanations for easy understanding seamless usage.


## Architecture

### Frontend Stack
- **Next.js 15+**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling with theme support
- **Wagmi + RainbowKit**: Web3 wallet connection and blockchain interactions
- **Infura RPC**: For RPC connection to Compound V3 Comet 
- **React Hooks**: Custom hooks for Compound position data and price feeds

### Backend Infrastructure
- **Next.js API Routes**: Serverless API endpoints
- **MongoDB Atlas**: Cloud database for user data and alert preferences
- **Mongoose ODM**: Object modeling for MongoDB
- **Telegram Bot API**: Direct integration for message delivery
- **Google Gemini AI**: Advanced language model for intelligent alert generation

### Blockchain Integration
- **Compound V3 (Comet)**: Direct smart contract interactions
- **Ethereum Sepolia**: Built and Tested in Ethereum testnet
- **Ethereum Mainnet**: Primary network support for Mainnet
- **Viem**: Low-level Ethereum library for contract calls
- **Real-time Data**: Live position and market data


## Installation and Setup

### Prerequisites
- Node.js 18 or later 
- pnpm package manager
- MongoDB Atlas account and URI
- Telegram Bot Token
- Google Gemini API key


### Clone Repository
```bash
git clone https://github.com/yourusername/compound-safe.git
cd compound-safe
```

### Install Dependencies
```bash
pnpm install
```
### Environment Configuration
Create `.env.local` file:
```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_wallet_connect_id
NEXT_PUBLIC_RPC_URL=https://mainnet.infura.io/v3/your_infura_key
NEXT_PUBLIC_CHAIN=mainnet
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
GEMINI_API_KEY=your_gemini_api_key
```

Network configuration is environment-driven via `.env` variables, allowing seamless switching between Sepolia testnet and Ethereum mainnet by changing:
* `NEXT_PUBLIC_CHAIN` (`mainnet` or `sepolia`)
* `NEXT_PUBLIC_RPC_URL` (corresponding RPC endpoint)

This setup ensures easy testing and deployment without code changes.

**Example configurations:**

**For Mainnet:**
```env
NEXT_PUBLIC_CHAIN=mainnet
NEXT_PUBLIC_RPC_URL=https://mainnet.infura.io/v3/your_infura_key
```

**For Sepolia Testnet:**
```env
NEXT_PUBLIC_CHAIN=sepolia
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/your_infura_key
```

### Database Setup
1. Create MongoDB Atlas cluster
2. Create database named `compound-safe`
3. Configure network access and authentication
4. Update connection string in environment variables

### Telegram Bot Configuration
1. Create bot via [@BotFather](https://t.me/botfather)
2. Obtain bot token
3. Set webhook URL:
```bash
curl -X POST "https://api.telegram.org/bot<BOT_TOKEN>/setWebhook" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://yourdomain.com/api/telegram-webhook"}'
```

### Development Server
```bash
pnpm run dev
```

### Production Deployment
```bash
pnpm run build
pnpm start
```

## Usage Guide

### Initial Setup
1. Connect your Web3 wallet (MetaMask, WalletConnect, etc.)
2. Navigate to Risk Monitor page
3. Click "Open in Telegram" or scan QR code
4. Start conversation with bot using provided command
5. Receive confirmation of successful linking

### Position Monitoring
1. Dashboard shows real-time position health
2. Risk levels: Safe (green), Warning (yellow), Danger (red)
3. Detailed metrics include liquidation price, safety buffer, and borrowing capacity

### Alert Management
- **50% Health**: Early warning notifications
- **20% Health**: Critical risk alerts
- **5% Health**: Emergency liquidation warnings
- Alerts include specific actions and current market conditions

## Security Considerations

### Data Protection
- No private keys stored or transmitted
- Wallet addresses encrypted in database
- Environment variables for sensitive API keys
- Telegram chat IDs securely linked to wallet addresses in DB


## Testing and Validation

### Position Health Accuracy
- Validated against Compound V3 official interface
- Cross-checked liquidation calculations
- Real-time price feed accuracy verification

### Alert System Reliability
- Comprehensive testing of alert thresholds
- Telegram delivery confirmation
- MongoDB persistence validation
- AI response quality assurance

## Performance Optimization

### Frontend Optimization
- React component memoization
- Efficient re-rendering patterns
- Optimized blockchain call batching
- Lazy loading for improved initial load times

### Backend Efficiency
- MongoDB connection pooling
- API response caching where appropriate
- Efficient Telegram bot webhook handling
- Optimized smart contract call patterns


## Future Enhancements

1. **Lender-Focused Alerts**: Notifications for yield optimization opportunities
2. **Multi-Asset Support**: More integrations for all kinds on onchain Assets, whether used for collateral or supply.
3. **Advanced Analytics**: Historical position tracking and risk analysis data to help ne wusers maximize yields and their position.
4. **Improved AIUI**: AIUI is an experiment i started, depending on how users see it. Would love to improve it for feedback.
5. **WebSocket Integration**: Real-time data streaming from markets
6. **Advanced Error Handling**: Comprehensive error boundaries and recovery 
7. **Performance Monitoring**: Application performance tracking and optimization of user position
8. **Security Enhancements**: Additional security layers and audit compliance according to industry standards


---

**CompoundSafe** represents the next generation of DeFi risk management, combining real-time monitoring, intelligent alerts, and user-friendly interfaces to protect users from liquidation risks while maximizing their DeFi earnings potential.