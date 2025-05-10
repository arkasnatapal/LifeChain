import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the emergency types
export type EmergencyType = 
  | 'medical' 
  | 'fire' 
  | 'police' 
  | 'natural_disaster'
  | 'accident'
  | 'unknown';

// Define the interface for the context
interface EmergencyContextType {
  emergencyActive: boolean;
  emergencyType: EmergencyType | null;
  description: string;
  lastUpdated: Date | null;
  startEmergency: (type: EmergencyType, description: string) => void;
  updateEmergency: (type: EmergencyType, description: string) => void;
  endEmergency: () => void;
}

// Create the context with a default value
const EmergencyContext = createContext<EmergencyContextType>({
  emergencyActive: false,
  emergencyType: null,
  description: '',
  lastUpdated: null,
  startEmergency: () => {},
  updateEmergency: () => {},
  endEmergency: () => {},
});

// Custom hook to use the emergency context
export const useEmergency = () => useContext(EmergencyContext);

// Provider component
export const EmergencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [emergencyActive, setEmergencyActive] = useState(false);
  const [emergencyType, setEmergencyType] = useState<EmergencyType | null>(null);
  const [description, setDescription] = useState('');
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const startEmergency = (type: EmergencyType, desc: string) => {
    setEmergencyActive(true);
    setEmergencyType(type);
    setDescription(desc);
    setLastUpdated(new Date());
    
    // Play audio alert or notification
    // This would be implemented in a real app
  };

  const updateEmergency = (type: EmergencyType, desc: string) => {
    setEmergencyType(type);
    setDescription(desc);
    setLastUpdated(new Date());
  };

  const endEmergency = () => {
    setEmergencyActive(false);
    setEmergencyType(null);
    setDescription('');
    // We keep the lastUpdated for history
  };

  return (
    <EmergencyContext.Provider
      value={{
        emergencyActive,
        emergencyType,
        description,
        lastUpdated,
        startEmergency,
        updateEmergency,
        endEmergency,
      }}
    >
      {children}
    </EmergencyContext.Provider>
  );
};