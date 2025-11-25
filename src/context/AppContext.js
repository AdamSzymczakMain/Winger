// Plik: src/context/AppContext.js
// Context API dla globalnego stanu aplikacji
import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [goals, setGoals] = useState([]);
  const [personality, setPersonality] = useState(null);
  const [langCode, setLangCode] = useState('pl');
  const [profileImage, setProfileImage] = useState(null);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  const toggleGoal = (id) => {
    setGoals(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const resetOnboarding = () => {
    setGoals([]);
    setPersonality(null);
  setProfileImage(null);
    setHasCompletedOnboarding(false);
  };

  const value = {
    goals,
    setGoals,
    personality,
    setPersonality,
    profileImage,
    setProfileImage,
    langCode,
    setLangCode,
    hasCompletedOnboarding,
    setHasCompletedOnboarding,
    toggleGoal,
    resetOnboarding
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

