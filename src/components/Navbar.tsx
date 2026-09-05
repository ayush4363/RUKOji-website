import React, { useState, useEffect } from 'react';
import { Download, Menu, X } from 'lucide-react';
import { SpecularRukoji } from './SpecularRukoji';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-[#0B0B0C]/90 backdrop-blur-md py-3 shadow-2xl' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        <button onClick={() => scrollToSection('')} className="inline-block text-left bg-transparent border-0 p-0 focus:outline-none">
          <SpecularRukoji />
        </button>

        <nav className="hidden md:flex items-center gap-6 lg:gap-7 text-[15.5px] font-semibold font-chennai text-[#988686]">
          <button onClick={() => scrollToSection('showcase')} className="hover:text-[#7C3AED] transition-colors focus:outline-none">Showcase</button>
          <button onClick={() => scrollToSection('features')} className="hover:text-[#7C3AED] transition-colors focus:outline-none">Features</button>
          <button onClick={() => scrollToSection('how-it-works')} className="hover:text-[#7C3AED] transition-colors focus:outline-none">How It Works</button>
          <button onClick={() => scrollToSection('intervention')} className="hover:text-[#7C3AED] transition-colors focus:outline-none">Intervention</button>
          <button onClick={() => scrollToSection('privacy')} className="hover:text-[#7C3AED] transition-colors focus:outline-none">Privacy Stance</button>
          <button onClick={() => scrollToSection('pricing')} className="hover:text-[#7C3AED] transition-colors focus:outline-none">Pricing</button>
          <button onClick={() => scrollToSection('faq')} className="hover:text-[#7C3AED] transition-colors focus:outline-none">FAQ</button>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => scrollToSection('download')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold bg-[#7C3AED] hover:bg-[#8B5CF6] text-white shadow-lg shadow-[#7C3AED]/25 transition-all hover:scale-[1.02] active:scale-[0.98] border border-white/10 focus:outline-none"
          >
            <Download className="w-3.5 h-3.5" />
            Get RUKOji for Mac
          </button>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg bg-[#121214] border border-[#27272A]/40 text-[#D1D0D0]"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-[#121214]/95 backdrop-blur-xl border-b border-[#27272A]/40 px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col space-y-3 text-base font-medium font-chennai text-[#988686]">
            <button onClick={() => scrollToSection('showcase')} className="text-left hover:text-[#D1D0D0]">Showcase</button>
            <button onClick={() => scrollToSection('features')} className="text-left hover:text-[#D1D0D0]">Features</button>
            <button onClick={() => scrollToSection('how-it-works')} className="text-left hover:text-[#D1D0D0]">How It Works</button>
            <button onClick={() => scrollToSection('intervention')} className="text-left hover:text-[#D1D0D0]">Intervention Experience</button>
            <button onClick={() => scrollToSection('privacy')} className="text-left hover:text-[#D1D0D0]">Privacy Stance</button>
            <button onClick={() => scrollToSection('pricing')} className="text-left hover:text-[#D1D0D0]">Pricing</button>
            <button onClick={() => scrollToSection('faq')} className="text-left hover:text-[#D1D0D0]">FAQ</button>
          </nav>

          <div className="pt-2 border-t border-[#27272A]/30 flex flex-col gap-3">
            <button
              onClick={() => scrollToSection('download')}
              className="w-full text-center py-2.5 rounded-lg text-xs font-bold bg-[#7C3AED] text-white flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download RUKOji for Mac
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
