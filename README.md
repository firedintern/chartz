# Chartz

A cryptocurrency charting application with customization, sharing, and gallery features. Built with React and React Native for web and mobile platforms.

## Features

- Real-time cryptocurrency price tracking
- Interactive candlestick and line charts
- Customizable chart types, colors, and time ranges
- Chart gallery with social features (upvotes, views)
- Share charts with the community
- Cross-platform support (Web & Mobile)

## Tech Stack

### Web App
- **Framework**: React 18 with React Router 7
- **Build Tool**: Vite
- **Styling**: TailwindCSS, Emotion, Chakra UI
- **Charts**: Recharts
- **State Management**: Zustand, TanStack Query
- **Authentication**: Auth.js
- **Database**: Neon (PostgreSQL)
- **Testing**: Vitest, Testing Library

### Mobile App
- **Framework**: React Native with Expo
- **Router**: Expo Router
- **Runtime**: Metro bundler
- **Cross-platform**: iOS, Android, and Web support

## Project Structure

```
chartz/
├── apps/
│   ├── web/          # Web application
│   │   ├── src/
│   │   │   ├── app/          # Routes and pages
│   │   │   ├── components/   # React components
│   │   │   ├── hooks/        # Custom React hooks
│   │   │   └── utils/        # Utility functions
│   │   └── package.json
│   └── mobile/       # Mobile application
│       ├── src/
│       │   ├── app/          # Expo Router pages
│       │   ├── components/   # React Native components
│       │   └── utils/        # Utility functions
│       └── package.json
└── .github/          # GitHub workflows
```

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- npm, yarn, or bun

### Web App

```bash
cd apps/web
npm install
npm run dev
```

### Mobile App

```bash
cd apps/mobile
npm install
npm start
```

## Environment Variables

Create a `.env.local` file in `apps/web/` with the following:

```env
# Database
DATABASE_URL=your_neon_database_url

# Authentication
AUTH_SECRET=your_auth_secret

# API Keys (if needed)
CRYPTO_API_KEY=your_crypto_api_key
```

## API Routes

The web app includes several API endpoints:

- `/api/crypto/list` - Get list of cryptocurrencies
- `/api/crypto/[symbol]/history` - Get price history for a symbol
- `/api/charts/save` - Save a chart configuration
- `/api/gallery/list` - Get gallery charts
- `/api/gallery/[id]/upvote` - Upvote a gallery chart
- `/api/gallery/share` - Share a chart to gallery

## Development

### Running Tests

```bash
# Web app
cd apps/web
npm run test

# Type checking
npm run typecheck
```

### Building for Production

```bash
# Web app
cd apps/web
npm run build

# Mobile app
cd apps/mobile
npm run build
```

## Deployment

### Deploying to Vercel

The web app is configured for easy deployment to Vercel:

1. **Import your repository**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import `firedintern/chartz` from GitHub

2. **Configure the project**:
   - Vercel will automatically detect the monorepo structure
   - The build settings are configured in `vercel.json`

3. **Set environment variables** in Vercel dashboard:
   ```
   DATABASE_URL=your_neon_database_url
   AUTH_SECRET=your_auth_secret
   CRYPTO_API_KEY=your_crypto_api_key (if needed)
   ```

4. **Deploy**:
   - Click "Deploy"
   - Your app will be live at `https://your-project.vercel.app`

**Note**: Since this uses React Router v7 with server-side rendering, make sure your Vercel project is configured to handle Node.js runtime.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
