# ShelfLife Client

![React](https://img.shields.io/badge/React-19.2.7-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0.2-blue?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-8.1.1-purple?logo=vite)
![Redux](https://img.shields.io/badge/Redux-9.3.0-purple?logo=redux)
![MUI](https://img.shields.io/badge/MUI-9.3.1-blue?logo=mui)

A modern React application for ShelfLife - a food inventory management system that helps users track items, reduce waste, and save money.

## 🚀 Tech Stack

- **Framework**: React 19.2.7 with TypeScript 6.0.2
- **Build Tool**: Vite 8.1.1
- **State Management**: Redux Toolkit 2.12.0 with Redux Persist 6.0.0
- **UI Components**: Material-UI 9.3.1, Ant Design 6.5.2
- **Styling**: Tailwind CSS 4.3.2
- **Routing**: React Router DOM 7.18.1
- **Forms**: React Hook Form 7.82.0
- **Charts**: Recharts 3.10.1
- **Animations**: Motion 12.42.2 (Framer Motion)
- **Barcode Scanning**: html5-qrcode 2.3.8, react-qr-barcode-scanner 2.1.25
- **Notifications**: React Toastify 11.1.0
- **Icons**: React Icons 5.7.0
- **Slider**: Swiper 14.0.6
- **Optimization**: React Compiler, React.memo, useCallback, useMemo
- **Code Splitting**: React.lazy with Suspense

## 📋 Prerequisites

- Node.js 24.14.1 or higher
- npm or yarn package manager
- Backend API server running (see server README)

## 🧪 Demo/Test Account

For testing purposes, you can use the following sample credentials:

**Sample User Login:**
- Email: `sarah.johnson@example.com`
- Password: `password123`

**Demo Household:**
- Invite Code: `XKPJMJ`
- Use this code to join the demo household and view sample data

These credentials are intended for managers, technical personnel, or anyone who needs to explore the application's features without creating a new account.

## 🔧 Installation

```bash
# Install dependencies
npm install

# Set up environment variables
# Create .env file with API endpoint configuration
```

## 🏃 Running the Application

```bash
# Development mode
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

The application runs on port 5173 by default (configurable via Vite config).

## 🎨 Features

### Core Functionality
- **Authentication**: Login, signup with OTP verification
- **Household Management**: Create/join households, manage members
- **Inventory Management**: Add, edit, delete items with barcode scanning
- **Dashboard**: Real-time statistics, expiring items alerts
- **Leaderboard**: Track household member contributions
- **Settings**: Profile management, household settings

### Advanced Features
- **Barcode Scanning**: Camera-based and manual barcode entry with Open Food Facts API integration
- **Real-time Notifications**: Toast notifications for important events
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Performance Optimizations**: Code splitting, memoization, lazy loading
- **Image Upload**: Profile picture management with Cloudinary
- **Data Visualization**: Interactive charts for inventory analytics

## 📁 Project Structure

```
src/
├── components/
│   ├── common/          # Reusable UI components
│   ├── cores/           # Core feature components
│   │   ├── Dashboard/   # Dashboard components
│   │   └── Table/       # Table components
│   └── dialogs/         # Modal/dialog components
├── contexts/            # React contexts
├── hooks/               # Custom React hooks
├── layouts/             # Layout components
├── lib/                 # Utilities and configurations
│   ├── actions/         # Redux actions
│   ├── features/        # Redux slices
│   └── store/           # Redux store configuration
├── pages/               # Page components
├── types/               # TypeScript type definitions
├── App.tsx              # Root component
└── main.tsx             # Application entry point
```

## 🔐 Authentication

The application uses JWT tokens for authentication. Tokens are stored in Redux persist and automatically included in API requests.

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🎯 Performance Optimizations

- **Code Splitting**: React.lazy for route-based code splitting
- **Memoization**: React.memo, useCallback, useMemo for component optimization
- **Image Optimization**: Lazy loading for images
- **Bundle Analysis**: Optimized chunk splitting for faster initial load

## 🧪 Testing

Test cases should be added for:
- Component rendering
- User interactions
- Redux state management
- API integration
- Responsive behavior

## 📝 Environment Variables

Required environment variables:
- `VITE_API_URL`: Backend API endpoint

## 🔄 State Management

The application uses Redux Toolkit for state management with the following slices:
- `auth`: User authentication and household data
- `items`: Inventory items management
- `dashboard`: Dashboard statistics
- `leaderboard`: Leaderboard rankings
- `members`: Household members
- `sidebar`: Sidebar state

## 🎨 UI Components

### Material-UI Components
- Dialogs, buttons, tables, forms
- Responsive grid system
- Theme customization

### Custom Components
- CTAButton, NavButton, Loader
- Toast notifications
- Barcode scanner
- Leaderboard podium
- Data visualization charts

## 📊 Data Visualization

The application uses Recharts for:
- Pie charts (used vs wasted items)
- Bar charts (category distribution)
- Leaderboard visualizations

## 🔔 Notifications

React Toastify is used for:
- Success messages
- Error alerts
- Information notifications
- Warning messages

## 🖼️ Image Handling

Profile images are handled through:
- Cloudinary integration
- Lazy loading optimization
- Responsive image sizing
- Upload and delete functionality

## 📱 Barcode Integration

The application supports:
- Camera-based barcode scanning
- Manual barcode entry
- Open Food Facts API integration
- Product data auto-population

## 🚦 Deployment

The application can be deployed to:
- Vercel
- Netlify
- Any static hosting service

Build the application and deploy the `dist` folder.

## 📄 License

This project is private and proprietary.

## 👥 Contact

For support or questions, contact: shelflife.eco@gmail.com
