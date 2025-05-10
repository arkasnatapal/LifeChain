console.log('Settings component rendered');
console.log('Active category:', activeCategory);
console.log('Language:', language);
console.log('Settings:', settings);

// ...

const toggleSetting = (setting: keyof typeof settings) => {
  console.log(`Toggling setting: ${setting}`);
  setSettings((prevSettings) => ({ ...prevSettings, [setting]: !prevSettings[setting] }));
};

// ...

<select
  value={language}
  onChange={(e) => {
    console.log(`Language changed to: ${e.target.value}`);
    setLanguage(e.target.value);
  }}
  className="w-full md:w-64 p-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
>
  // ...
</select>import React, { useState } from 'react';
import { Globe, Volume2, Bell, Shield, User, Moon, ChevronRight, ToggleLeft, ToggleRight, Info } from 'lucide-react';

type SettingCategory = 'general' | 'notifications' | 'privacy' | 'accessibility' | 'about';

const Settings: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<SettingCategory>('general');
  const [language, setLanguage] = useState('en');
  const [settings, setSettings] = useState({
    darkMode: false,
    emergencyAlerts: true,
    communityNotifications: true,
    locationSharing: true,
    soundEffects: true,
    highContrast: false,
    largeText: false,
  });
  
  const toggleSetting = (setting: keyof typeof settings) => {
    setSettings((prevSettings) => ({ ...prevSettings, [setting]: !prevSettings[setting] }));
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">Settings</h1>
        
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          <div className="md:flex">
            {/* Sidebar */}
            <div className="md:w-64 bg-slate-50 border-r border-slate-200">
              <nav className="p-4">
                <ul className="space-y-1">
                  <li>
                    <button
                      onClick={() => setActiveCategory('general')}
                      className={`w-full flex items-center px-3 py-2 rounded-md text-sm ${
                        activeCategory === 'general' 
                          ? 'bg-blue-50 text-blue-700' 
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <Globe className="h-4 w-4 mr-3" />
                      General
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveCategory('notifications')}
                      className={`w-full flex items-center px-3 py-2 rounded-md text-sm ${
                        activeCategory === 'notifications' 
                          ? 'bg-blue-50 text-blue-700' 
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <Bell className="h-4 w-4 mr-3" />
                      Notifications
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveCategory('privacy')}
                      className={`w-full flex items-center px-3 py-2 rounded-md text-sm ${
                        activeCategory === 'privacy' 
                          ? 'bg-blue-50 text-blue-700' 
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <Shield className="h-4 w-4 mr-3" />
                      Privacy
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveCategory('accessibility')}
                      className={`w-full flex items-center px-3 py-2 rounded-md text-sm ${
                        activeCategory === 'accessibility' 
                          ? 'bg-blue-50 text-blue-700' 
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <User className="h-4 w-4 mr-3" />
                      Accessibility
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveCategory('about')}
                      className={`w-full flex items-center px-3 py-2 rounded-md text-sm ${
                        activeCategory === 'about' 
                          ? 'bg-blue-50 text-blue-700' 
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <Info className="h-4 w-4 mr-3" />
                      About
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
            
            {/* Content Area */}
            <div className="flex-1 p-6">
              {activeCategory === 'general' && (
                <div>
                  <h2 className="text-xl font-medium text-slate-800 mb-4">General Settings</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium text-slate-700 mb-3">Language</h3>
                      <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="w-full md:w-64 p-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="en">English</option>
                        <option value="es">Español</option>
                        <option value="fr">Français</option>
                        <option value="hi">हिन्दी</option>
                        <option value="ar">العربية</option>
                      </select>
                    </div>
                    
                    <div>
                      <button
                        onClick={() => toggleSetting('darkMode')}
                        className="flex items-center justify-between w-full p-3 border border-slate-200 rounded-md hover:bg-slate-50"
                      >
                        <div className="flex items-center">
                          <Moon className="h-5 w-5 text-slate-600 mr-3" />
                          <span>Dark Mode</span>
                        </div>
                        {settings.darkMode ? (
                          <ToggleRight className="h-6 w-6 text-blue-600" />
                        ) : (
                          <ToggleLeft className="h-6 w-6 text-slate-400" />
                        )}
                      </button>
                    </div>
                    
                    <div>
                      <button
                        onClick={() => toggleSetting('soundEffects')}
                        className="flex items-center justify-between w-full p-3 border border-slate-200 rounded-md hover:bg-slate-50"
                      >
                        <div className="flex items-center">
                          <Volume2 className="h-5 w-5 text-slate-600 mr-3" />
                          <span>Sound Effects</span>
                        </div>
                        {settings.soundEffects ? (
                          <ToggleRight className="h-6 w-6 text-blue-600" />
                        ) : (
                          <ToggleLeft className="h-6 w-6 text-slate-400" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {activeCategory === 'notifications' && (
                <div>
                  <h2 className="text-xl font-medium text-slate-800 mb-4">Notification Settings</h2>
                  
                  <div className="space-y-3">
                    <button
                      onClick={() => toggleSetting('emergencyAlerts')}
                      className="flex items-center justify-between w-full p-3 border border-slate-200 rounded-md hover:bg-slate-50"
                    >
                      <span>Emergency Alerts</span>
                      {settings.emergencyAlerts ? (
                        <ToggleRight className="h-6 w-6 text-blue-600" />
                      ) : (
                        <ToggleLeft className="h-6 w-6 text-slate-400" />
                      )}
                    </button>
                    
                    <button
                      onClick={() => toggleSetting('communityNotifications')}
                      className="flex items-center justify-between w-full p-3 border border-slate-200 rounded-md hover:bg-slate-50"
                    >
                      <span>Community Notifications</span>
                      {settings.communityNotifications ? (
                        <ToggleRight className="h-6 w-6 text-blue-600" />
                      ) : (
                        <ToggleLeft className="h-6 w-6 text-slate-400" />
                      )}
                    </button>
                  </div>
                  
                  <p className="mt-4 text-xs text-slate-500">
                    Emergency alerts cannot be fully disabled for safety reasons, but you can adjust their frequency.
                  </p>
                </div>
              )}
              
              {activeCategory === 'privacy' && (
                <div>
                  <h2 className="text-xl font-medium text-slate-800 mb-4">Privacy Settings</h2>
                  
                  <div className="space-y-3">
                    <button
                      onClick={() => toggleSetting('locationSharing')}
                      className="flex items-center justify-between w-full p-3 border border-slate-200 rounded-md hover:bg-slate-50"
                    >
                      <span>Location Sharing</span>
                      {settings.locationSharing ? (
                        <ToggleRight className="h-6 w-6 text-blue-600" />
                      ) : (
                        <ToggleLeft className="h-6 w-6 text-slate-400" />
                      )}
                    </button>
                  </div>
                  
                  <div className="mt-6 bg-blue-50 border border-blue-100 rounded-md p-4">
                    <h3 className="text-sm font-medium text-slate-800 mb-2">About Your Data</h3>
                    <p className="text-sm text-slate-600 mb-3">
                      LifeChain only uses your data to provide emergency services. We never sell or share your information with third parties.
                    </p>
                    <div className="flex space-x-3">
                      <button className="text-sm text-blue-600 hover:text-blue-800">
                        Privacy Policy
                      </button>
                      <button className="text-sm text-blue-600 hover:text-blue-800">
                        Delete My Data
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {activeCategory === 'accessibility' && (
                <div>
                  <h2 className="text-xl font-medium text-slate-800 mb-4">Accessibility</h2>
                  <div className="space-y-3">
                    <button
                      onClick={() => toggleSetting('highContrast')}
                      className="flex items-center justify-between w-full p-3 border border-slate-200 rounded-md hover:bg-slate-50"
                    >
                      <span>High Contrast Mode</span>
                      {settings.highContrast ? (
                        <ToggleRight className="h-6 w-6 text-blue-600" />
                      ) : (
                        <ToggleLeft className="h-6 w-6 text-slate-400" />
                      )}
                    </button>
                    <button
                      onClick={() => toggleSetting('largeText')}
                      className="flex items-center justify-between w-full p-3 border border-slate-200 rounded-md hover:bg-slate-50"
                    >
                      <span>Large Text</span>
                      {settings.largeText ? (
                        <ToggleRight className="h-6 w-6 text-blue-600" />
                      ) : (
                        <ToggleLeft className="h-6 w-6 text-slate-400" />
                      )}
                    </button>
                  </div>
                </div>
              )}
              
              {activeCategory === 'about' && (
                <div>
                  <h2 className="text-xl font-medium text-slate-800 mb-4">About LifeChain</h2>
                  
                  <div className="space-y-4">
                    <p className="text-slate-600">
                      LifeChain is an AI-powered emergency response assistant designed for rural and underprivileged areas. Our mission is to ensure everyone has access to life-saving information and emergency assistance.
                    </p>
                    
                    <div className="bg-slate-50 p-4 rounded-md">
                      <div className="flex items-center justify-between text-sm text-slate-600 mb-2">
                        <span>Version</span>
                        <span>1.0.0</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-slate-600">
                        <span>Last Updated</span>
                        <span>{new Date().toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <h3 className="text-sm font-medium text-slate-700 mb-2">Contact & Support</h3>
                      <div className="space-y-2">
                        <a href="#" className="flex items-center text-blue-600 hover:text-blue-800">
                          <span>Help Center</span>
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </a>
                        <a href="#" className="flex items-center text-blue-600 hover:text-blue-800">
                          <span>Report an Issue</span>
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </a>
                        <a href="#" className="flex items-center text-blue-600 hover:text-blue-800">
                          <span>Contact Us</span>
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;