import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Screen1 } from './components/Screen1';
import { Screen3 } from './components/Screen3';
import { Screen4 } from './components/Screen4';
import { Screen5 } from './components/Screen5';
import { Screen7 } from './components/Screen7';
import { Screen8 } from './components/Screen8';
import { Screen16 } from './components/Screen16';
import { Screen17 } from './components/Screen17';
import { Screen17B } from './components/Screen17B';
import { Screen17C } from './components/Screen17C';
import { Screen18 } from './components/Screen18';
import { Screen26 } from './components/Screen26';

declare global {
  interface Window {
    amplitude: any;
  }
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState(1);
  const [responses, setResponses] = useState<Record<string, any>>({});

  const totalScreens = 12;
  const progress = (currentScreen / totalScreens) * 100;

  // Set theme color for mobile browser chrome
  useEffect(() => {
    // Update theme-color meta tag
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (!metaThemeColor) {
      metaThemeColor = document.createElement('meta');
      metaThemeColor.setAttribute('name', 'theme-color');
      document.head.appendChild(metaThemeColor);
    }
    metaThemeColor.setAttribute('content', '#f5f5f5');
  }, []);

  const handleNext = (data?: Record<string, any>) => {
    if (data) {
      setResponses(prev => ({ ...prev, ...data }));
    }
    setCurrentScreen(prev => Math.min(prev + 1, totalScreens));
    if(currentScreen >= 1 && currentScreen <= 10) {
      console.log(currentScreen);
      window?.amplitude?.track?.("question_viewed", {
        question_id: currentScreen - 1, // first question screen is 2, the last is 10
        context: "survey-c-question",
      });
    }
  };

  const handleBack = () => {
    setCurrentScreen(prev => Math.max(prev - 1, 1));
  };

  const screens = [
    <Screen1 onNext={handleNext} />, // 0
    <Screen3 onNext={handleNext} />, // Where do you usually eat? (1)
    <Screen4 onNext={handleNext} />, // How often do you eat more than you planned? (2)
    <Screen5 onNext={handleNext} />, // What's your ultimate goal right now? (3)
    <Screen7 onNext={handleNext} />, // How do you usually feel after eating? (4)
    <Screen8 onNext={handleNext} />, // What kind of help do you need? (5)
    <Screen16 onNext={handleNext} />, // Connecting your answers with real glucose patterns (6)
    <Screen17 onNext={handleNext} responses={responses} />, // You're eating blind. (7)
    <Screen17B onNext={handleNext} responses={responses} />, // Name And Email Form  (8)
    <Screen17C onNext={handleNext} responses={responses} />, // How old are you? (9)
    <Screen18 onNext={handleNext} />,
    <Screen26 onNext={handleNext} />,
  ];

  return (
    <div className="h-screen overflow-hidden bg-[#f5f5f5] relative">
      {/* Persistent background layer to prevent color flashing during animations */}
      <div className="fixed inset-0 bg-[#f5f5f5] z-0" />
      
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-100 z-50">
        <motion.div
          className="h-full bg-[#f14e58]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Screens - no animation on container */}
      <div className="h-full pt-1 bg-[#f5f5f5] relative z-10">
        <AnimatePresence mode="wait">
          <div key={currentScreen} className="h-full">
            {screens[currentScreen - 1]}
          </div>
        </AnimatePresence>
      </div>
    </div>
  );
}