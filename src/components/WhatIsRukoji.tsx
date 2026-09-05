import React from 'react';
import { HeartHandshake, Zap, Sparkles } from 'lucide-react';
import { HoverText } from './HoverText';

export const WhatIsRukoji: React.FC = () => {
  return (
    <section className="py-24 bg-[#0B0B0C] border-t border-[#27272A]/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#7C3AED]/15 border border-[#7C3AED]/30 text-[#7C3AED]">
              THE PHILOSOPHY BEHIND RUKOJI
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-chennai leading-tight">
              <HoverText text="Not a cold blocker." /> <br />
              <span className="text-[#7C3AED]">
                <HoverText text="Your digital pause button." hoverColor="hover:text-white" />
              </span>
            </h2>

            <p className="text-[#988686] text-base leading-relaxed">
              Traditional site blockers act like rigid walls: they block a domain silently or present a cold 403 error page. Most users immediately disable them, switch browsers, or use private windows out of frustration.
            </p>

            <p className="text-[#D1D0D0] text-base leading-relaxed font-medium">
              RUKOji takes a fundamentally different, human-centered approach. When distraction or adult content is detected, RUKOji presents a warm, empathetic pause window with custom stickers, Hinglish messages, and calming audio.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-[#121214] border border-[#27272A]/40">
                <div className="p-2 rounded-lg bg-[#7C3AED]/20 text-[#7C3AED]">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">
                    <HoverText text="Empathetic Hinglish Guidance" />
                  </h4>
                  <p className="text-xs text-[#988686] mt-0.5">
                    "Beta, ruk ja ❤️" — Speaks to you like a caring friend or mentor rather than a robotic firewall.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-[#121214] border border-[#27272A]/40">
                <div className="p-2 rounded-lg bg-[#1E8D42]/20 text-[#1E8D42]">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">
                    <HoverText text="Focus Cooldown & Lockout" />
                  </h4>
                  <p className="text-xs text-[#988686] mt-0.5">
                    Enforces voluntary cooldown periods with persistent app locking so your impulse passes completely.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 sm:p-8 space-y-6">
            <h3 className="text-lg font-bold text-white font-chennai text-center border-b border-[#27272A]/30 pb-4">
              <HoverText text="Traditional Blockers vs RUKOji" />
            </h3>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#0B0B0C] border border-[#B73334]/30 space-y-2 opacity-70">
                <div className="flex items-center justify-between text-xs font-bold text-[#B73334]">
                  <span>TRADITIONAL BLOCKER</span>
                  <span>Frustrating & Rigid</span>
                </div>
                <p className="text-xs text-[#988686]">
                  Shows cold "Access Denied" HTTP error. Users immediately override or uninstall out of spite.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-[#7C3AED]/15 border border-[#7C3AED]/50 space-y-2 shadow-lg">
                <div className="flex items-center justify-between text-xs font-bold text-white">
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#7C3AED]" />
                    RUKOji DIGITAL PAUSE
                  </span>
                  <span className="text-[#1E8D42] font-mono">HUMAN & EMPATHETIC</span>
                </div>
                <p className="text-xs text-[#D1D0D0]">
                  Presents relatable stickers (Gandhi, memes), Hinglish quotes, audio chimes, and a voluntary cooldown timer that gives your brain a moment to reset.
                </p>
              </div>
            </div>

            <div className="text-center pt-2">
              <span className="text-xs font-mono text-[#988686]">
                "Jis raaste par tum ja rahe ho, thoda ruk aur soch."
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
