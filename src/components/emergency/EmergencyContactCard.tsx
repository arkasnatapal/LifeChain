import React from 'react';
import { Phone, Navigation, Clock, Users } from 'lucide-react';

interface EmergencyContactProps {
  name: string;
  type: 'medical' | 'fire' | 'police' | 'community';
  phoneNumber: string;
  distance?: string;
  estimatedTime?: string;
  isOfficial?: boolean;
}

const EmergencyContactCard: React.FC<EmergencyContactProps> = ({
  name,
  type,
  phoneNumber,
  distance,
  estimatedTime,
  isOfficial = true,
}) => {
  const getTypeStyles = () => {
    switch (type) {
      case 'medical':
        return {
          bg: 'bg-red-100',
          border: 'border-red-400',
          text: 'text-red-800',
          icon: <span className="text-xl">🚑</span>,
        };
      case 'fire':
        return {
          bg: 'bg-orange-100',
          border: 'border-orange-400',
          text: 'text-orange-800',
          icon: <span className="text-xl">🚒</span>,
        };
      case 'police':
        return {
          bg: 'bg-blue-100',
          border: 'border-blue-400',
          text: 'text-blue-800',
          icon: <span className="text-xl">🚓</span>,
        };
      case 'community':
        return {
          bg: 'bg-green-100',
          border: 'border-green-400',
          text: 'text-green-800',
          icon: <Users className="h-5 w-5 text-green-700" />,
        };
      default:
        return {
          bg: 'bg-slate-100',
          border: 'border-slate-400',
          text: 'text-slate-800',
          icon: <span className="text-xl">🆘</span>,
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <div className={`${styles.bg} border ${styles.border} rounded-lg shadow-sm p-4 mb-3`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="mr-3 flex-shrink-0">{styles.icon}</div>
          <div>
            <h3 className={`font-semibold ${styles.text}`}>{name}</h3>
            <div className="flex items-center text-sm text-slate-600 mt-1">
              {distance && (
                <div className="flex items-center mr-3">
                  <Navigation className="h-3 w-3 mr-1" />
                  <span>{distance}</span>
                </div>
              )}
              {estimatedTime && (
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{estimatedTime}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <a
          href={`tel:${phoneNumber}`}
          className="bg-white hover:bg-slate-50 text-slate-800 p-2 rounded-full border border-slate-300 transition-colors"
          aria-label={`Call ${name}`}
        >
          <Phone className="h-5 w-5" />
        </a>
      </div>
      
      {!isOfficial && (
        <div className="mt-2 text-xs text-slate-600 bg-white bg-opacity-60 rounded px-2 py-1 inline-block">
          Community Volunteer
        </div>
      )}
    </div>
  );
};

export default EmergencyContactCard;