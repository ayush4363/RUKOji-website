import React from 'react';
import { ShieldCheck, Lock, EyeOff, HardDrive, FileJson, ServerOff, CheckCircle2 } from 'lucide-react';
import { HoverText } from './HoverText';

export const PrivacySecurity: React.FC = () => {
  return (
    <section id="privacy" className="py-24 bg-[#0B0B0C] border-t border-[#27272A]/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          
          <div className="glass-card p-6 space-y-3 border border-[#1E8D42]/40">
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-xl bg-[#1E8D42]/20 text-[#1E8D42]">
                <ServerOff className="w-5 h-5" />
              </div>
              <span className="text-xl font-black text-[#1E8D42] font-mono">100%</span>
            </div>
            <h3 className="text-base font-bold text-white font-chennai">
              <HoverText text="Local Processing" />
            </h3>
            <p className="text-xs text-[#988686] leading-relaxed">
              All NLP text taggers, domain matching rules, and confidence scoring run strictly on your local CPU & GPU.
            </p>
          </div>

          <div className="glass-card p-6 space-y-3 border border-[#1E8D42]/40">
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-xl bg-[#1E8D42]/20 text-[#1E8D42]">
                <EyeOff className="w-5 h-5" />
              </div>
              <span className="text-xl font-black text-[#1E8D42] font-mono">0%</span>
            </div>
            <h3 className="text-base font-bold text-white font-chennai">
              <HoverText text="Keystroke Logging" />
            </h3>
            <p className="text-xs text-[#988686] leading-relaxed">
              Zero system-wide keylogging. RUKOji never listens to keypresses outside its own app settings textfields.
            </p>
          </div>

          <div className="glass-card p-6 space-y-3 border border-[#1E8D42]/40">
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-xl bg-[#1E8D42]/20 text-[#1E8D42]">
                <Lock className="w-5 h-5" />
              </div>
              <span className="text-xl font-black text-[#1E8D42] font-mono">0%</span>
            </div>
            <h3 className="text-base font-bold text-white font-chennai">
              <HoverText text="Screen Screenshots" />
            </h3>
            <p className="text-xs text-[#988686] leading-relaxed">
              Zero background desktop screenshot taking or secret screen recording.
            </p>
          </div>

          <div className="glass-card p-6 space-y-3 border border-[#1E8D42]/40">
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-xl bg-[#1E8D42]/20 text-[#1E8D42]">
                <HardDrive className="w-5 h-5" />
              </div>
              <span className="text-xl font-black text-[#1E8D42] font-mono">0%</span>
            </div>
            <h3 className="text-base font-bold text-white font-chennai">
              <HoverText text="Cloud Telemetry" />
            </h3>
            <p className="text-xs text-[#988686] leading-relaxed">
              Zero browser URLs or search queries sent to cloud servers. All analytics remain on your local disk.
            </p>
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
