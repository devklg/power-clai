import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/auth/AuthContext';

const PreEnrollmentForm = () => {
  const { preEnroll } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    preferredPackage: 'undecided',
    enrollerIdNumber: '1001', // Fixed to Kevin Gardner's ID
    terms: false
  });
  
  // Error state
  const [errors, setErrors] = useState({});
  
  // Loading state
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Destructure form data
  const { firstName, lastName, email, phone, country, preferredPackage, terms } = formData;
  
  // Handle form input changes
  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };
  
  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    // Required fields
    if (!firstName.trim()) newErrors.firstName = 'First name is required';
    if (!lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    if (!phone.trim()) newErrors.phone = 'Phone number is required';
    if (!country) newErrors.country = 'Country is required';
    if (!terms) newErrors.terms = 'You must agree to the terms';
    
    // Email validation
    if (email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      newErrors.email = 'Invalid email address';
    }
    
    // Phone validation (simple check for now)
    if (phone && phone.length < 10) {
      newErrors.phone = 'Invalid phone number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) return;
    
    // Set loading state
    setIsSubmitting(true);
    
    try {
      // Call preEnroll from AuthContext
      const response = await preEnroll(formData);
      
      // Navigate to welcome page with position number
      navigate('/welcome', { 
        state: { 
          positionNumber: response.positionNumber,
          firstName,
          email 
        } 
      });
    } catch (err) {
      // Handle API errors
      if (err.response && err.response.data) {
        const responseErrors = err.response.data.errors;
        
        if (Array.isArray(responseErrors)) {
          // Map errors from API to form fields
          const fieldErrors = {};
          responseErrors.forEach(error => {
            fieldErrors[error.param] = error.msg;
          });
          setErrors(fieldErrors);
        } else {
          // Generic error message
          setErrors({ form: err.response.data.msg || 'Pre-enrollment failed' });
        }
      } else {
        setErrors({ form: 'An unexpected error occurred. Please try again.' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <section className="py-16 bg-dark-900 min-h-screen">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto bg-dark-800 rounded-lg shadow-2xl overflow-hidden">
          <div className="p-8 md:p-12">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-4">Pre-Enroll Now - No Cost, No Obligation</h2>
              <p className="text-gray-300">
                Secure your position in our PowerLine. You'll have 7 days to decide if you want to join officially.
              </p>
            </div>
            
            {/* Generic form error */}
            {errors.form && (
              <div className="bg-red-900 bg-opacity-25 border border-red-500 text-red-300 px-4 py-3 rounded mb-4">
                {errors.form}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-gray-300 mb-2">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    id="firstName" 
                    name="firstName" 
                    value={firstName}
                    onChange={handleChange}
                    className={`w-full p-3 bg-dark-700 border ${errors.firstName ? 'border-red-500' : 'border-gray-600'} rounded-lg focus:outline-none focus:border-primary-500`}
                  />
                  {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-gray-300 mb-2">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    id="lastName" 
                    name="lastName" 
                    value={lastName}
                    onChange={handleChange}
                    className={`w-full p-3 bg-dark-700 border ${errors.lastName ? 'border-red-500' : 'border-gray-600'} rounded-lg focus:outline-none focus:border-primary-500`}
                  />
                  {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-gray-300 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={email}
                  onChange={handleChange}
                  className={`w-full p-3 bg-dark-700 border ${errors.email ? 'border-red-500' : 'border-gray-600'} rounded-lg focus:outline-none focus:border-primary-500`}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-gray-300 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  value={phone}
                  onChange={handleChange}
                  className={`w-full p-3 bg-dark-700 border ${errors.phone ? 'border-red-500' : 'border-gray-600'} rounded-lg focus:outline-none focus:border-primary-500`}
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>
              
              <div>
                <label htmlFor="country" className="block text-gray-300 mb-2">
                  Country <span className="text-red-500">*</span>
                </label>
                <select 
                  id="country" 
                  name="country" 
                  value={country}
                  onChange={handleChange}
                  className={`w-full p-3 bg-dark-700 border ${errors.country ? 'border-red-500' : 'border-gray-600'} rounded-lg focus:outline-none focus:border-primary-500`}
                >
                  <option value="">Select Country</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="MX">Mexico</option>
                  <option value="GB">United Kingdom</option>
                  <option value="AU">Australia</option>
                  <option value="other">Other</option>
                </select>
                {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
              </div>
              
              <div>
                <label htmlFor="preferredPackage" className="block text-gray-300 mb-2">
                  Preferred Package (You can change later)
                </label>
                <select 
                  id="preferredPackage" 
                  name="preferredPackage" 
                  value={preferredPackage}
                  onChange={handleChange}
                  className="w-full p-3 bg-dark-700 border border-gray-600 rounded-lg focus:outline-none focus:border-primary-500"
                >
                  <option value="undecided">Not Sure Yet</option>
                  <option value="starter">Starter Package ($175)</option>
                  <option value="elite">Elite Package ($350)</option>
                  <option value="pro">Pro Package ($700)</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="enroller" className="block text-gray-300 mb-2">Enroller</label>
                <input 
                  type="text" 
                  id="enroller" 
                  name="enroller" 
                  value="Kevin Gardner - ID: 1001" 
                  disabled 
                  className="w-full p-3 bg-dark-700 border border-gray-600 rounded-lg text-gray-400"
                />
              </div>
              
              <div className="flex items-start">
                <input 
                  type="checkbox" 
                  id="terms" 
                  name="terms" 
                  checked={terms}
                  onChange={handleChange}
                  className={`mt-1 mr-3 h-4 w-4 ${errors.terms ? 'border-red-500' : ''}`}
                />
                <label htmlFor="terms" className="text-gray-300">
                  I understand this is a pre-enrollment with no cost or obligation. I'll have 7 days to decide.
                  {errors.terms && <span className="block text-red-500 text-sm mt-1">{errors.terms}</span>}
                </label>
              </div>
              
              <div className="text-center mt-8">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={`bg-gradient-to-r from-secondary-500 to-secondary-700 text-white font-bold py-3 px-8 rounded-lg text-lg ${isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:from-secondary-400 hover:to-secondary-600 transform hover:-translate-y-1'} transition duration-300`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : 'Secure My Position'}
                </button>
                <Link 
                  to="/" 
                  className="ml-4 text-gray-400 hover:text-white transition"
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PreEnrollmentForm;
