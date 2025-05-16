import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/auth/AuthContext';
import PrivateRoute from './components/routing/PrivateRoute';

// Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Alert from './components/layout/Alert';

// Public Pages
import LandingPage from './pages/LandingPage';
import PreEnrollmentForm from './pages/PreEnrollmentForm';
import WelcomePage from './pages/WelcomePage';
import Login from './pages/Login';
import Register from './pages/Register';

// Protected Pages
import PreEnrolleeDashboard from './pages/PreEnrolleeDashboard';
import PackageSelection from './pages/PackageSelection';
import PaymentInfoForm from './pages/PaymentInfoForm';
import PromoterDashboard from './pages/PromoterDashboard';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-dark-900">
          <Navbar />
          <Alert />
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/pre-enroll" element={<PreEnrollmentForm />} />
              <Route path="/welcome" element={<WelcomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Protected Routes */}
              <Route 
                path="/dashboard" 
                element={
                  <PrivateRoute>
                    <PreEnrolleeDashboard />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/packages" 
                element={
                  <PrivateRoute>
                    <PackageSelection />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/payment" 
                element={
                  <PrivateRoute>
                    <PaymentInfoForm />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/promoter" 
                element={
                  <PrivateRoute>
                    <PromoterDashboard />
                  </PrivateRoute>
                } 
              />
              
              {/* Admin Routes */}
              <Route 
                path="/admin/*" 
                element={
                  <PrivateRoute requireAdmin={true}>
                    <AdminDashboard />
                  </PrivateRoute>
                } 
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
