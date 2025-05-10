import React, { useState } from 'react';
import { Phone, AlertTriangle, Mic, MessageSquare } from 'lucide-react';
import { useEmergency } from '../../context/EmergencyContext';
import { useNavigate } from 'react-router-dom';

interface EmergencyButtonProps {
  size?: 'sm' | 'md' | 'lg';
  pulseEffect?: boolean;
}

const EmergencyButton: React.FC<EmergencyButtonProps> = ({ 
  size = 'lg',
  pulseEffect = true 
}) => {
  const { emergencyActive, startEmergency } = useEmergency();
  const [isPressed, setIsPressed] = useState(false);
  const navigate = useNavigate();

  const handleEmergencyPress = () => {
    if (!emergencyActive) {
      setIsPressed(true);
      setTimeout(() => {
        startEmergency('unknown', 'Emergency initiated by user');
        navigate('/emergency');
        setIsPressed(false);
      }, 2000); // Need to hold for 2 seconds
    }
  };

  const handleEmergencyRelease = () => {
    if (!emergencyActive) {
      setIsPressed(false);
    }
  };

  const sizeClasses = {
    sm: 'h-16 w-16 text-sm',
    md: 'h-24 w-24 text-base',
    lg: 'h-32 w-32 text-lg'
  };

  const iconSizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-10 w-10'
  };

  return (
    <div className="flex flex-col items-center">
      <button
        className={`${sizeClasses[size]} rounded-full bg-red-600 text-white font-bold flex flex-col items-center justify-center 
        ${isPressed ? 'scale-95 bg-red-700' : 'scale-100'} 
        ${pulseEffect && !isPressed && !emergencyActive ? 'animate-pulse' : ''}
        ${emergencyActive ? 'bg-red-700' : ''}
        shadow-lg transition-all duration-300 focus:outline-none`}
        onTouchStart={handleEmergencyPress}
        onTouchEnd={handleEmergencyRelease}
        onMouseDown={handleEmergencyPress}
        onMouseUp={handleEmergencyRelease}
        onMouseLeave={handleEmergencyRelease}
        disabled={emergencyActive}
      >
        <AlertTriangle className={`${iconSizeClasses[size]} mb-1`} />
        {isPressed ? 'Hold...' : 'Emergency'}
      </button>
      
      {!emergencyActive && (
        <div className="mt-4 text-slate-600 text-sm text-center">
          Press and hold for emergency
        </div>
      )}
      
      {/* Quick action buttons */}
      {!emergencyActive && (
        <div className="mt-6 flex space-x-4">
          <button 
            onClick={() => navigate('/emergency')}
            className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-md transition-colors"
            aria-label="Call emergency services"
          >
            <Phone className="h-6 w-6" />
          </button>
          <button 
            onClick={() => navigate('/emergency')}
            className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full shadow-md transition-colors"
            aria-label="Voice input"
          >
            <Mic className="h-6 w-6" />
          </button>
          <button 
            onClick={() => navigate('/emergency')}
            className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-md transition-colors"
            aria-label="Text input"
          >
            <MessageSquare className="h-6 w-6" />
          </button>
        </div>
      )}
    </div>
  );
};

export default EmergencyButton;