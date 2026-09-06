import React, { useState, useRef } from 'react';
import { pricingConfig } from '../config/pricing.config';
import { Check, Sparkles, AlertCircle } from 'lucide-react';
import { HoverText } from './HoverText';

export const Pricing: React.FC = () => {
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
        setActiveMobileIndex((prev) => (prev + 1) % pricingConfig.tiers.length);
      } else {
        setActiveMobileIndex((prev) => (prev === 0 ? pricingConfig.tiers.length - 1 : prev - 1));
      }
    }
    touchStartX.current = null;
  };

  return (
    <section id="pricing" className="py-24 bg-[#0B0B0C] border-t border-[#27272A]/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#7C3AED]/15 border border-[#7C3AED]/30 text-[#7C3AED]">
            CONFIGURABLE PRICING TIERS
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-chennai">
            <HoverText text="Transparent, predictable pricing." />
          </h2>
          <p className="text-[#988686] text-base sm:text-lg">
            RUKOji is currently 100% Free during initial launch. Future plans can be modified anytime in a single config file.
          </p>
        </div>

        {pricingConfig.isPlannedPricing && (
          <div className="max-w-3xl mx-auto mb-12 p-4 rounded-xl bg-[#EDD06F]/10 border border-[#EDD06F]/30 flex items-center gap-3 text-xs text-[#EDD06F]">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <div>
              <strong className="font-bold">Launch Stance: </strong>
              {pricingConfig.pricingNotice}
            </div>
          </div>
        )}

        {/* DESKTOP PRICING LAYOUT (Unchanged for md and larger screens) */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {pricingConfig.tiers.map((tier) => (
            <div
              key={tier.id}
              className={`glass-card p-8 flex flex-col justify-between space-y-6 relative rounded-3xl border transition-all ${
                tier.highlighted
                  ? 'border-[#7C3AED] bg-gradient-to-b from-[#7C3AED]/15 via-[#121214] to-[#0B0B0C] shadow-2xl shadow-[#7C3AED]/20 scale-105 z-10'
                  : 'border-[#27272A]/40'
              }`}
            >
              {tier.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full text-[10px] font-mono font-bold bg-[#7C3AED] text-white shadow-md">
                  {tier.badge}
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white font-chennai">
                    <HoverText text={tier.name} />
                  </h3>
                  <p className="text-xs text-[#988686] mt-1">{tier.description}</p>
                </div>

                <div className="flex items-baseline gap-1 border-b border-[#27272A]/30 pb-6">
                  <span className="text-4xl sm:text-5xl font-black text-white font-chennai tracking-tight">
                    {tier.priceDisplay}
                  </span>
                  {tier.pricePeriod && (
                    <span className="text-xs text-[#988686] font-medium">/ {tier.pricePeriod}</span>
                  )}
                </div>

                <div className="space-y-3">
                  <span className="text-[11px] font-mono font-bold text-[#D1D0D0] uppercase tracking-wider">
                    Included Features:
                  </span>
                  {tier.features.map((feat) => (
                    <div key={feat} className="flex items-start gap-2.5 text-xs text-[#988686]">
                      <Check className="w-4 h-4 text-[#1E8D42] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <a
                  href={tier.ctaLink}
                  className={`w-full py-3 rounded-xl text-xs font-bold transition-all text-center flex items-center justify-center gap-2 ${
                    tier.highlighted
                      ? 'bg-[#7C3AED] hover:bg-[#8B5CF6] text-white shadow-lg shadow-[#7C3AED]/30'
                      : 'bg-[#121214] hover:bg-[#1E1E22] text-[#D1D0D0] border border-[#27272A]/40'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  {tier.ctaText}
                </a>
              </div>

            </div>
          ))}
        </div>

        {/* MOBILE ONLY PRICING - REACT BITS BOUNCE STACKED CARDS (NO DOTS, NO ARROWS, NO CONTROL BAR) */}
        <div className="block md:hidden relative py-4">
          <div 
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="relative h-[540px] w-full max-w-[340px] px-4 mx-auto flex items-center justify-center"
          >
            {pricingConfig.tiers.map((tier, idx) => {
              const diff = (idx - activeMobileIndex + pricingConfig.tiers.length) % pricingConfig.tiers.length;

              let transformStyle = '';
              let zIndexStyle = 10;
              let opacityStyle = 'opacity-65';
              let borderStyle = 'border-[#27272A]/50 bg-[#101012]';

              if (diff === 0) {
                // Top active card - 100% OPAQUE solid background so background text never shines through
                transformStyle = 'scale-100 rotate-0 translate-x-0 translate-y-0';
                zIndexStyle = 30;
                opacityStyle = 'opacity-100';
                borderStyle = 'border-[#7C3AED] shadow-2xl shadow-[#7C3AED]/30 bg-gradient-to-b from-[#22153F] via-[#151419] to-[#0D0D10]';
              } else if (diff === 1) {
                // Next card in stack behind (shifted right & slightly down to keep top text behind front card)
                transformStyle = 'scale-[0.94] rotate-[6deg] translate-x-[26px] translate-y-[10px]';
                zIndexStyle = 20;
                opacityStyle = 'opacity-80';
                borderStyle = 'border-[#27272A]/60 bg-[#141417]';
              } else {
                // Last card in stack behind (shifted left & lower down for natural card deck depth)
                transformStyle = 'scale-[0.88] rotate-[-6deg] translate-x-[-26px] translate-y-[20px]';
                zIndexStyle = 10;
                opacityStyle = 'opacity-65';
                borderStyle = 'border-[#27272A]/40 bg-[#101012]';
              }

              return (
                <div
                  key={tier.id}
                  onClick={() => setActiveMobileIndex((prev) => (prev + 1) % pricingConfig.tiers.length)}
                  style={{ zIndex: zIndexStyle }}
                  className={`absolute w-full max-w-[275px] h-[495px] p-5 rounded-3xl flex flex-col justify-between transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] cursor-pointer select-none border ${borderStyle} ${transformStyle} ${opacityStyle}`}
                >
                  {tier.badge && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full text-[10px] font-mono font-bold bg-[#7C3AED] text-white shadow-md">
                      {tier.badge}
                    </div>
                  )}

                  <div className="space-y-3">
                    <div>
                      <h3 className="text-xl font-bold text-white font-chennai">
                        {tier.name}
                      </h3>
                      <p className="text-xs text-[#988686] mt-0.5">{tier.description}</p>
                    </div>

                    <div className="flex items-baseline gap-1 border-b border-[#27272A]/30 pb-3">
                      <span className="text-3xl font-black text-white font-chennai tracking-tight">
                        {tier.priceDisplay}
                      </span>
                      {tier.pricePeriod && (
                        <span className="text-xs text-[#988686] font-medium">/ {tier.pricePeriod}</span>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-[10px] font-mono font-bold text-[#D1D0D0] uppercase tracking-wider block mb-1">
                        Included Features:
                      </span>
                      {tier.features.map((feat) => (
                        <div key={feat} className="flex items-start gap-2 text-[11px] text-[#988686]">
                          <Check className="w-3.5 h-3.5 text-[#1E8D42] shrink-0 mt-0.5" />
                          <span className="leading-tight">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <a
                      href={tier.ctaLink}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all text-center flex items-center justify-center gap-2 ${
                        tier.highlighted
                          ? 'bg-[#7C3AED] hover:bg-[#8B5CF6] text-white shadow-lg shadow-[#7C3AED]/30'
                          : 'bg-[#121214] hover:bg-[#1E1E22] text-[#D1D0D0] border border-[#27272A]/40'
                      }`}
                    >
                      <Sparkles className="w-4 h-4" />
                      {tier.ctaText}
                    </a>
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
