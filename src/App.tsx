import React from 'react';
import { BackgroundCanvas } from './components/BackgroundCanvas';
import { BrandShowcase } from './components/BrandShowcase';

export const App: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full bg-[#05060a] overflow-hidden flex items-center justify-center">
      {/* Sentient Consciousness Canvas */}
      <BackgroundCanvas />

      {/* Brand Showcase Centerpiece */}
      <BrandShowcase />

      {/* Subtle Peripheral Vignette */}
      <div className="absolute inset-0 pointer-events-none radial-mask-sentient z-0" />
    </div>
  );
};

export default App;
