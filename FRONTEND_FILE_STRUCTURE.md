src/
├── components/
│   ├── common/           # Shared components
│   │   ├── AlertBanner.
│   │   ├── CountdownTimer.jsx
│   │   ├── TabNavigation.jsx
│   │   ├── StatsCard.jsx
│   │   └── LoadingSpinner.jsx
│   │
│   ├── dashboard/        # Dashboard-specific components
│   │   ├── ActivityFeed.jsx
│   │   ├── ReferralLinkButton.jsx
│   │   └── DashboardHeader.jsx
│   │
│   ├── powerline/        # PowerLine visualization components
│   │   ├── PowerLineVisualization.jsx
│   │   └── PowerLineStats.jsx
│   │
│   ├── team/             # Team visualization components
│   │   ├── BinaryTeamVisualization.jsx
│   │   ├── TeamMemberCard.jsx
│   │   └── TeamBalanceIndicator.jsx
│   │
│   ├── commissions/      # Commission-related components
│   │   ├── CommissionCard.jsx
│   │   ├── CommissionBreakdownChart.jsx
│   │   ├── CommissionTrendChart.jsx
│   │   └── CommissionHistory.jsx
│   │
│   ├── resources/        # Resource-related components
│   │   ├── ResourceCard.jsx
│   │   ├── EventCard.jsx
│   │   └── TrainingVideoCard.jsx
│   │
│   └── settings/         # Settings-related components
│       ├── ProfileSettings.jsx
│       ├── NotificationSettings.jsx
│       └── BinaryPreferences.jsx
│
├── pages/                # Main page components
│   ├── LoginPage.jsx
│   ├── RegisterPage.jsx
│   ├── PreEnrolleeDashboard.jsx
│   ├── PromoterDashboard.jsx
│   ├── PackageSelection.jsx
│   └── AdminDashboard.jsx
│
└── context/              # Context providers
    ├── AuthContext.jsx
    ├── PowerLineContext.jsx
    └── CommissionContext.jsx
