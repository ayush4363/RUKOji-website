import React from 'react';
import { Download, Sparkles, Laptop } from 'lucide-react';
import { productConfig } from '../config/product.config';
import { HoverText } from './HoverText';

export const FinalCTA: React.FC = () => {
  return (
    <section id="download" className="py-24 bg-[#0B0B0C] border-t border-[#27272A]/30 relative overflow-hidden">
      
      <div className="absolute inset-0 bg-gradient-to-t from-[#7C3AED]/20 via-transparent to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="glass-card p-10 sm:p-16 border-2 border-[#7C3AED]/50 rounded-3xl text-center space-y-8 max-w-5xl mx-auto shadow-2xl bg-gradient-to-b from-[#121214] to-[#0B0B0C]">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-bold bg-[#7C3AED]/20 border border-[#7C3AED]/40 text-white">
            <Sparkles className="w-3.5 h-3.5 text-[#7C3AED]" />
            RECLAIM YOUR FOCUS TODAY
          </div>

          <h2 className="text-4xl sm:text-6xl font-black text-white font-chennai tracking-tight leading-tight">
            <HoverText text="Ready to give yourself" /> <br className="hidden sm:inline" />
            <HoverText text="a moment to pause?" />
          </h2>

          <p className="text-base sm:text-xl text-[#988686] max-w-2xl mx-auto font-normal">
            Download RUKOji v4.0 for macOS. 100% On-Device AI protection with zero keylogging and zero cloud uploads.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                alert(`Starting download for ${productConfig.dmgFileName} (macOS v4.0.0)...`);
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-base font-extrabold bg-[#7C3AED] hover:bg-[#8B5CF6] text-white shadow-2xl shadow-[#7C3AED]/40 transition-all hover:scale-105 border border-white/20"
            >
              <Download className="w-5 h-5" />
              Download RUKOji for Mac (v4.0)
            </a>
          </div>

          <div className="pt-4 flex items-center justify-center gap-6 text-xs text-[#988686] font-mono">
            <span className="flex items-center gap-1.5">
              <Laptop className="w-3.5 h-3.5 text-[#1E8D42]" />
              macOS 14.0+ Native
            </span>
            <span>•</span>
            <span>Zero Cloud Telemetry</span>
            <span>•</span>
            <span>100% Free Launch Version</span>
          </div>

        </div>

      </div>
    </section>
  );
};
