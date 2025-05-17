client/
├── src/
│   ├── App.jsx                      # Main application component
│   ├── components/                  # Reusable UI components
│   │   ├── layout/                  # Layout components
│   │   │   ├── Alert.jsx            # Toast notifications
│   │   │   ├── Footer.jsx           # Site footer
│   │   │   ├── Navbar.js            # Navigation bar
│   │   ├── powerline/               # PowerLine specific components
│   │   │   ├── PowerLinePreview.jsx # PowerLine visualization
│   │   ├── routing/                 # Routing components
│   │   │   ├── PrivateRoute.js      # Protected route wrapper
│   │   ├── ui/                      # Generic UI components
│   │   │   ├── BenefitCard.jsx      # Card for benefits display
│   │   │   ├── CountdownTimer.jsx   # Timer component
│   │   │   ├── VideoEmbed.jsx       # YouTube video embed
│   ├── context/                     # React context
│   │   ├── auth/                    # Authentication context
│   │   │   ├── AuthContext.jsx      # Authentication provider
│   │   │   ├── authReducer.jsx      # Authentication state reducer
│   ├── pages/                       # Page components
│   │   ├── LandingPage.jsx          # Home page
│   │   ├── Login.jsx                # Login page
│   │   ├── PreEnrolleeDashboard.jsx # Dashboard for pre-enrollees
│   │   ├── PreEnrollmentForm.jsx    # Pre-enrollment form
│   │   ├── Register.jsx             # Registration page
│   │   ├── WelcomePage.jsx          # Post-enrollment welcome
│   │   ├── admin/                   # Admin pages
│   ├── utils/                       # Utility functions
│   │   ├── setAuthToken.js          # Auth token utility
server/
├── config/                     # Configuration
│   ├── db.js                   # MongoDB connection
├── middleware/                 # Custom middleware
│   ├── auth.js                 # JWT authentication
├── models/                     # Mongoose models
│   ├── PreEnrollee.js          # Pre-enrollee schema
│   ├── Promoter.js             # Promoter schema
│   ├── User.js                 # User authentication schema
├── routes/                     # API routes
│   ├── preEnrollees.js         # Pre-enrollee management