import React from 'react';
import { Laptop, Cpu, ShieldCheck, Zap, Command } from 'lucide-react';
import { HoverText } from './HoverText';

export const MacOSShowcase: React.FC = () => {
  return (
    <section className="py-24 bg-[#0B0B0C] border-t border-[#27272A]/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#1E8D42]/15 border border-[#1E8D42]/30 text-[#1E8D42]">
              NATIVE macOS 14.0+ ENGINE
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-chennai leading-tight">
              <HoverText text="Built natively for Apple Silicon & macOS." />
            </h2>

            <p className="text-[#988686] text-base leading-relaxed">
              RUKOji is not an Electron web wrapper or heavy cross-platform shell. It is a 100% native Swift 6.0 application built with Apple's modern frameworks.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#121214] border border-[#27272A]/40 space-y-1.5">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <Command className="w-4 h-4 text-[#7C3AED]" />
                  <HoverText text="Floating NSPanel" />
                </div>
                <p className="text-xs text-[#988686]">
                  System overlay hovering at .screenSaver level across all desktop spaces.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#121214] border border-[#27272A]/40 space-y-1.5">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <Cpu className="w-4 h-4 text-[#1E8D42]" />
                  <HoverText text="Apple Vision Core ML" />
                </div>
                <p className="text-xs text-[#988686]">
                  On-device frame risk classification using native Vision framework.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#121214] border border-[#27272A]/40 space-y-1.5">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <ShieldCheck className="w-4 h-4 text-[#EDD06F]" />
                  <HoverText text="AppleScript Tab Watcher" />
                </div>
                <p className="text-xs text-[#988686]">
                  Monitors active tab URLs in Safari, Chrome, Brave & Edge without keylogging.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#121214] border border-[#27272A]/40 space-y-1.5">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <Zap className="w-4 h-4 text-[#7C3AED]" />
                  <HoverText text="Launch at Login" />
                </div>
                <p className="text-xs text-[#988686]">
                  Native SMAppService auto-launch ensuring continuous background protection.
                </p>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 sm:p-8 space-y-6 border border-[#27272A]/50">
            <div className="flex items-center justify-between border-b border-[#27272A]/30 pb-4">
              <div className="flex items-center gap-3">
                <Laptop className="w-6 h-6 text-[#7C3AED]" />
                <div>
                  <h3 className="text-lg font-bold text-white font-chennai">
                    <HoverText text="macOS Architecture Specs" />
                  </h3>
                  <p className="text-xs text-[#988686]">Zero third-party dependencies. 100% Native Apple frameworks.</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded bg-[#1E8D42]/20 text-[#1E8D42] font-mono text-xs font-bold">
                SWIFT 6.0
              </span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between p-3 rounded-lg bg-[#0B0B0C] border border-[#27272A]/30">
                <span className="text-[#988686]">Swift Tools Version:</span>
                <span className="text-white font-bold">swift-tools-version: 6.0</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-[#0B0B0C] border border-[#27272A]/30">
                <span className="text-[#988686]">Target Platform:</span>
                <span className="text-white font-bold">macOS 14.0+ (Sonoma/Sequoia)</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-[#0B0B0C] border border-[#27272A]/30">
                <span className="text-[#988686]">UI System:</span>
                <span className="text-white font-bold">SwiftUI + Glassmorphism</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-[#0B0B0C] border border-[#27272A]/30">
                <span className="text-[#988686]">Supported Browsers:</span>
                <span className="text-[#7C3AED] font-bold">Chrome, Safari, Brave, Edge</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-[#0B0B0C] border border-[#27272A]/30">
                <span className="text-[#988686]">3D Guardian Engine:</span>
                <span className="text-white font-bold">SceneKit (SCNView / SCNScene)</span>
              </div>
            </div>

            <div className="pt-2 text-center">
              <span className="text-[11px] text-[#988686]">
                Global Keybindings: <kbd className="px-1.5 py-0.5 rounded bg-[#121214] text-white border border-[#27272A]/40 font-mono">⌘ + Shift + R</kbd> toggle window | <kbd className="px-1.5 py-0.5 rounded bg-[#121214] text-white border border-[#27272A]/40 font-mono">⌘ + Shift + P</kbd> toggle protection
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
