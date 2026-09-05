import React from 'react';
import { Search, Shield, Timer } from 'lucide-react';
import { HoverText } from './HoverText';

export const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-24 bg-[#0B0B0C] border-t border-[#27272A]/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          <div className="glass-card p-8 flex flex-col justify-between space-y-6 relative group hover:border-[#7C3AED] transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-black text-[#7C3AED] font-mono">01</span>
                <div className="p-3 rounded-xl bg-[#7C3AED]/20 border border-[#7C3AED]/40 text-[#7C3AED]">
                  <Search className="w-6 h-6" />
                </div>
              </div>

              <h3 className="text-xl font-bold text-white font-chennai">
                <HoverText text="On-Device Observation" />
              </h3>

              <p className="text-xs text-[#988686] leading-relaxed">
                <strong className="text-[#D1D0D0]">Browser Tab Watcher:</strong> Queries active window titles in Chrome, Safari, Brave, and Edge locally using macOS AppleScript. Evaluates multi-signal risk via Apple NLTagger NLP and Vision ML.
              </p>
            </div>

            <div className="pt-4 border-t border-[#27272A]/30 text-[11px] font-mono text-[#1E8D42]">
              100% Local • Zero Keylogging
            </div>
          </div>

          <div className="glass-card p-8 flex flex-col justify-between space-y-6 relative group hover:border-[#7C3AED] transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-black text-[#7C3AED] font-mono">02</span>
                <div className="p-3 rounded-xl bg-[#7C3AED]/20 border border-[#7C3AED]/40 text-[#7C3AED]">
                  <Shield className="w-6 h-6" />
                </div>
              </div>

              <h3 className="text-xl font-bold text-white font-chennai">
                <HoverText text="Empathetic Floating Pause" />
              </h3>

              <p className="text-xs text-[#988686] leading-relaxed">
                <strong className="text-[#D1D0D0]">Floating NSPanel:</strong> Immediately launches a floating window overlay hovering at .screenSaver level. Displays custom stickers (Gandhi, Dog Meme), Hinglish messages ("Beta, ruk ja ❤️"), and audio sounds.
              </p>
            </div>

            <div className="pt-4 border-t border-[#27272A]/30 text-[11px] font-mono text-[#7C3AED]">
              Empathetic • Custom Stickers & Audio
            </div>
          </div>

          <div className="glass-card p-8 flex flex-col justify-between space-y-6 relative group hover:border-[#7C3AED] transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-black text-[#7C3AED] font-mono">03</span>
                <div className="p-3 rounded-xl bg-[#7C3AED]/20 border border-[#7C3AED]/40 text-[#7C3AED]">
                  <Timer className="w-6 h-6" />
                </div>
              </div>

              <h3 className="text-xl font-bold text-white font-chennai">
                <HoverText text="Cooldown & Timed App Lock" />
              </h3>

              <p className="text-xs text-[#988686] leading-relaxed">
                <strong className="text-[#D1D0D0]">Persistent Lock Engine:</strong> Enforces a voluntary cooldown timer or repeated attempt lockout. Persists via protection_lock.json so protection cannot be stopped until 00:00.
              </p>
            </div>

            <div className="pt-4 border-t border-[#27272A]/30 text-[11px] font-mono text-[#EDD06F]">
              Persistent Lock • Resets at 00:00
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
