import React from 'react';
import { Download, ArrowRight, Laptop, Smartphone, ShieldCheck } from 'lucide-react';
import { productConfig } from '../config/product.config';
import { RealRukojiAppWindow } from './RealRukojiAppWindow';
import { ParticleText } from './ParticleText';
import { HoverText } from './HoverText';
import { ShapeGrid } from './ShapeGrid';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden bg-[#0B0B0C] purple-glow-radial">
      <ShapeGrid gridSize={40} speed={0.5} />

      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#7C3AED]/15 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex justify-center mb-2 sm:mb-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-[#121214] border border-[#27272A]/40 text-[#D1D0D0] shadow-lg">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1E8D42] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1E8D42]"></span>
            </span>
            <span className="font-semibold text-white">RUKOji v4.0 Released</span>
            <span className="text-[#988686]">•</span>
            <span className="text-[#988686]">100% On-Device AI Focus System</span>
          </div>
        </div>

        <div className="text-center max-w-4xl mx-auto space-y-2 sm:space-y-3">
          <h1 className="sr-only">Pause before you scroll.</h1>
          <ParticleText />

          <div className="flex justify-center pt-0">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-[#121214] border border-[#7C3AED]/40 text-[#D1D0D0] shadow-md">
              <ShieldCheck className="w-4 h-4 text-[#7C3AED]" />
              <span className="text-white">Adult Website Blocking</span>
              <span className="px-2 py-0.5 rounded bg-[#7C3AED]/20 text-[#7C3AED] font-mono text-[10px] font-bold tracking-wider">ACTIVE</span>
            </div>
          </div>

          <p className="text-lg sm:text-xl text-[#988686] max-w-3xl mx-auto font-normal leading-relaxed">
            {productConfig.subtagline}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href="#download"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 py-3.5 rounded-xl text-sm font-bold bg-[#7C3AED] hover:bg-[#8B5CF6] text-white shadow-xl shadow-[#7C3AED]/30 transition-all hover:scale-[1.02] active:scale-[0.98] border border-white/20"
            >
              <Download className="w-4 h-4" />
              Get RUKOji for macOS
            </a>

            <a
              href="#showcase"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold bg-[#121214] hover:bg-[#1E1E22] text-[#D1D0D0] border border-[#27272A]/50 transition-all"
            >
              Explore Product Showcase
              <ArrowRight className="w-4 h-4 text-[#988686]" />
            </a>
          </div>

          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-[#988686]">
            <div className="flex items-center gap-2">
              <Laptop className="w-4 h-4 text-[#1E8D42]" />
              <span className="text-[#D1D0D0] font-semibold">macOS 14.0+</span>
              <span className="px-1.5 py-0.5 rounded bg-[#1E8D42]/20 text-[#1E8D42] font-mono text-[10px] font-bold">PRODUCTION</span>
            </div>

            <div className="flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-[#EDD06F]" />
              <span className="text-[#988686]">Android</span>
              <span className="px-1.5 py-0.5 rounded bg-[#EDD06F]/20 text-[#EDD06F] font-mono text-[10px] font-bold">PLANNED / BETA</span>
            </div>
          </div>
        </div>

        <div id="showcase" className="mt-20 text-center max-w-3xl mx-auto space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#7C3AED]/15 border border-[#7C3AED]/30 text-[#7C3AED]">
            AUTHENTIC APPLICATION SHOWCASE
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-chennai">
            <HoverText text="Explore the real RUKOji interface." />
          </h2>
          <p className="text-[#988686] text-base sm:text-lg">
            Click any option in the application sidebar below to explore every verified native screen from the RUKOji macOS app.
          </p>
        </div>

        <div className="max-w-5xl mx-auto relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#7C3AED]/20 via-transparent to-[#1E8D42]/10 rounded-2xl blur-2xl -z-10"></div>
          <RealRukojiAppWindow
            onTestClick={() => {
              const interventionElem = document.getElementById('intervention');
              if (interventionElem) {
                interventionElem.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          />
        </div>

      </div>
    </section>
  );
};
