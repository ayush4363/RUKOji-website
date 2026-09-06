import React, { useState, useRef } from 'react';
import { Search, Shield, Timer } from 'lucide-react';
import { HoverText } from './HoverText';

export const HowItWorks: React.FC = () => {
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diffX = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diffX) > 40) {
      if (diffX < 0) {
        setActiveMobileIndex((prev) => (prev + 1) % steps.length);
      } else {
        setActiveMobileIndex((prev) => (prev === 0 ? steps.length - 1 : prev - 1));
      }
    }
    touchStartX.current = null;
  };

  const steps = [
    {
      num: '01',
      icon: Search,
      title: 'On-Device Observation',
      strongText: 'Browser Tab Watcher:',
      description: 'Queries active window titles in Chrome, Safari, Brave, and Edge locally using macOS AppleScript. Evaluates multi-signal risk via Apple NLTagger NLP and Vision ML.',
      tag: '100% Local • Zero Keylogging',
      tagColor: 'text-[#1E8D42]'
    },
    {
      num: '02',
      icon: Shield,
      title: 'Empathetic Floating Pause',
      strongText: 'Floating NSPanel:',
      description: 'Immediately launches a floating window overlay hovering at .screenSaver level. Displays custom stickers (Gandhi, Dog Meme), Hinglish messages ("Beta, ruk ja ❤️"), and audio sounds.',
      tag: 'Empathetic • Custom Stickers & Audio',
      tagColor: 'text-[#7C3AED]'
    },
    {
      num: '03',
      icon: Timer,
      title: 'Cooldown & Timed App Lock',
      strongText: 'Persistent Lock Engine:',
      description: 'Enforces a voluntary cooldown timer or repeated attempt lockout. Persists via protection_lock.json so protection cannot be stopped until 00:00.',
      tag: 'Persistent Lock • Resets at 00:00',
      tagColor: 'text-[#EDD06F]'
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-[#0B0B0C] border-t border-[#27272A]/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#7C3AED]/15 border border-[#7C3AED]/30 text-[#7C3AED]">
            3-STEP SYSTEM WORKFLOW
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-chennai">
            <HoverText text="How RUKOji interrupts compulsion." />
          </h2>
          <p className="text-[#988686] text-base sm:text-lg">
            A seamless, 100% on-device local loop designed to protect your attention without cloud surveillance.
          </p>
        </div>

        {/* DESKTOP LAYOUT (Unchanged for md and larger screens) */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => {
            const IconComp = step.icon;
            return (
              <div key={idx} className="glass-card p-8 flex flex-col justify-between space-y-6 relative group hover:border-[#7C3AED] transition-all">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-black text-[#7C3AED] font-mono">{step.num}</span>
                    <div className="p-3 rounded-xl bg-[#7C3AED]/20 border border-[#7C3AED]/40 text-[#7C3AED]">
                      <IconComp className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white font-chennai">
                    <HoverText text={step.title} />
                  </h3>

                  <p className="text-xs text-[#988686] leading-relaxed">
                    <strong className="text-[#D1D0D0]">{step.strongText}</strong> {step.description}
                  </p>
                </div>

                <div className={`pt-4 border-t border-[#27272A]/30 text-[11px] font-mono ${step.tagColor}`}>
                  {step.tag}
                </div>
              </div>
            );
          })}
        </div>

        {/* MOBILE ONLY - REACT BITS BOUNCE CARDS STACK (NO DOTS, NO ARROWS) */}
        <div className="block md:hidden relative py-4">
          <div 
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="relative h-[380px] w-full max-w-[340px] mx-auto px-4 flex items-center justify-center"
          >
            {steps.map((step, idx) => {
              const IconComp = step.icon;
              const diff = (idx - activeMobileIndex + steps.length) % steps.length;
              
              let transformStyle = '';
              let zIndexStyle = 10;
              let opacityStyle = 'opacity-60';
              let borderStyle = 'border-[#27272A]/60 bg-[#121214]';

              if (diff === 0) {
                // Top active card
                transformStyle = 'scale-100 rotate-0 translate-x-0 translate-y-0';
                zIndexStyle = 30;
                opacityStyle = 'opacity-100';
                borderStyle = 'border-[#7C3AED] shadow-2xl shadow-[#7C3AED]/30 bg-[#151419]';
              } else if (diff === 1) {
                // Next card in stack (shifted right & slightly down)
                transformStyle = 'scale-[0.94] rotate-[6deg] translate-x-[26px] translate-y-[10px]';
                zIndexStyle = 20;
                opacityStyle = 'opacity-80';
              } else {
                // Last card in stack (shifted left & lower down)
                transformStyle = 'scale-[0.88] rotate-[-6deg] translate-x-[-26px] translate-y-[20px]';
                zIndexStyle = 10;
                opacityStyle = 'opacity-65';
              }

              return (
                <div
                  key={idx}
                  onClick={() => setActiveMobileIndex((prev) => (prev + 1) % steps.length)}
                  style={{ zIndex: zIndexStyle }}
                  className={`absolute w-full max-w-[275px] h-[340px] p-6 rounded-2xl flex flex-col justify-between transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] cursor-pointer select-none border ${borderStyle} ${transformStyle} ${opacityStyle}`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-black text-[#7C3AED] font-mono">{step.num}</span>
                      <div className="p-2.5 rounded-xl bg-[#7C3AED]/20 border border-[#7C3AED]/40 text-[#7C3AED]">
                        <IconComp className="w-5 h-5" />
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-white font-chennai leading-snug">
                      {step.title}
                    </h3>

                    <p className="text-xs text-[#988686] leading-relaxed">
                      <strong className="text-[#D1D0D0]">{step.strongText}</strong> {step.description}
                    </p>
                  </div>

                  <div className={`pt-3 border-t border-[#27272A]/30 text-[11px] font-mono ${step.tagColor}`}>
                    {step.tag}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
