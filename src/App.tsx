import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WhatIsRukoji } from './components/WhatIsRukoji';
import { CoreFeatures } from './components/CoreFeatures';
import { HowItWorks } from './components/HowItWorks';
import { SignatureIntervention } from './components/SignatureIntervention';
import { MacOSShowcase } from './components/MacOSShowcase';
import { AndroidShowcase } from './components/AndroidShowcase';
import { PrivacySecurity } from './components/PrivacySecurity';
import { ActivityInsights } from './components/ActivityInsights';
import { Pricing } from './components/Pricing';
import { FAQ } from './components/FAQ';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { FluidTextCursor } from './components/FluidTextCursor';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0B0B0C] text-[#D1D0D0] selection:bg-[#7C3AED] selection:text-white">
      <FluidTextCursor />

      <Navbar />

      <main>
        <Hero />
        <WhatIsRukoji />
        <CoreFeatures />
        <HowItWorks />
        <SignatureIntervention />
        <MacOSShowcase />
        <AndroidShowcase />
        <PrivacySecurity />
        <ActivityInsights />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>

      <Footer />
    </div>
  );
};

export default App;
