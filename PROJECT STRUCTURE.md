powerline-app/
├── server.js                 # Express server entry point
├── config/
│   └── db.js                 # MongoDB connection
├── models/
│   ├── User.js               # User model
│   ├── PreEnrollee.js        # Pre-enrollee model
│   └── Promoter.js           # Promoter model
├── routes/
│   ├── auth.js               # Authentication routes
│   ├── preEnrollees.js       # Pre-enrollee management
│   └── promoters.js          # Promoter management
├── middleware/
│   └── auth.js               # JWT authentication middleware
├── client/                   # React frontend
│   ├── public/
│   └── src/
│       ├── components/       # Reusable UI components
│       ├── pages/            # Page components
│       ├── context/          # React context for state management
│       ├── utils/            # Utility functions
│       ├── App.js            # Main React component
│       └── index.js          # React entry point
└── package.json              # Project dependencies
