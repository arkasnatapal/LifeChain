import React, { useState } from 'react';
import { Users, UserPlus, MapPin, CheckCircle, Info } from 'lucide-react';

interface Volunteer {
  id: number;
  name: string;
  skills: string[];
  distance: string;
  availability: 'active' | 'inactive';
  isRegistered?: boolean;
}

const Community: React.FC = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    skills: [] as string[],
    availability: 'weekends',
  });

  // Sample volunteer data
  const volunteers: Volunteer[] = [
    {
      id: 1,
      name: 'Dr. Sarah Wilson',
      skills: ['Medical', 'First Aid', 'CPR'],
      distance: '0.8 miles',
      availability: 'active',
    },
    {
      id: 2,
      name: 'John Martinez',
      skills: ['Fire Safety', 'Rescue'],
      distance: '1.2 miles',
      availability: 'active',
    },
    {
      id: 3,
      name: 'Aisha Patel',
      skills: ['First Aid', 'Search & Rescue'],
      distance: '1.5 miles',
      availability: 'active',
    },
    {
      id: 4,
      name: 'Robert Chen',
      skills: ['Medical', 'Translation'],
      distance: '2.3 miles',
      availability: 'inactive',
    },
  ];

  if (isRegistered) {
    volunteers.push({
      id: 5,
      name: formData.name || 'You',
      skills: formData.skills.length > 0 ? formData.skills : ['First Aid'],
      distance: 'You',
      availability: 'active',
      isRegistered: true,
    });
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegistered(true);
    setShowRegistrationForm(false);
  };

  const handleSkillToggle = (skill: string) => {
    setFormData((prev) => {
      const skills = prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill];
      return { ...prev, skills };
    });
  };

  const availableSkills = [
    'First Aid',
    'CPR',
    'Medical',
    'Fire Safety',
    'Search & Rescue',
    'Translation',
    'Transportation',
    'Counseling',
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 mb-2 flex items-center">
              <Users className="h-6 w-6 mr-2 text-green-600" />
              Community SOS Network
            </h1>
            <p className="text-slate-600">
              Connect with nearby volunteers who can help during emergencies when official services are delayed.
            </p>
          </div>
          
          {!isRegistered && !showRegistrationForm && (
            <button
              onClick={() => setShowRegistrationForm(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center"
            >
              <UserPlus className="h-5 w-5 mr-2" />
              Become a Volunteer
            </button>
          )}
        </div>

        {/* Registration Form */}
        {showRegistrationForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8 border-t-4 border-green-500">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Volunteer Registration</h2>
            <form onSubmit={handleRegister}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full p-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full p-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>
              
              <div className="mb-4">
                <span className="block text-sm font-medium text-slate-700 mb-2">
                  Skills & Training
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {availableSkills.map((skill) => (
                    <label
                      key={skill}
                      className={`flex items-center p-2 border rounded-md cursor-pointer ${
                        formData.skills.includes(skill)
                          ? 'bg-green-50 border-green-300'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-slate-300 rounded"
                        checked={formData.skills.includes(skill)}
                        onChange={() => handleSkillToggle(skill)}
                      />
                      <span className="ml-2 text-sm">{skill}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="availability" className="block text-sm font-medium text-slate-700 mb-1">
                  Availability
                </label>
                <select
                  id="availability"
                  className="w-full p-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={formData.availability}
                  onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                >
                  <option value="weekends">Weekends Only</option>
                  <option value="evenings">Evenings</option>
                  <option value="24/7">24/7 (When in Area)</option>
                  <option value="custom">Custom Schedule</option>
                </select>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowRegistrationForm(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-md hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md"
                >
                  Register as Volunteer
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Network Status */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-slate-800">Network Status</h2>
            <div className="flex items-center">
              <span className="inline-block h-3 w-3 rounded-full bg-green-500 mr-2"></span>
              <span className="text-sm text-green-700 font-medium">Active</span>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-slate-50 rounded-lg">
              <div className="text-2xl font-bold text-slate-800">{volunteers.length}</div>
              <div className="text-sm text-slate-600">Active Volunteers</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg">
              <div className="text-2xl font-bold text-slate-800">2.5 min</div>
              <div className="text-sm text-slate-600">Avg. Response Time</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg">
              <div className="text-2xl font-bold text-slate-800">5 mi</div>
              <div className="text-sm text-slate-600">Coverage Radius</div>
            </div>
          </div>
        </div>

        {/* Nearby Volunteers */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-slate-200">
          <h2 className="text-lg font-medium text-slate-800 mb-4">Nearby Volunteers</h2>
          
          <div className="space-y-3">
            {volunteers.map((volunteer) => (
              <div
                key={volunteer.id}
                className={`border rounded-lg p-4 ${
                  volunteer.isRegistered ? 'bg-green-50 border-green-300' : 'border-slate-200'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-slate-800 flex items-center">
                      {volunteer.name}
                      {volunteer.isRegistered && (
                        <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                          You
                        </span>
                      )}
                    </h3>
                    <div className="flex items-center text-sm text-slate-500 mt-1">
                      <MapPin className="h-3.5 w-3.5 mr-1" />
                      <span>{volunteer.distance}</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className={`flex-shrink-0 h-2.5 w-2.5 rounded-full mr-1.5 ${
                      volunteer.availability === 'active' ? 'bg-green-500' : 'bg-slate-300'
                    }`}></span>
                    <span className="text-xs text-slate-600">
                      {volunteer.availability === 'active' ? 'Available' : 'Unavailable'}
                    </span>
                  </div>
                </div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {volunteer.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div className="bg-blue-50 rounded-lg p-5 border border-blue-100">
          <div className="flex items-start">
            <Info className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-slate-800 mb-2">How Community SOS Works</h3>
              <p className="text-sm text-slate-600 mb-3">
                If official emergency services are delayed, LifeChain will send an SOS alert to nearby volunteer members who can provide immediate assistance.
              </p>
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  <span>All volunteers are verified and trained in basic first aid</span>
                </div>
                <div className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  <span>Community SOS respects your privacy and location data</span>
                </div>
                <div className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  <span>Becoming a volunteer can help save lives in your community</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;