import React, { useState } from 'react';
import { Search, ChevronRight, ChevronDown } from 'lucide-react';

interface FirstAidGuide {
  id: string;
  title: string;
  category: string;
  steps: string[];
  warnings?: string[];
}

const FirstAid: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedGuide, setExpandedGuide] = useState<string | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>('common');

  // Sample first aid guides data
  const firstAidGuides: FirstAidGuide[] = [
    {
      id: 'bleeding',
      title: 'Stopping Bleeding',
      category: 'common',
      steps: [
        'Apply direct pressure to the wound using a clean cloth or bandage',
        'If possible, raise the injured area above the level of the heart',
        'Apply pressure for at least 15 minutes',
        'If bleeding continues, apply pressure to the artery supplying the area',
        'Secure the dressing with a bandage once bleeding slows',
        'Seek medical attention immediately for severe bleeding'
      ],
      warnings: [
        'Do not remove the cloth if it becomes soaked with blood - add another on top',
        'Do not apply a tourniquet unless specifically trained to do so'
      ]
    },
    {
      id: 'burns',
      title: 'Treating Burns',
      category: 'common',
      steps: [
        'Remove the person from the source of the burn',
        'Cool the burn with cool (not cold) running water for 10-15 minutes',
        'Remove jewelry or tight items near the burned area',
        'Cover the burn with a sterile, non-adhesive bandage or clean cloth',
        'Do not apply ointments, butter, or other home remedies to serious burns',
        'Take over-the-counter pain relievers if needed'
      ],
      warnings: [
        'Never use ice, as it can cause further damage',
        'Do not break blisters',
        'Seek immediate medical attention for severe or extensive burns'
      ]
    },
    {
      id: 'cpr',
      title: 'CPR Basics',
      category: 'critical',
      steps: [
        'Check if the person is responsive by tapping their shoulder and shouting',
        'If unresponsive, call emergency services or ask someone else to',
        'Place the person on their back on a firm surface',
        'Kneel beside the person\'s chest',
        'Place the heel of one hand on the center of the chest, then place your other hand on top',
        'Keep your arms straight and position your shoulders directly above your hands',
        'Push hard and fast at a rate of 100-120 compressions per minute',
        'Allow the chest to completely recoil between compressions',
        'Continue until emergency services arrive or the person shows signs of life'
      ],
      warnings: [
        'Do not perform CPR if the person is conscious or breathing normally',
        'If you haven\'t been trained in CPR, use hands-only CPR (compressions only)'
      ]
    },
    {
      id: 'choking',
      title: 'Choking Relief',
      category: 'critical',
      steps: [
        'Stand behind the person and slightly to one side',
        'Support their chest with one hand and lean them forward',
        'Give up to 5 sharp blows between their shoulder blades with the heel of your hand',
        'Check if the blockage has cleared after each blow',
        'If back blows don\'t help, try abdominal thrusts (Heimlich maneuver)',
        'Stand behind the person and put both arms around their upper abdomen',
        'Clench your fist and place it between the navel and the bottom of their sternum',
        'Grasp this hand with your other hand and pull sharply inward and upward',
        'Repeat up to 5 times'
      ],
      warnings: [
        'For pregnant women or obese individuals, perform chest thrusts instead of abdominal thrusts',
        'If the person becomes unconscious, begin CPR immediately'
      ]
    },
    {
      id: 'fracture',
      title: 'Handling Fractures',
      category: 'injuries',
      steps: [
        'Keep the injured area still and supported until help arrives',
        'If needed, immobilize the area using a splint',
        'Apply ice packs wrapped in a cloth to reduce swelling',
        'Elevate the injured limb if possible',
        'Take pain relievers if needed',
        'Seek medical attention immediately'
      ],
      warnings: [
        'Do not attempt to straighten a broken bone',
        'Do not move a person with a suspected spinal, neck, or head injury unless absolutely necessary'
      ]
    },
    {
      id: 'snake-bite',
      title: 'Snake Bite',
      category: 'bites',
      steps: [
        'Move the person away from the snake',
        'Keep the bitten area below the level of the heart',
        'Keep the person calm and still to slow the spread of venom',
        'Remove any jewelry or tight clothing near the bite',
        'Clean the wound gently with soap and water if available',
        'Cover the bite with a clean, dry dressing',
        'Mark the leading edge of swelling on the skin and note the time',
        'Get medical help immediately'
      ],
      warnings: [
        'Do NOT cut the bite or attempt to suck out the venom',
        'Do NOT apply a tourniquet or ice',
        'Do NOT give the person alcohol or medications'
      ]
    }
  ];

  // Filter guides based on search query
  const filteredGuides = firstAidGuides.filter(guide =>
    guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    guide.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group guides by category
  const categorizedGuides = filteredGuides.reduce((acc, guide) => {
    if (!acc[guide.category]) {
      acc[guide.category] = [];
    }
    acc[guide.category].push(guide);
    return acc;
  }, {} as Record<string, FirstAidGuide[]>);

  // Get category display name
  const getCategoryName = (category: string) => {
    switch (category) {
      case 'common': return 'Common Emergencies';
      case 'critical': return 'Critical Situations';
      case 'injuries': return 'Injuries & Trauma';
      case 'bites': return 'Bites & Stings';
      default: return category.charAt(0).toUpperCase() + category.slice(1);
    }
  };

  const toggleGuide = (guideId: string) => {
    setExpandedGuide(expandedGuide === guideId ? null : guideId);
  };

  const toggleCategory = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">First Aid Guide</h1>
        <p className="text-slate-600 mb-6">
          Step-by-step instructions for common emergencies. Always call emergency services for serious situations.
        </p>

        {/* Search bar */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search first aid procedures..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* First aid categories and guides */}
        <div className="space-y-4">
          {Object.entries(categorizedGuides).length === 0 ? (
            <div className="text-center py-8">
              <p className="text-slate-500">No first aid guides found for "{searchQuery}"</p>
            </div>
          ) : (
            Object.entries(categorizedGuides).map(([category, guides]) => (
              <div key={category} className="border border-slate-200 rounded-lg overflow-hidden bg-white">
                <button
                  className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 hover:bg-slate-100 transition-colors text-left"
                  onClick={() => toggleCategory(category)}
                >
                  <h2 className="text-lg font-medium text-slate-800">
                    {getCategoryName(category)}
                  </h2>
                  {expandedCategory === category ? (
                    <ChevronDown className="h-5 w-5 text-slate-500" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-slate-500" />
                  )}
                </button>
                
                {expandedCategory === category && (
                  <div className="divide-y divide-slate-200">
                    {guides.map((guide) => (
                      <div key={guide.id} className="overflow-hidden">
                        <button
                          className={`w-full flex items-center justify-between px-4 py-3 hover:bg-slate-50 transition-colors text-left ${
                            expandedGuide === guide.id ? 'bg-blue-50' : ''
                          }`}
                          onClick={() => toggleGuide(guide.id)}
                        >
                          <span className="font-medium text-slate-700">
                            {guide.title}
                          </span>
                          {expandedGuide === guide.id ? (
                            <ChevronDown className="h-5 w-5 text-blue-500" />
                          ) : (
                            <ChevronRight className="h-5 w-5 text-slate-400" />
                          )}
                        </button>
                        
                        {expandedGuide === guide.id && (
                          <div className="px-4 py-3 bg-slate-50">
                            <ol className="list-decimal pl-5 space-y-2 text-slate-700">
                              {guide.steps.map((step, index) => (
                                <li key={index} className="pl-1">{step}</li>
                              ))}
                            </ol>
                            
                            {guide.warnings && guide.warnings.length > 0 && (
                              <div className="mt-4 bg-orange-50 border-l-4 border-orange-400 p-3">
                                <h3 className="text-sm font-semibold text-orange-800 mb-1">
                                  Important Warnings:
                                </h3>
                                <ul className="list-disc pl-5 text-orange-700 text-sm space-y-1">
                                  {guide.warnings.map((warning, index) => (
                                    <li key={index}>{warning}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
        
        <div className="mt-8 p-4 bg-slate-100 rounded-lg text-sm text-slate-600">
          <p className="font-medium text-slate-700 mb-2">Disclaimer:</p>
          <p>
            This first aid guide is provided for informational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of a qualified healthcare provider with any questions you may have regarding a medical condition or emergency.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FirstAid;