import React from 'react';
import EmergencyButton from '../components/emergency/EmergencyButton';
import { useLocation } from '../context/LocationContext';
import { MapPin, AlertCircle, Loader2 } from 'lucide-react';

const Home: React.FC = () => {
  const { coordinates, locationPermission, loading, error, requestLocation } = useLocation();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            AI-Powered Emergency Assistance
          </h1>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            LifeChain connects you to emergency services, provides first aid guidance, and 
            alerts nearby volunteers in rural and underserved areas.
          </p>
          
          {/* Emergency Button */}
          <div className="mt-8 mb-12">
            <EmergencyButton size="lg" />
          </div>

          {/* Location Status */}
          <div className="bg-white rounded-lg shadow-sm p-4 mt-8 max-w-md mx-auto">
            <h3 className="text-lg font-medium text-slate-700 mb-2">Your Location Status</h3>
            
            {loading ? (
              <div className="flex items-center justify-center py-2">
                <Loader2 className="h-5 w-5 text-blue-500 animate-spin mr-2" />
                <span>Getting your location...</span>
              </div>
            ) : locationPermission && coordinates.latitude ? (
              <div className="flex items-center justify-center py-2 text-green-600">
                <MapPin className="h-5 w-5 mr-2" />
                <span>Location services active</span>
              </div>
            ) : (
              <div>
                {error && (
                  <div className="flex items-center text-red-600 mb-3">
                    <AlertCircle className="h-5 w-5 mr-2" />
                    <span>{error}</span>
                  </div>
                )}
                <button
                  onClick={requestLocation}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  Enable Location Services
                </button>
                <p className="mt-2 text-xs text-slate-500">
                  Your location is only used to find nearby emergency services and is never stored permanently.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Features */}
        <section className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-sm p-6 border-t-4 border-red-500">
            <div className="text-2xl mb-3">🚨</div>
            <h2 className="text-xl font-semibold text-slate-800 mb-2">Emergency Detection</h2>
            <p className="text-slate-600">
              Quickly classifies your emergency situation using AI to connect you with the right help.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 border-t-4 border-blue-500">
            <div className="text-2xl mb-3">🩹</div>
            <h2 className="text-xl font-semibold text-slate-800 mb-2">First Aid Guidance</h2>
            <p className="text-slate-600">
              Step-by-step instructions for common emergencies even when offline.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 border-t-4 border-green-500">
            <div className="text-2xl mb-3">👥</div>
            <h2 className="text-xl font-semibold text-slate-800 mb-2">Community SOS</h2>
            <p className="text-slate-600">
              Alerts nearby community volunteers when official services are delayed.
            </p>
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-blue-50 rounded-xl p-6 mb-12">
          <h2 className="text-2xl font-bold text-center text-slate-800 mb-6">
            How LifeChain Works
          </h2>
          
          <div className="space-y-8">
            <div className="flex items-start">
              <div className="bg-blue-100 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-blue-800 font-bold">1</span>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-slate-800">Activate Emergency</h3>
                <p className="text-slate-600 mt-1">
                  Press the emergency button or use voice/text to describe your situation.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-blue-100 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-blue-800 font-bold">2</span>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-slate-800">AI Assessment</h3>
                <p className="text-slate-600 mt-1">
                  Our AI quickly categorizes your emergency and identifies the appropriate response.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-blue-100 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-blue-800 font-bold">3</span>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-slate-800">Connect & Guide</h3>
                <p className="text-slate-600 mt-1">
                  We connect you to emergency services and provide first aid instructions while help is on the way.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-blue-100 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-blue-800 font-bold">4</span>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-slate-800">Community Activation</h3>
                <p className="text-slate-600 mt-1">
                  If professional help is delayed, we alert nearby community volunteers who can assist.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;