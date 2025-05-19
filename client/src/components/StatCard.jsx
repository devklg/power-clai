import React from 'react';
import PropTypes from 'prop-types';

/**
 * StatsCard - A reusable component for displaying statistics in a card format
 * 
 * @param {string} title - The title of the statistic
 * @param {string} value - The value to display
 * @param {string} subtitle - Additional context for the statistic (optional)
 * @param {string} icon - FontAwesome icon class (optional)
 * @param {string} color - Color theme ('blue', 'green', 'yellow', 'purple', 'red')
 * @param {string} className - Additional classes to apply (optional)
 */
const StatsCard = ({ title, value, subtitle, icon, color = 'blue', className = '' }) => {
  const getBorderColor = () => {
    switch (color) {
      case 'blue': return 'border-blue-500';
      case 'green': return 'border-green-500';
      case 'yellow': return 'border-yellow-500';
      case 'purple': return 'border-purple-500';
      case 'red': return 'border-red-500';
      default: return 'border-blue-500';
    }
  };
  
  const getIconColor = () => {
    switch (color) {
      case 'blue': return 'text-blue-500';
      case 'green': return 'text-green-500';
      case 'yellow': return 'text-yellow-500';
      case 'purple': return 'text-purple-500';
      case 'red': return 'text-red-500';
      default: return 'text-blue-500';
    }
  };
  
  return (
    <div className={`bg-gray-800 rounded-lg p-5 shadow-lg border-l-4 ${getBorderColor()} ${className}`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-gray-400 text-sm font-medium mb-1">{title}</h3>
          <p className="text-2xl font-bold text-white">{value}</p>
          {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
        </div>
        {icon && (
          <div className={`text-xl ${getIconColor()}`}>
            <i className={icon}></i>
          </div>
        )}
      </div>
    </div>
  );
};

StatsCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  icon: PropTypes.string,
  color: PropTypes.oneOf(['blue', 'green', 'yellow', 'purple', 'red']),
  className: PropTypes.string
};

export default StatsCard;
