import React from 'react';
import { RealRukojiAppWindow } from './RealRukojiAppWindow';
import { HoverText } from './HoverText';

export const ProductShowcase: React.FC = () => {
  return (
    <section id="showcase" className="py-24 bg-[#0B0B0C] relative border-t border-[#27272A]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#7C3AED]/15 border border-[#7C3AED]/30 text-[#7C3AED]">
            AUTHENTIC APPLICATION SHOWCASE
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-chennai">
            <HoverText text="Explore the real RUKOji interface." />
          </h2>
          <p className="text-[#988686] text-base sm:text-lg">
            Click any option in the application sidebar below to explore every verified native screen from the RUKOji macOS app.
          </p>
        </div>

        <div className="max-w-5xl mx-auto relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#7C3AED]/15 via-transparent to-[#1E8D42]/10 rounded-2xl blur-3xl -z-10"></div>
          <RealRukojiAppWindow
            onTestClick={() => {
              const interventionElem = document.getElementById('intervention');
              if (interventionElem) {
                interventionElem.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          />
        </div>

      </div>
    </section>
  );
};
