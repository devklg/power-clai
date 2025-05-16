# Magnificent Worldwide PowerLine App

A MERN stack application for managing Talk Fusion PowerLine recruitment platform.

## Quick Start Guide

Since you need to get this application up and running quickly for the launch on Tuesday, follow these steps for the fastest deployment:

### 1. Clone Repository & Install Dependencies

```bash
# Create project folder
mkdir powerline-app
cd powerline-app

# Initialize git and create initial files
git init
# Copy all the files provided to you into this folder

# Install server dependencies
npm install

# Install client dependencies
cd client
npm install
cd ..
```

### 2. Set Up Environment Variables

Create a `.env` file in the root folder:

```
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### 3. Run Development Environment

```bash
# Run both frontend and backend
npm run dev

# Run backend only
npm run server

# Run frontend only
npm run client
```

### 4. Quick Deployment Options

#### Option 1: Deploy to Render (Fastest)

1. Create an account on Render.com
2. Create a new Web Service
3. Connect your GitHub repository
4. Set environment variables
5. Deploy!

#### Option 2: Deploy to Heroku

1. Create a Heroku account
2. Install Heroku CLI
3. Run:
```bash
heroku login
heroku create magnificent-powerline
git push heroku main
```

## Project Structure

```
powerline-app/
├── server.js                 # Express server
├── config/                   # Configuration files
├── models/                   # Database models
├── routes/                   # API routes
├── middleware/               # Custom middleware
├── client/                   # React frontend
│   ├── public/
│   └── src/
│       ├── components/       # Reusable components
│       ├── pages/            # Page components
│       ├── context/          # React context
│       └── App.js            # Main React component
└── package.json              # Dependencies and scripts
```

## Core Features

- **Landing Page**: Video presentations, PowerLine explanation, and benefits
- **Pre-Enrollment System**: No-cost registration with 7-day decision window
- **Real-Time PowerLine Visualization**: Watch team growth as it happens
- **Pre-Enrollee Dashboard**: Decision countdown, team growth, resources
- **Package Selection**: Three tiers with clear features and pricing
- **Promoter Dashboard**: Team structure, stats, referral tools
- **Secure Authentication**: JWT-based user authentication
- **Mobile Responsive**: Works on all devices

## Key Technologies

- **Frontend**:
  - React 18
  - Tailwind CSS
  - Context API for state management
  - React Router for navigation

- **Backend**:
  - Node.js & Express
  - MongoDB with Mongoose
  - JWT Authentication
  - Socket.io for real-time updates

## Post-Launch Enhancements

After the initial launch, consider implementing these enhancements:

1. **Real-Time PowerLine Dashboard**:
   - WebSocket integration for live updates
   - Advanced team visualization

2. **Payment Gateway Integration**:
   - Stripe or PayPal for direct payments
   - Automatic package activation

3. **Enhanced Analytics**:
   - Conversion tracking
   - Team performance metrics
   - Growth projections

4. **Mobile App**:
   - React Native version
   - Push notifications

## Support & Maintenance

For any issues or support:
- Email: kevin@magnwm.com
- Phone: Your business phone

## License

MIT License

---

*Created by Magnificent Worldwide Marketing & Sales Group for Talk Fusion PowerLine recruitment.*
