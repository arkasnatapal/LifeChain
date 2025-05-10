import React, { useState } from 'react';
import { useEmergency, type EmergencyType } from '../context/EmergencyContext';
import { useLocation } from '../context/LocationContext';
import EmergencyContactCard from '../components/emergency/EmergencyContactCard';
import { Mic, StopCircle, Send, MapPin, PhoneCall, AlertTriangle } from 'lucide-react';

const Emergency: React.FC = () => {
  const { emergencyActive, emergencyType, startEmergency, endEmergency } = useEmergency();
  const { coordinates, locationPermission, requestLocation } = useLocation();
  const [isListening, setIsListening] = useState(false);
  const [inputText, setInputText] = useState('');
  const [selectedType, setSelectedType] = useState<EmergencyType | null>(emergencyType);

  // Simulate emergency services data
  const emergencyServices = [
    {
      name: 'City General Hospital',
      type: 'medical' as const,
      phoneNumber: '911',
      distance: '3.2 miles',
      estimatedTime: '8 mins',
      isOfficial: true,
    },
    {
      name: 'Downtown Fire Station',
      type: 'fire' as const,
      phoneNumber: '911',
      distance: '4.5 miles',
      estimatedTime: '11 mins',
      isOfficial: true,
    },
    {
      name: 'Police Station',
      type: 'police' as const,
      phoneNumber: '911',
      distance: '2.8 miles',
      estimatedTime: '7 mins',
      isOfficial: true,
    },
    {
      name: 'Dr. Sarah Wilson (Volunteer)',
      type: 'community' as const,
      phoneNumber: '555-123-4567',
      distance: '0.8 miles',
      estimatedTime: '3 mins',
      isOfficial: false,
    }
  ];

  const handleVoiceToggle = () => {
    setIsListening(!isListening);
    // In a real app, this would trigger voice recording and processing
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      // In a real app, this would process the text input with AI
      // For demo, just start an emergency
      if (!emergencyActive && selectedType) {
        startEmergency(selectedType, inputText);
      }
      setInputText('');
    }
  };

  const handleEmergencyTypeSelect = (type: EmergencyType) => {
    setSelectedType(type);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-3xl mx-auto">
        <div className={`bg-white rounded-lg shadow-lg p-6 mb-6 ${emergencyActive ? 'border-2 border-red-500' : ''}`}>
          <h1 className="text-2xl font-bold text-slate-800 mb-4 flex items-center">
            <AlertTriangle className={`h-6 w-6 mr-2 ${emergencyActive ? 'text-red-600' : 'text-orange-500'}`} />
            {emergencyActive ? 'Emergency Active' : 'Start Emergency Assistance'}
          </h1>
          
          {!locationPermission && (
            <div className="bg-orange-50 border border-orange-200 rounded-md p-4 mb-6">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-orange-500 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <p className="text-orange-800 font-medium">Location services are disabled</p>
                  <p className="text-orange-700 text-sm mt-1">
                    Enable location to help emergency services find you quickly.
                  </p>
                  <button
                    onClick={requestLocation}
                    className="mt-3 bg-orange-100 hover:bg-orange-200 text-orange-800 px-4 py-1.5 rounded-md text-sm font-medium transition-colors"
                  >
                    Enable Location
                  </button>
                </div>
              </div>
            </div>
          )}

          {!emergencyActive ? (
            <div>
              <div className="mb-6">
                <h2 className="text-lg font-medium text-slate-700 mb-3">Select emergency type:</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <button
                    onClick={() => handleEmergencyTypeSelect('medical')}
                    className={`p-3 rounded-lg flex flex-col items-center justify-center border ${
                      selectedType === 'medical' ? 'bg-red-100 border-red-400' : 'bg-white border-slate-200 hover:bg-red-50'
                    }`}
                  >
                    <span className="text-2xl mb-1">🚑</span>
                    <span className={`text-sm font-medium ${selectedType === 'medical' ? 'text-red-800' : 'text-slate-700'}`}>
                      Medical
                    </span>
                  </button>
                  
                  <button
                    onClick={() => handleEmergencyTypeSelect('fire')}
                    className={`p-3 rounded-lg flex flex-col items-center justify-center border ${
                      selectedType === 'fire' ? 'bg-orange-100 border-orange-400' : 'bg-white border-slate-200 hover:bg-orange-50'
                    }`}
                  >
                    <span className="text-2xl mb-1">🚒</span>
                    <span className={`text-sm font-medium ${selectedType === 'fire' ? 'text-orange-800' : 'text-slate-700'}`}>
                      Fire
                    </span>
                  </button>
                  
                  <button
                    onClick={() => handleEmergencyTypeSelect('police')}
                    className={`p-3 rounded-lg flex flex-col items-center justify-center border ${
                      selectedType === 'police' ? 'bg-blue-100 border-blue-400' : 'bg-white border-slate-200 hover:bg-blue-50'
                    }`}
                  >
                    <span className="text-2xl mb-1">🚓</span>
                    <span className={`text-sm font-medium ${selectedType === 'police' ? 'text-blue-800' : 'text-slate-700'}`}>
                      Police
                    </span>
                  </button>
                  
                  <button
                    onClick={() => handleEmergencyTypeSelect('natural_disaster')}
                    className={`p-3 rounded-lg flex flex-col items-center justify-center border ${
                      selectedType === 'natural_disaster' ? 'bg-amber-100 border-amber-400' : 'bg-white border-slate-200 hover:bg-amber-50'
                    }`}
                  >
                    <span className="text-2xl mb-1">🌪️</span>
                    <span className={`text-sm font-medium ${selectedType === 'natural_disaster' ? 'text-amber-800' : 'text-slate-700'}`}>
                      Disaster
                    </span>
                  </button>
                </div>
              </div>
              
              <div className="mb-6">
                <h2 className="text-lg font-medium text-slate-700 mb-2">Describe your emergency:</h2>
                <p className="text-sm text-slate-500 mb-4">
                  Use your voice or text to tell us what's happening. Our AI will analyze your situation.
                </p>
                
                <form onSubmit={handleTextSubmit} className="flex space-x-2 mb-3">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Describe what's happening..."
                    className="flex-grow p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg"
                    disabled={!inputText.trim()}
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </form>
                
                <div className="flex justify-center">
                  <button
                    onClick={handleVoiceToggle}
                    className={`${
                      isListening
                        ? 'bg-red-100 text-red-700 border-red-300'
                        : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                    } flex items-center px-4 py-2 rounded-full border transition-colors`}
                  >
                    {isListening ? (
                      <>
                        <StopCircle className="h-5 w-5 mr-2" />
                        Stop Recording
                      </>
                    ) : (
                      <>
                        <Mic className="h-5 w-5 mr-2" />
                        Speak Now
                      </>
                    )}
                  </button>
                </div>
              </div>
              
              <div className="mt-8">
                <button
                  onClick={() => selectedType && startEmergency(selectedType, 'Emergency started by user')}
                  disabled={!selectedType}
                  className={`w-full py-3 rounded-lg font-medium ${
                    selectedType
                      ? 'bg-red-600 hover:bg-red-700 text-white'
                      : 'bg-slate-200 text-slate-500 cursor-not-allowed'
                  } transition-colors`}
                >
                  Start Emergency Assistance
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 animate-pulse">
                <p className="text-red-800 font-medium text-center">
                  Emergency services have been notified
                </p>
              </div>
              
              <h2 className="text-lg font-medium text-slate-700 mb-3">
                Nearby Emergency Services:
              </h2>
              
              <div className="mb-6">
                {emergencyServices.map((service, index) => (
                  <EmergencyContactCard 
                    key={index}
                    name={service.name}
                    type={service.type}
                    phoneNumber={service.phoneNumber}
                    distance={service.distance}
                    estimatedTime={service.estimatedTime}
                    isOfficial={service.isOfficial}
                  />
                ))}
              </div>
              
              <div className="flex flex-col space-y-3">
                <a
                  href="tel:911"
                  className="bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center"
                >
                  <PhoneCall className="h-5 w-5 mr-2" />
                  Call Emergency Services (911)
                </a>
                
                <button
                  onClick={endEmergency}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 px-4 rounded-lg font-medium"
                >
                  End Emergency
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Emergency;