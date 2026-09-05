import React from 'react';
import { Laptop, Smartphone } from 'lucide-react';
import { productConfig } from '../config/product.config';
import { SpecularRukoji } from './SpecularRukoji';

export const Footer: React.FC = () => {
  const scrollToSection = (id: string) => {
    if (!id) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#0B0B0C] border-t border-[#27272A]/30 py-16 text-xs text-[#988686]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center">
              <button onClick={() => scrollToSection('')} className="bg-transparent border-0 p-0 text-left focus:outline-none">
                <SpecularRukoji textSize="text-xl" />
              </button>
            </div>

            <p className="text-xs text-[#988686] max-w-sm leading-relaxed">
              {productConfig.subtagline}
            </p>

            <div className="flex items-center gap-4 text-[11px] font-mono text-[#D1D0D0]">
              <div className="flex items-center gap-1.5">
                <Laptop className="w-3.5 h-3.5 text-[#1E8D42]" />
                <span>macOS v4.0 (Production)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5 text-[#EDD06F]" />
                <span>Android (Planned)</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2">
              <li><button onClick={() => scrollToSection('showcase')} className="hover:text-[#7C3AED] transition-colors text-left focus:outline-none">Showcase</button></li>
              <li><button onClick={() => scrollToSection('features')} className="hover:text-[#7C3AED] transition-colors text-left focus:outline-none">Verified Features</button></li>
              <li><button onClick={() => scrollToSection('how-it-works')} className="hover:text-[#7C3AED] transition-colors text-left focus:outline-none">How It Works</button></li>
              <li><button onClick={() => scrollToSection('intervention')} className="hover:text-[#7C3AED] transition-colors text-left focus:outline-none">Intervention Experience</button></li>
              <li><button onClick={() => scrollToSection('privacy')} className="hover:text-[#7C3AED] transition-colors text-left focus:outline-none">Privacy Audit</button></li>
              <li><button onClick={() => scrollToSection('pricing')} className="hover:text-[#7C3AED] transition-colors text-left focus:outline-none">Pricing Config</button></li>
              <li><button onClick={() => scrollToSection('faq')} className="hover:text-[#7C3AED] transition-colors text-left focus:outline-none">Technical FAQ</button></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Privacy Stance</h4>
            <p className="text-xs text-[#988686] leading-relaxed">
              RUKOji operates on a strict 100% local processing commitment. Zero keylogging, zero continuous background screenshots, zero cloud telemetry uploads.
            </p>
            <div className="pt-2 text-[11px] font-mono text-[#1E8D42]">
              ✓ Verified Codebase Stance
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-[#27272A]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <div>
            © {new Date().getFullYear()} RUKOji. All rights reserved. Version {productConfig.version} (Build {productConfig.buildNumber}).
          </div>

          <div className="flex items-center gap-4 text-[#988686]">
            <span>100% Local On-Device AI</span>
            <span>•</span>
            <span>Zero Telemetry</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
