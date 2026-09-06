import React, { useState, useRef } from 'react';
import { ShieldCheck, Lock, EyeOff, HardDrive, FileJson, ServerOff, CheckCircle2 } from 'lucide-react';
import { HoverText } from './HoverText';

export const PrivacySecurity: React.FC = () => {
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
        setActiveMobileIndex((prev) => (prev + 1) % securityItems.length);
      } else {
        setActiveMobileIndex((prev) => (prev === 0 ? securityItems.length - 1 : prev - 1));
      }
    }
    touchStartX.current = null;
  };

  const securityItems = [
    {
      icon: ServerOff,
      metric: '100%',
      title: 'Local Processing',
      description: 'All NLP text taggers, domain matching rules, and confidence scoring run strictly on your local CPU & GPU.'
    },
    {
      icon: EyeOff,
      metric: '0%',
      title: 'Keystroke Logging',
      description: 'Zero system-wide keylogging. RUKOji never listens to keypresses outside its own app settings textfields.'
    },
    {
      icon: Lock,
      metric: '0%',
      title: 'Screen Screenshots',
      description: 'Zero background desktop screenshot taking or secret screen recording.'
    },
    {
      icon: HardDrive,
      metric: '0%',
      title: 'Cloud Telemetry',
      description: 'Zero browser URLs or search queries sent to cloud servers. All analytics remain on your local disk.'
    }
  ];

  return (
    <section id="privacy" className="py-24 bg-[#0B0B0C] border-t border-[#27272A]/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#1E8D42]/15 border border-[#1E8D42]/30 text-[#1E8D42]">
            ZERO-SPYWARE COMMITMENT
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-chennai">
            <HoverText text="Verified Privacy & Technical Security." />
          </h2>
          <p className="text-[#988686] text-base sm:text-lg">
            We state technical boundaries with total honesty. No marketing exaggerated claims — strictly verified code functionality.
          </p>
        </div>

        {/* DESKTOP LAYOUT (Unchanged for lg and larger screens) */}
        <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {securityItems.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div key={idx} className="glass-card p-6 space-y-3 border border-[#1E8D42]/40 hover:border-[#1E8D42] transition-all">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-[#1E8D42]/20 text-[#1E8D42]">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <span className="text-xl font-black text-[#1E8D42] font-mono">{item.metric}</span>
                </div>
                <h3 className="text-base font-bold text-white font-chennai">
                  <HoverText text={item.title} />
                </h3>
                <p className="text-xs text-[#988686] leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* MOBILE ONLY - REACT BITS BOUNCE CARDS STACK (NO DOTS, NO ARROWS) */}
        <div className="block lg:hidden relative py-4 mb-12">
          <div 
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="relative h-[240px] w-full max-w-[340px] mx-auto px-4 flex items-center justify-center"
          >
            {securityItems.map((item, idx) => {
              const IconComp = item.icon;
              const diff = (idx - activeMobileIndex + securityItems.length) % securityItems.length;

              let transformStyle = '';
              let zIndexStyle = 10;
              let opacityStyle = 'opacity-60';
              let borderStyle = 'border-[#27272A]/60 bg-[#121214]';

              if (diff === 0) {
                // Top active card
                transformStyle = 'scale-100 rotate-0 translate-x-0 translate-y-0';
                zIndexStyle = 40;
                opacityStyle = 'opacity-100';
                borderStyle = 'border-[#1E8D42] shadow-2xl shadow-[#1E8D42]/30 bg-[#141A16]';
              } else if (diff === 1) {
                transformStyle = 'scale-[0.94] rotate-[6deg] translate-x-[24px] translate-y-[8px]';
                zIndexStyle = 30;
                opacityStyle = 'opacity-80';
              } else if (diff === 2) {
                transformStyle = 'scale-[0.88] rotate-[-6deg] translate-x-[-24px] translate-y-[16px]';
                zIndexStyle = 20;
                opacityStyle = 'opacity-70';
              } else {
                transformStyle = 'scale-[0.82] rotate-[9deg] translate-x-[36px] translate-y-[24px]';
                zIndexStyle = 10;
                opacityStyle = 'opacity-60';
              }

              return (
                <div
                  key={idx}
                  onClick={() => setActiveMobileIndex((prev) => (prev + 1) % securityItems.length)}
                  style={{ zIndex: zIndexStyle }}
                  className={`absolute w-full max-w-[265px] h-[210px] p-5 rounded-2xl flex flex-col justify-between transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] cursor-pointer select-none border ${borderStyle} ${transformStyle} ${opacityStyle}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-xl bg-[#1E8D42]/20 text-[#1E8D42]">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <span className="text-xl font-black text-[#1E8D42] font-mono">{item.metric}</span>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-base font-bold text-white font-chennai">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#988686] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="glass-card p-8 border border-[#27272A]/50 rounded-2xl max-w-4xl mx-auto space-y-6">
          <div className="flex items-center gap-3 border-b border-[#27272A]/30 pb-4">
            <ShieldCheck className="w-6 h-6 text-[#1E8D42]" />
            <div>
              <h3 className="text-lg font-bold text-white font-chennai">
                <HoverText text="Local Data Storage & Security Guarantee" />
              </h3>
              <p className="text-xs text-[#988686]">Where your RUKOji configuration lives on your Mac</p>
            </div>
          </div>

          <div className="space-y-3 text-xs text-[#988686]">
            <div className="flex items-start gap-3">
              <FileJson className="w-4 h-4 text-[#7C3AED] shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Versioned JSON Storage:</strong> Custom rules, stickers, and sound configurations are stored locally in <code className="px-1.5 py-0.5 rounded bg-[#0B0B0C] text-[#1E8D42] font-mono">~/Library/Application Support/RUKOji/</code>.
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Lock className="w-4 h-4 text-[#7C3AED] shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Max Privacy Mode:</strong> Disables all local aggregated stats logging and suppresses even local activity history recording.
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#1E8D42] shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Portable JSON Export/Import:</strong> Backup or reset your entire RUKOji configuration with 1-click JSON export.
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
