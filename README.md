# CompoundSafe

A comprehensive DeFi risk management platform that provides real-time liquidation alerts and position monitoring for Compound Finance V3 users through intelligent Telegram notifications.

## Problem Statement

DeFi users face constant liquidation risks due to volatile crypto markets and changing collateral values. Current solutions require manual monitoring or basic threshold alerts without context. Users need intelligent, proactive risk management that provides actionable insights to protect their positions.

## Solution

CompoundSafe delivers intelligent risk monitoring through:

- **Real-time Position Health Tracking**: Continuous monitoring of Compound V3 positions with precise health calculations
- **AI-Powered Telegram Alerts**: Context-aware notifications that explain risks and provide specific actions
- **Proactive Risk Management**: Early warning system with multiple threshold levels (50%, 20%, 5% health)
- **Intelligent Explanations**: Gemini AI integration provides clear explanations of complex DeFi metrics

## Key Features

### Core Functionality
- **Position Health Monitoring**: Real-time calculation of liquidation risk using Compound V3 data
- **Multi-Level Alert System**: Progressive warnings as positions approach liquidation
- **Telegram Integration**: Instant notifications with QR code and deep-link setup
- **AI-Powered Insights**: Contextual explanations of position metrics and risk factors

### Technical Features
- **Compound V3 Integration**: Direct integration with Comet smart contracts
- **Real-time Price Feeds**: Live WETH pricing from CoinGecko API
- **MongoDB Persistence**: Reliable storage for user preferences and alert history
- **Intelligent Alert Throttling**: Prevents spam while ensuring critical alerts are delivered

### User Experience
- **One-Click Setup**: Simple Telegram bot linking process
- **Dark/Light Mode**: Complete theme support across all interfaces
- **Responsive Design**: Optimized for desktop and mobile devices
- **Comprehensive Dashboard**: Complete position overview with risk analysis

## Architecture

### Frontend Stack
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling with theme support
- **Wagmi + RainbowKit**: Web3 wallet connection and blockchain interactions
- **React Hooks**: Custom hooks for Compound position data and price feeds

### Backend Infrastructure
- **Next.js API Routes**: Serverless API endpoints
- **MongoDB Atlas**: Cloud database for user data and alert preferences
- **Mongoose ODM**: Object modeling for MongoDB
- **Telegram Bot API**: Direct integration for message delivery
- **Google Gemini AI**: Advanced language model for intelligent alert generation

### Blockchain Integration
- **Compound V3 (Comet)**: Direct smart contract interactions
- **Ethereum Mainnet**: Primary network support
- **Viem**: Low-level Ethereum library for contract calls
- **Real-time Data**: Live position and market data

## Technical Implementation

### Smart Contract Integration
```typescript
// Real-time position health calculation
const healthData = calculateHealthData(
  collateralWETH,
  borrowedUSDC,
  wethPrice
)

// Direct Compound V3 contract calls
const borrowBalance = useReadContract({
  address: COMPOUND_ADDRESSES.COMET_USDC,
  functionName: 'borrowBalanceOf',
  args: [userAddress]
})
```

### Alert Intelligence
```typescript
// AI-powered alert generation
const alert = await generateHealthAlert({
  healthPercentage: 15,
  riskLevel: 'danger',
  positionData: {
    collateralValueUSD: 5000,
    borrowedAmount: 4000,
    liquidationPrice: 2100
  }
})
```

### Database Schema
```typescript
// User-Telegram mapping with alert history
interface TelegramUser {
  walletAddress: string
  chatId: string
  linkedAt: Date
  lastAlert50?: Date
  lastAlert20?: Date
  lastAlert5?: Date
}
```

## Installation and Setup

### Prerequisites
- Node.js 18 or later
- pnpm package manager
- MongoDB Atlas account
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
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_wallet_connect_id
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/compound-safe
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
GEMINI_API_KEY=your_gemini_api_key
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
pnpm dev
```

### Production Deployment
```bash
pnpm build
pnpm start
```

## API Endpoints

### Telegram Integration
- `POST /api/telegram-webhook` - Receives Telegram messages and handles bot interactions
- `POST /api/telegram-alert` - Sends intelligent alerts to linked users
- `POST /api/check-telegram-link` - Verifies if wallet is linked to Telegram

### AI Services
- `POST /api/ai-explain` - Generates explanations for DeFi metrics
- `PUT /api/ai-explain` - Generates health alert messages

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

## Project Structure

```
compound-safe/
├── app/
│   ├── api/                    # API routes
│   │   ├── ai-explain/         # AI explanation endpoints
│   │   ├── check-telegram-link/ # Telegram verification
│   │   ├── telegram-alert/     # Alert sending system
│   │   └── telegram-webhook/   # Bot message handling
│   ├── components/             # Reusable UI components
│   ├── dashboard/              # Dashboard pages
│   └── globals.css             # Global styles
├── lib/                        # Utility libraries
│   ├── compound.ts            # Compound V3 integration
│   ├── mongodb.ts             # Database connection
│   ├── telegram-helpers.ts    # Alert generation
│   └── utilities.ts           # Price feeds and helpers
├── models/                     # Database schemas
│   └── TelegramUser.ts        # User model
└── types/                      # TypeScript definitions
    └── global.d.ts            # Global type declarations
```

## Security Considerations

### Data Protection
- No private keys stored or transmitted
- Wallet addresses encrypted in database
- Environment variables for sensitive API keys
- Telegram chat IDs securely linked to wallet addresses

### Smart Contract Safety
- Read-only contract interactions
- No transaction signing or fund handling
- Direct integration with verified Compound V3 contracts
- Real-time data validation and error handling

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

### Planned Features
1. **Lender-Focused Alerts**: Notifications for yield optimization opportunities
2. **Multi-Protocol Support**: Integration with Aave, MakerDAO, and other DeFi protocols
3. **Advanced Analytics**: Historical position tracking and risk analysis
4. **Mobile Application**: Native mobile app for enhanced user experience

### Technical Improvements
1. **WebSocket Integration**: Real-time data streaming
2. **Advanced Error Handling**: Comprehensive error boundaries and recovery
3. **Performance Monitoring**: Application performance tracking and optimization
4. **Security Enhancements**: Additional security layers and audit compliance

## Contributing

### Development Guidelines
1. Follow TypeScript strict mode
2. Maintain comprehensive test coverage
3. Use conventional commit messages
4. Ensure responsive design compatibility

### Code Standards
- ESLint and Prettier configuration
- Component-based architecture
- Comprehensive error handling
- Type safety throughout codebase

## License

MIT License - see LICENSE file for details

## Contact and Support

For technical support, feature requests, or partnership inquiries:
- GitHub Issues: [Project Issues](https://github.com/yourusername/compound-safe/issues)
- Documentation: [Full Documentation](https://compound-safe-docs.vercel.app)
- Demo: [Live Application](https://compound-safe.vercel.app)

---

**CompoundSafe** represents the next generation of DeFi risk management, combining real-time monitoring, intelligent alerts, and user-friendly interfaces to protect users from liquidation risks while maximizing their DeFi earnings potential.