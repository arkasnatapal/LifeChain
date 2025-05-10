import React from 'react';
import { Heart, Globe } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center">
              <Heart className="h-5 w-5 text-red-500 mr-2" />
              <span className="text-lg font-semibold">LifeChain</span>
            </div>
            <p className="text-sm text-slate-300 mt-1">
              AI-Powered Emergency Network for the Underserved
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 text-sm">
            <a href="#" className="hover:text-blue-400 transition-colors">
              About Us
            </a>
            <a href="#" className="hover:text-blue-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-blue-400 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-blue-400 transition-colors">
              Contact
            </a>
          </div>
          
          <div className="mt-4 md:mt-0">
            <div className="flex items-center space-x-3">
              <div className="flex items-center">
                <Globe className="h-4 w-4 text-slate-300 mr-1" />
                <select className="bg-slate-700 text-white text-sm rounded border-0 py-1 pl-1 pr-6 focus:outline-none focus:ring-1 focus:ring-blue-500">
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                  <option value="hi">हिन्दी</option>
                  <option value="ar">العربية</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-slate-700 text-center text-xs text-slate-400">
          &copy; {new Date().getFullYear()} LifeChain. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;