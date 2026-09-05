import React from 'react';
import { Smartphone, Clock, ShieldCheck, Bell, Sparkles } from 'lucide-react';
import { HoverText } from './HoverText';

export const AndroidShowcase: React.FC = () => {
  return (
    <section className="py-24 bg-[#0B0B0C] border-t border-[#27272A]/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="glass-card p-8 sm:p-12 border border-[#EDD06F]/40 rounded-3xl relative overflow-hidden bg-gradient-to-r from-[#121214] via-[#0B0B0C] to-[#121214]">
          
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#EDD06F]/10 blur-[100px] rounded-full pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            <div className="lg:col-span-8 space-y-5">
              
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#EDD06F]/20 border border-[#EDD06F]/40 text-[#EDD06F] flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  PLANNED ROADMAP / MOBILE COMPANION
                </span>
                <span className="text-xs font-mono text-[#988686]">Android Version</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-chennai">
                <HoverText text="RUKOji for Android" /> <span className="text-[#EDD06F]">(Coming Soon)</span>
              </h2>

              <p className="text-[#988686] text-base leading-relaxed">
                We believe in 100% product honesty. RUKOji is currently available in production for macOS. The Android mobile companion app is actively under architectural design.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-[#0B0B0C] border border-[#27272A]/40 space-y-1">
                  <div className="text-xs font-bold text-white flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#EDD06F]" />
                    Android Accessibility Service
                  </div>
                  <p className="text-xs text-[#988686]">
                    Will monitor active app foreground transitions and short-form video feeds locally on Android devices.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#0B0B0C] border border-[#27272A]/40 space-y-1">
                  <div className="text-xs font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#EDD06F]" />
                    Local VPN Filtering
                  </div>
                  <p className="text-xs text-[#988686]">
                    On-device local loopback VPN for instant domain level blocking without external server routing.
                  </p>
                </div>
              </div>

            </div>

            <div className="lg:col-span-4 p-6 rounded-2xl bg-[#0B0B0C] border border-[#EDD06F]/30 text-center space-y-4 shadow-xl">
              <div className="w-12 h-12 rounded-xl bg-[#EDD06F]/20 border border-[#EDD06F]/40 flex items-center justify-center mx-auto text-[#EDD06F]">
                <Smartphone className="w-6 h-6" />
              </div>

              <div>
                <h4 className="text-base font-bold text-white font-chennai">
                  <HoverText text="Android Beta Waitlist" />
                </h4>
                <p className="text-xs text-[#988686] mt-1">Get notified immediately when the Android APK preview is released.</p>
              </div>

              <div className="space-y-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#121214] border border-[#27272A]/50 text-xs text-white placeholder-[#988686] focus:outline-none focus:border-[#EDD06F]"
                />
                <button className="w-full py-2.5 rounded-lg bg-[#EDD06F] hover:bg-[#D4B856] text-black font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2">
                  <Bell className="w-3.5 h-3.5" />
                  Notify Me for Android Beta
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
