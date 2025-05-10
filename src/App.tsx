import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Emergency from './pages/Emergency';
import FirstAid from './pages/FirstAid';
import Community from './pages/Community';
import Settings from './pages/Settings';
import { EmergencyProvider } from './context/EmergencyContext';
import { LocationProvider } from './context/LocationContext';
import { AIProvider } from './context/AIContext';

function App() {
  return (
    <Router>
      <AIProvider>
        <EmergencyProvider>
          <LocationProvider>
            <div className="flex flex-col min-h-screen bg-slate-50">
              <Header />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/emergency" element={<Emergency />} />
                  <Route path="/first-aid" element={<FirstAid />} />
                  <Route path="/community" element={<Community />} />
                  <Route path="/settings" element={<Settings />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </LocationProvider>
        </EmergencyProvider>
      </AIProvider>
    </Router>
  );
}

export default App;