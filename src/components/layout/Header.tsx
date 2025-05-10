import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Heart, AlertTriangle, Users, Settings, Menu, X } from 'lucide-react';
import { useEmergency } from '../../context/EmergencyContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { emergencyActive } = useEmergency();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      } ${emergencyActive ? 'bg-red-50' : ''}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center">
              <Heart
                className={`h-8 w-8 ${
                  emergencyActive ? 'text-red-600' : 'text-blue-600'
                } ${emergencyActive ? 'animate-pulse' : ''}`}
              />
              <span className="ml-2 text-xl font-bold text-slate-800">LifeChain</span>
            </NavLink>
          </div>

          {/* Emergency indicator */}
          {emergencyActive && (
            <div className="absolute left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-4 py-1 rounded-full text-sm font-medium animate-pulse">
              Emergency Active
            </div>
          )}

          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-8">
            <NavLink
              to="/emergency"
              className={({ isActive }) =>
                `flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  isActive ? 'bg-red-100 text-red-700' : 'text-slate-700 hover:bg-red-50'
                }`
              }
            >
              <AlertTriangle className="mr-1 h-4 w-4" />
              Emergency
            </NavLink>
            <NavLink
              to="/first-aid"
              className={({ isActive }) =>
                `flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  isActive ? 'bg-blue-100 text-blue-700' : 'text-slate-700 hover:bg-blue-50'
                }`
              }
            >
              <Heart className="mr-1 h-4 w-4" />
              First Aid
            </NavLink>
            <NavLink
              to="/community"
              className={({ isActive }) =>
                `flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  isActive ? 'bg-green-100 text-green-700' : 'text-slate-700 hover:bg-green-50'
                }`
              }
            >
              <Users className="mr-1 h-4 w-4" />
              Community
            </NavLink>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                `flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  isActive ? 'bg-slate-200 text-slate-700' : 'text-slate-700 hover:bg-slate-100'
                }`
              }
            >
              <Settings className="mr-1 h-4 w-4" />
              Settings
            </NavLink>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-slate-800 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">{isMenuOpen ? 'Close menu' : 'Open menu'}</span>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink
              to="/emergency"
              className={({ isActive }) =>
                `flex items-center px-3 py-2 rounded-md text-base font-medium ${
                  isActive ? 'bg-red-100 text-red-700' : 'text-slate-700 hover:bg-red-50'
                }`
              }
              onClick={toggleMenu}
            >
              <AlertTriangle className="mr-2 h-5 w-5" />
              Emergency
            </NavLink>
            <NavLink
              to="/first-aid"
              className={({ isActive }) =>
                `flex items-center px-3 py-2 rounded-md text-base font-medium ${
                  isActive ? 'bg-blue-100 text-blue-700' : 'text-slate-700 hover:bg-blue-50'
                }`
              }
              onClick={toggleMenu}
            >
              <Heart className="mr-2 h-5 w-5" />
              First Aid
            </NavLink>
            <NavLink
              to="/community"
              className={({ isActive }) =>
                `flex items-center px-3 py-2 rounded-md text-base font-medium ${
                  isActive ? 'bg-green-100 text-green-700' : 'text-slate-700 hover:bg-green-50'
                }`
              }
              onClick={toggleMenu}
            >
              <Users className="mr-2 h-5 w-5" />
              Community
            </NavLink>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                `flex items-center px-3 py-2 rounded-md text-base font-medium ${
                  isActive ? 'bg-slate-200 text-slate-700' : 'text-slate-700 hover:bg-slate-100'
                }`
              }
              onClick={toggleMenu}
            >
              <Settings className="mr-2 h-5 w-5" />
              Settings
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;