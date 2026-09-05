import React from 'react';
import { featuresConfig } from '../config/features.config';
import { Shield, Video, Brain, Timer, Lock, Sparkles, MessageSquare, Volume2, EyeOff, Smartphone, CheckCircle2 } from 'lucide-react';
import { HoverText } from './HoverText';

const iconMap: Record<string, React.ReactNode> = {
  Shield: <Shield className="w-5 h-5 text-[#7C3AED]" />,
  Video: <Video className="w-5 h-5 text-[#7C3AED]" />,
  Brain: <Brain className="w-5 h-5 text-[#1E8D42]" />,
  Timer: <Timer className="w-5 h-5 text-[#EDD06F]" />,
  Lock: <Lock className="w-5 h-5 text-[#B73334]" />,
  Sparkles: <Sparkles className="w-5 h-5 text-[#7C3AED]" />,
  MessageSquare: <MessageSquare className="w-5 h-5 text-[#7C3AED]" />,
  Volume2: <Volume2 className="w-5 h-5 text-[#7C3AED]" />,
  EyeOff: <EyeOff className="w-5 h-5 text-[#1E8D42]" />,
  Smartphone: <Smartphone className="w-5 h-5 text-[#EDD06F]" />,
};

export const CoreFeatures: React.FC = () => {
  const duplicatedFeatures = [...featuresConfig, ...featuresConfig];

  return (
    <section id="features" className="py-24 bg-[#0B0B0C] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#7C3AED]/15 border border-[#7C3AED]/30 text-[#7C3AED]">
            VERIFIED FEATURE INVENTORY
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-chennai">
            <HoverText text="Engineered for genuine digital focus." />
          </h2>
          <p className="text-[#988686] text-base sm:text-lg">
            Every feature below is derived directly from the analyzed RUKOji v4.0 codebase.
          </p>
        </div>

      </div>

      <div className="marquee-container relative w-full overflow-hidden py-4 group">
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-16 sm:w-28 bg-gradient-to-r from-[#0B0B0C] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-16 sm:w-28 bg-gradient-to-l from-[#0B0B0C] to-transparent" />

        <div className="animate-marquee flex gap-6 w-max group-hover:[animation-play-state:paused]">
          {duplicatedFeatures.map((feature, idx) => (
            <div
              key={`${feature.id}-${idx}`}
              className={`w-[320px] sm:w-[360px] shrink-0 glass-card p-6 flex flex-col justify-between space-y-4 border ${
                feature.category === 'planned' ? 'border-[#EDD06F]/40 bg-[#121214]/40' : 'border-[#27272A]/40'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-[#121214] border border-[#27272A]/40">
                    {iconMap[feature.iconName] || <Shield className="w-5 h-5 text-[#7C3AED]" />}
                  </div>

                  <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border ${
                    feature.category === 'planned'
                      ? 'bg-[#EDD06F]/10 border-[#EDD06F]/30 text-[#EDD06F]'
                      : 'bg-[#1E8D42]/10 border-[#1E8D42]/30 text-[#1E8D42]'
                  }`}>
                    {feature.statusText}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white font-chennai">
                  <HoverText text={feature.title} />
                </h3>

                <p className="text-xs text-[#988686] leading-relaxed">
                  {feature.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#27272A]/30 text-xs text-[#D1D0D0] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#7C3AED] shrink-0" />
                <span className="font-medium">{feature.benefit}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};
