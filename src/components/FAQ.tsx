import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { HoverText } from './HoverText';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How does RUKOji observe browser tabs without keylogging?",
    answer: "RUKOji queries active frontmost browser window titles in Chrome, Safari, Brave, and Edge using standard macOS AppleScript window automation (`URL of active tab of window 1`). It does not capture raw keyboard inputs system-wide or run background keyloggers."
  },
  {
    question: "Which browsers are currently supported on macOS?",
    answer: "RUKOji natively supports Google Chrome, Apple Safari, Brave Browser, and Microsoft Edge. Browsers that explicitly disable AppleScript window querying cannot report active tab URLs."
  },
  {
    question: "Can I bypass or turn off protection during an active Cooldown or Lockout timer?",
    answer: "No. When voluntary Cooldown or Timed Protection Lock is active, RUKOji persists a lock file (`protection_lock.json`) in Local Application Support. Protection cannot be toggled off and the app cannot be quit until the countdown reaches 00:00."
  },
  {
    question: "Is any of my browsing data sent to cloud servers?",
    answer: "Zero. All NaturalLanguage NLP text classification, Apple Vision frame evaluation, and confidence scoring occur 100% locally on your Mac. RUKOji has 0 cloud telemetry endpoints."
  },
  {
    question: "How does Repeated Attempt Browser Lockout work?",
    answer: "If you repeatedly attempt to access blocked content beyond your configured limit (e.g. 3 attempts), RUKOji automatically closes the active browser application and triggers a dedicated lockout timer (e.g. 5 minutes). At 00:00, the attempt counter automatically resets to 0."
  },
  {
    question: "Is RUKOji available for Android?",
    answer: "The Android companion app is currently in architectural design and planned for beta testing. RUKOji is currently available in production for macOS 14.0+."
  }
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-[#0B0B0C] border-t border-[#27272A]/30 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#7C3AED]/15 border border-[#7C3AED]/30 text-[#7C3AED]">
            FREQUENTLY ASKED QUESTIONS
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-chennai">
            <HoverText text="Technical & Privacy FAQs." />
          </h2>
          <p className="text-[#988686] text-base sm:text-lg">
            Clear, honest answers derived directly from technical boundaries and system architecture.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={faq.question}
              className="glass-card border border-[#27272A]/40 rounded-2xl overflow-hidden transition-all"
            >
              <button
                onClick={() => toggleFAQ(idx)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-white hover:text-[#7C3AED] transition-colors"
              >
                <span className="text-base sm:text-lg font-chennai">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[#7C3AED] shrink-0 transition-transform duration-300 ${
                    openIndex === idx ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openIndex === idx && (
                <div className="px-6 pb-6 text-sm text-[#988686] leading-relaxed border-t border-[#27272A]/20 pt-4 animate-in fade-in duration-200">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
