import React, { createContext, useContext, useState, ReactNode } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as use from '@tensorflow-models/universal-sentence-encoder';

interface AIContextType {
  isProcessing: boolean;
  detectEmergencyType: (input: string) => Promise<string>;
  generateFirstAidSteps: (emergencyType: string) => Promise<string[]>;
  transcribeVoice: (audioBlob: Blob) => Promise<string>;
}

const AIContext = createContext<AIContextType>({
  isProcessing: false,
  detectEmergencyType: async () => '',
  generateFirstAidSteps: async () => [],
  transcribeVoice: async () => '',
});

export const useAI = () => useContext(AIContext);

export const AIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [model, setModel] = useState<use.UniversalSentenceEncoder | null>(null);

  // Initialize the model
  React.useEffect(() => {
    const loadModel = async () => {
      try {
        const loadedModel = await use.load();
        setModel(loadedModel);
      } catch (error) {
        console.error('Error loading AI model:', error);
      }
    };
    loadModel();
  }, []);

  const detectEmergencyType = async (input: string): Promise<string> => {
    setIsProcessing(true);
    try {
      if (!model) throw new Error('AI model not loaded');

      // Simple emergency classification based on keywords
      const emergencyTypes = {
        medical: ['hurt', 'pain', 'bleeding', 'unconscious', 'heart', 'breathing'],
        fire: ['fire', 'smoke', 'burning', 'flames'],
        crime: ['theft', 'attack', 'robbery', 'violence'],
        disaster: ['flood', 'earthquake', 'storm', 'tsunami']
      };

      const inputEmbedding = await model.embed([input.toLowerCase()]);
      
      // In a real app, we'd use proper ML classification
      // This is a simplified demo using keyword matching
      for (const [type, keywords] of Object.entries(emergencyTypes)) {
        if (keywords.some(keyword => input.toLowerCase().includes(keyword))) {
          return type;
        }
      }

      return 'unknown';
    } catch (error) {
      console.error('Error detecting emergency type:', error);
      return 'unknown';
    } finally {
      setIsProcessing(false);
    }
  };

  const generateFirstAidSteps = async (emergencyType: string): Promise<string[]> => {
    // In a real app, this would use a more sophisticated AI model
    // This is a demo with pre-defined responses
    const firstAidGuides = {
      medical: [
        'Check if the person is responsive',
        'Call emergency services',
        'Check breathing and pulse',
        'Apply first aid if trained',
        'Keep the person calm and comfortable'
      ],
      fire: [
        'Evacuate the area immediately',
        'Call fire services',
        'Do not use elevators',
        'Stay low to avoid smoke',
        'Use fire extinguisher only if safe'
      ],
      crime: [
        'Ensure your safety first',
        'Call law enforcement',
        'Do not confront the perpetrator',
        'Note important details',
        'Help others get to safety'
      ],
      disaster: [
        'Move to higher ground (floods) or open areas (earthquakes)',
        'Stay away from power lines and buildings',
        'Listen to emergency broadcasts',
        'Help others if safe to do so',
        'Wait for official instructions'
      ]
    };

    return firstAidGuides[emergencyType as keyof typeof firstAidGuides] || 
      ['Call emergency services immediately', 'Stay calm', 'Follow official instructions'];
  };

  const transcribeVoice = async (audioBlob: Blob): Promise<string> => {
    // In a real app, this would use a proper speech-to-text service
    // This is a placeholder for demo purposes
    return 'Voice transcription would appear here';
  };

  return (
    <AIContext.Provider
      value={{
        isProcessing,
        detectEmergencyType,
        generateFirstAidSteps,
        transcribeVoice,
      }}
    >
      {children}
    </AIContext.Provider>
  );
};