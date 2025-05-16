import React from 'react';

const BenefitCard = ({ icon, title, description, color = 'blue' }) => {
  // Color mapping for different icon colors
  const colorMap = {
    blue: 'text-primary-500',
    green: 'text-green-500',
    yellow: 'text-secondary-400',
    purple: 'text-purple-500',
    red: 'text-red-500',
    orange: 'text-orange-500'
  };
  
  // Use the provided color or default to blue
  const iconColor = colorMap[color] || colorMap.blue;
  
  return (
    <div className="bg-dark-900 p-6 rounded-lg transform transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className={`text-3xl ${iconColor} mb-4`}>
        <i className={`fas fa-${icon}`}></i>
      </div>
      <h4 className="text-lg font-bold mb-2">{title}</h4>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

export default BenefitCard;
