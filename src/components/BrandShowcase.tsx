import React from 'react';

export const BrandShowcase: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center z-10 select-none px-6 overflow-hidden pointer-events-none">
      
      {/* Cold Silver Ambient Aura */}
      <div 
        className="absolute w-[640px] h-[340px] rounded-full pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(148,163,184,0.05) 0%, rgba(30,41,59,0.06) 45%, transparent 75%)',
          filter: 'blur(40px)'
        }}
      />

      {/* Main Center Stage: Pure Institutional Authority Wordmark */}
      <div className="relative flex flex-col items-center justify-center cursor-default group pointer-events-auto">
        
        {/* Wordmark SENTIANIS (Contemporary Roman Latin Authority) */}
        <h1 
          className="tracking-[0.22em] sm:tracking-[0.26em] md:tracking-[0.3em] text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold uppercase text-slate-100 drop-shadow-[0_12px_25px_rgba(0,0,0,0.9)] transition-all duration-700 group-hover:text-white"
          style={{
            fontFamily: '"Cinzel", "Times New Roman", serif',
            fontWeight: 700,
          }}
        >
          SENTIANIS
        </h1>

        {/* Discreet Domain Sub-line */}
        <div className="mt-5 sm:mt-6 text-[11px] sm:text-xs font-mono tracking-[0.45em] text-slate-400 uppercase font-medium transition-all duration-500 group-hover:text-slate-300">
          <span>sentianis.com</span>
        </div>

      </div>

    </div>
  );
};
