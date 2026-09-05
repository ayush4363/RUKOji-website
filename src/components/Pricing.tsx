import React from 'react';
import { pricingConfig } from '../config/pricing.config';
import { Check, Sparkles, AlertCircle } from 'lucide-react';
import { HoverText } from './HoverText';

export const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="py-24 bg-[#0B0B0C] border-t border-[#27272A]/30 relative">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
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

      </div>
    </section>
  );
};
