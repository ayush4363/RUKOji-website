import React, { useState, useEffect } from 'react';
import { playSoundCue, stopCurrentSound } from '../../utils/soundPlayer';
import { interventionConfig, PresetSound } from '../../config/intervention.config';
import {
  Lock,
  Brain,
  Sparkles,
  Volume2,
  ShieldCheck,
  Activity,
  Play,
  StopCircle,
  CheckCircle2,
  AlertTriangle,
  Eye,
  EyeOff,
  Trash2,
  Plus,
  Globe,
  Moon,
  Sun,
  Laptop,
  Copy,
  Check,
  Hand,
  PlaySquare,
  ChevronRight
} from 'lucide-react';

interface VirtualAppScreensProps {
  activeTab: string;
  onNavigateTab: (tab: string) => void;
  onTriggerTestIntervention?: () => void;
}

export const VirtualAppScreens: React.FC<VirtualAppScreensProps> = ({
  activeTab,
  onNavigateTab,
  onTriggerTestIntervention
}) => {
  const [isProtectionEnabled, setIsProtectionEnabled] = useState(true);
  const [isShortsBlockingEnabled, setIsShortsBlockingEnabled] = useState(true);
  const [selectedProtectionMode, setSelectedProtectionMode] = useState('Standard Pause');
  const [isMaxPrivacyModeEnabled, setIsMaxPrivacyModeEnabled] = useState(false);
  const [activeStickerId, setActiveStickerId] = useState('gandhi');
  const [activeMessageId, setActiveMessageId] = useState('hinglish');
  const [activeSoundId, setActiveSoundId] = useState('gandhi_audio');
  const [soundVolume, setSoundVolume] = useState(1.0);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [currentlyPlayingAudio, setCurrentlyPlayingAudio] = useState<string | null>(null);

  const [cooldownMinutes, setCooldownMinutes] = useState(10);
  const [cooldownSeconds, setCooldownSeconds] = useState(0);
  const [isCooldownActive, setIsCooldownActive] = useState(false);
  const [remainingCooldownSec, setRemainingCooldownSec] = useState(600);
  const [isTimedLockActive] = useState(true);

  const [testInput, setTestInput] = useState('');
  const [testResult, setTestResult] = useState<{
    classification: 'EXPLICIT' | 'SAFE' | 'SENSITIVE';
    confidence: number;
    riskScore: number;
    category: string;
    rationale: string;
    signals: string[];
    matchedRule?: string;
  } | null>(null);
  const [customRules, setCustomRules] = useState([
    { pattern: 'pornhub.com', category: 'Adult' },
    { pattern: 'xvideos.com', category: 'Adult' },
    { pattern: 'casino.com', category: 'Gambling' },
    { pattern: 'bet365.com', category: 'Gambling' },
    { pattern: 'instagram.com/reels', category: 'Shorts & Reels' },
    { pattern: 'youtube.com/shorts', category: 'Shorts & Reels' }
  ]);
  const [newRulePattern, setNewRulePattern] = useState('');
  const [newRuleCategory, setNewRuleCategory] = useState('Custom');
  const [hideActiveRules, setHideActiveRules] = useState(true);

  const [isLogCopied, setIsLogCopied] = useState(false);

  const [settingsSection, setSettingsSection] = useState<'general' | 'appearance' | 'privacy' | 'permissions'>('general');
  const [themeMode, setThemeMode] = useState<'dark' | 'light' | 'auto'>('dark');

  useEffect(() => {
    let interval: any = null;
    if (isCooldownActive && remainingCooldownSec > 0) {
      interval = setInterval(() => {
        setRemainingCooldownSec(prev => {
          if (prev <= 1) {
            setIsCooldownActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCooldownActive, remainingCooldownSec]);

  const evaluateInput = (query: string) => {
    const text = query.trim().toLowerCase();
    if (!text) return;

    if (text.includes('porn') || text.includes('adult') || text.includes('nsfw') || text.includes('xvideo') || text.includes('sex')) {
      setTestResult({
        classification: 'EXPLICIT',
        confidence: 0.98,
        riskScore: 0.95,
        category: 'Adult / Explicit Content',
        rationale: 'Local NLTagger NLP & Domain Engine identified high-confidence adult material.',
        signals: [
          '• DomainSignal: Domain matches known adult blacklists',
          '• TextClassifier: Explicit natural language keyword detected (score: 0.98)',
          '• ContextEngine: 0% False Positive Reducer match (Non-educational)'
        ],
        matchedRule: text.includes('pornhub') ? 'pornhub.com' : 'adult_keyword_rule'
      });
    } else if (text.includes('betting') || text.includes('casino') || text.includes('gamble') || text.includes('poker')) {
      setTestResult({
        classification: 'EXPLICIT',
        confidence: 0.92,
        riskScore: 0.88,
        category: 'Online Gambling',
        rationale: 'Domain & Keyword Engine identified online betting/gambling platform.',
        signals: [
          '• DomainSignal: Gambling classification matched',
          '• TextClassifier: Financial betting intent detected'
        ],
        matchedRule: 'casino.com'
      });
    } else if (text.includes('anatomy') || text.includes('reproductive') || text.includes('clinical') || text.includes('treatment') || text.includes('health')) {
      setTestResult({
        classification: 'SAFE',
        confidence: 0.96,
        riskScore: 0.08,
        category: 'Educational / Medical Reference',
        rationale: 'Contextual False-Positive Reducer active: Suppressed trigger for legitimate biological/medical context.',
        signals: [
          '• FalsePositiveReducer: Educational medical intent detected (+0.95 confidence)',
          '• TextClassifier: Biological terminology matched safe domain pattern'
        ]
      });
    } else {
      setTestResult({
        classification: 'SAFE',
        confidence: 0.99,
        riskScore: 0.02,
        category: 'Safe Web Content',
        rationale: 'Verified safe domain / non-restricted text.',
        signals: [
          '• DomainSignal: Trusted domain / clean keyword',
          '• VisionClassifier: Neutral frame buffer'
        ]
      });
    }
  };

  const formattedTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  switch (activeTab) {

    case 'Home':
      return (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          <div className="text-center space-y-1 pt-2">
            <h2 className="text-3xl font-bold text-white font-rounded flex items-center justify-center gap-1">
              <span>RUKO</span>
              <span className="text-[#7C3AED]">ji</span>
            </h2>
            <p className="text-sm font-medium text-[#988686]">Your digital pause button.</p>
          </div>

          
          <div className="max-w-xl mx-auto p-6 rounded-2xl bg-[#121214]/60 border border-[#27272A]/40 text-center space-y-5 shadow-2xl">
            <div className="relative w-48 h-40 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#7C3AED]/20 to-cyan-500/10 blur-xl"></div>
              
              <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-white to-gray-300 shadow-[0_0_35px_rgba(124,58,237,0.5)] border border-white/40 flex items-center justify-center animate-pulse">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#7C3AED] to-purple-400 opacity-20"></div>
                <div className="absolute -inset-4 rounded-full border border-cyan-400/40 rotate-45 transform scale-110"></div>
                <div className="absolute w-2.5 h-2.5 rounded-full bg-white top-0 right-4 shadow-[0_0_10px_#fff]"></div>
                <div className="absolute w-2 h-2 rounded-full bg-white bottom-2 left-3 shadow-[0_0_10px_#fff]"></div>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 text-sm font-mono font-bold text-white">
                <span className="w-2 h-2 rounded-full bg-[#7C3AED] animate-ping"></span>
                <span>• RUKOJI COOLDOWN</span>
              </div>
              <p className="text-xs text-[#988686] max-w-xs mx-auto">
                Give yourself a little time to reflect.
              </p>
            </div>

            
            <div className="space-y-2 pt-2">
              <button
                disabled={isCooldownActive || isTimedLockActive}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#B73334] text-white font-bold text-sm shadow-lg flex items-center justify-center gap-2.5 mx-auto border border-white/20 hover:bg-[#DC2626] transition-all disabled:opacity-90 disabled:cursor-not-allowed"
              >
                <Lock className="w-4 h-4 text-white" />
                <span>PROTECTION LOCKED ON</span>
              </button>

              <p className="text-xs font-semibold text-[#B73334] flex items-center justify-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#B73334]" />
                <span>Protection cannot be turned off during active timer lock</span>
              </p>
            </div>
          </div>

          
          <div className="max-w-xl mx-auto p-4 rounded-xl bg-[#121214]/40 border border-[#27272A]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-left">
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#7C3AED]" />
                <span>Demo Intervention Test</span>
              </div>
              <p className="text-xs text-[#988686]">
                Simulate a blocked content detection event to test sticker, sound & Hinglish pause intervention.
              </p>
            </div>

            <button
              onClick={() => {
                if (onTriggerTestIntervention) {
                  onTriggerTestIntervention();
                } else {
                  onNavigateTab('Protection');
                }
              }}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-xs shadow-lg shadow-[#7C3AED]/25 flex items-center justify-center gap-2 whitespace-nowrap transition-all"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>TEST RUKOji</span>
            </button>
          </div>
        </div>
      );

    case 'Protection':
      return (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          <div className="space-y-1">
            <div className="text-xs font-bold font-mono text-[#7C3AED]">PROTECTION</div>
            <h2 className="text-2xl font-bold text-white font-rounded">Pause Protection Settings</h2>
            <p className="text-xs text-[#988686]">Configure your guardian behavior and test interventions.</p>
          </div>

          
          <div className="p-5 rounded-2xl bg-[#121214]/50 border border-[#27272A]/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className={`w-3 h-3 rounded-full ${isProtectionEnabled ? 'bg-[#1E8D42]' : 'bg-[#B73334]'}`}></span>
              <div>
                <div className="text-xs text-[#988686]">Protection Status</div>
                <div className="text-base font-bold font-mono text-white">
                  {isProtectionEnabled ? 'ACTIVE & MONITORING' : 'PAUSED'}
                </div>
              </div>
            </div>

            <button
              disabled={isCooldownActive || isTimedLockActive}
              onClick={() => setIsProtectionEnabled(!isProtectionEnabled)}
              className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-1 shrink-0 ${
                isProtectionEnabled ? 'bg-[#1E8D42]' : 'bg-[#3F3F46]'
              } ${isCooldownActive || isTimedLockActive ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <span className={`w-4 h-4 rounded-full bg-white transition-transform ${isProtectionEnabled ? 'translate-x-5' : 'translate-x-0'}`}></span>
            </button>
          </div>

          
          <div className="p-5 rounded-2xl bg-[#121214]/50 border border-[#27272A]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex gap-3.5 items-start">
              <PlaySquare className="w-6 h-6 text-[#7C3AED] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-sm font-bold text-white font-rounded">Block Short-Form Video Content</h3>
                  {isShortsBlockingEnabled && (isCooldownActive || isTimedLockActive) && (
                    <span className="px-2 py-0.5 rounded bg-[#B73334]/20 text-[#B73334] font-mono text-[9px] font-bold">
                      LOCKED DURING COOLDOWN
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#988686] leading-relaxed">
                  Block YouTube Shorts, Instagram Reels, TikTok, Snapchat Spotlight & Facebook Reels on any platform. Option cannot be turned off while Cooldown is active.
                </p>
              </div>
            </div>

            <button
              disabled={isShortsBlockingEnabled && (isCooldownActive || isTimedLockActive)}
              onClick={() => setIsShortsBlockingEnabled(!isShortsBlockingEnabled)}
              className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-1 shrink-0 ${
                isShortsBlockingEnabled ? 'bg-[#7C3AED]' : 'bg-[#3F3F46]'
              }`}
            >
              <span className={`w-4 h-4 rounded-full bg-white transition-transform ${isShortsBlockingEnabled ? 'translate-x-5' : 'translate-x-0'}`}></span>
            </button>
          </div>

          
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white font-rounded">Protection Mode</h3>
            <p className="text-xs text-[#988686]">Choose how strictly RUKOji interrupts unwanted digital browsing.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {[
                { title: 'Standard Pause', desc: 'Gentle pause popup with sticker, Hinglish message & sound chime.' },
                { title: 'Deep Reflection', desc: 'Pause overlay + mandatory 30-second mindfulness cooldown timer.' },
                { title: 'Zero Distraction', desc: 'Strict block without bypass options during active focus windows.' },
                { title: 'Focus Lockdown', desc: 'Complete browser application lockout upon repeated attempts.' }
              ].map(mode => (
                <div
                  key={mode.title}
                  onClick={() => setSelectedProtectionMode(mode.title)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer space-y-1.5 ${
                    selectedProtectionMode === mode.title
                      ? 'bg-[#7C3AED]/15 border-[#7C3AED]'
                      : 'bg-[#121214]/40 border-[#27272A]/30 hover:border-[#27272A]/60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{mode.title}</span>
                    {selectedProtectionMode === mode.title && (
                      <CheckCircle2 className="w-4 h-4 text-[#7C3AED]" />
                    )}
                  </div>
                  <p className="text-[11px] text-[#988686]">{mode.desc}</p>
                </div>
              ))}
            </div>
          </div>

          
          <div className="p-5 rounded-2xl bg-[#121214]/50 border border-[#EDD06F]/30 space-y-3">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-[#EDD06F]" />
              <div>
                <h3 className="text-sm font-bold text-white font-rounded">Test Protection Intervention</h3>
                <p className="text-xs text-[#988686]">Demonstrate full pause intervention (Sticker + Message + Sound + Cooldown).</p>
              </div>
            </div>

            <div className="pt-2 border-t border-[#27272A]/30 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-[10px] font-mono text-[#988686]">Simulates: 'Potentially unwanted content detected'</span>
              <button
                onClick={() => onNavigateTab('Stickers')}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg"
              >
                <span>Test Protection Now</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      );

    case 'AI Center':
      return (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="text-xs font-bold font-mono text-[#7C3AED]">AI DASHBOARD</div>
              <h2 className="text-2xl font-bold text-white font-rounded">On-Device AI Engine & Diagnostics</h2>
              <p className="text-xs text-[#988686]">Real-time multi-signal classification, system health matrix, and privacy controls.</p>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#121214] border border-[#27272A]/30 shrink-0">
              <Hand className="w-3.5 h-3.5 text-[#7C3AED]" />
              <span className="text-xs text-white font-semibold">Max Privacy Mode</span>
              <button
                onClick={() => setIsMaxPrivacyModeEnabled(!isMaxPrivacyModeEnabled)}
                className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-1 shrink-0 ${
                  isMaxPrivacyModeEnabled ? 'bg-[#7C3AED]' : 'bg-[#3F3F46]'
                }`}
              >
                <span className={`w-4 h-4 rounded-full bg-white transition-transform ${isMaxPrivacyModeEnabled ? 'translate-x-5' : 'translate-x-0'}`}></span>
              </button>
            </div>
          </div>

          
          <div className="p-6 rounded-2xl bg-[#121214]/60 border border-[#27272A]/40 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            
            <div className="relative h-40 rounded-xl bg-[#0B0B0C] border border-[#27272A]/30 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#7C3AED]/20 via-transparent to-cyan-500/10"></div>
              <div className="w-24 h-24 rounded-full border border-[#7C3AED]/50 flex items-center justify-center animate-spin">
                <div className="w-16 h-16 rounded-full border border-cyan-400/40"></div>
              </div>
              <Brain className="w-8 h-8 text-[#7C3AED] absolute" />
            </div>

            <div className="md:col-span-2 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#1E8D42] font-mono">
                <span className="w-2 h-2 rounded-full bg-[#1E8D42]"></span>
                <span>AI ENGINE: ACTIVE (ON-DEVICE)</span>
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between py-1 border-b border-[#27272A]/20">
                  <span className="text-[#988686]">Model Version</span>
                  <span className="font-mono text-white font-bold">RUKOji-Vision-v4.0</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#27272A]/20">
                  <span className="text-[#988686]">Processing Mode</span>
                  <span className="font-mono text-[#1E8D42] font-bold">{isMaxPrivacyModeEnabled ? 'MAX PRIVACY (LOCAL ONLY)' : '100% LOCAL PROCESSING'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#27272A]/20">
                  <span className="text-[#988686]">Text Detection</span>
                  <span className="font-mono text-white font-bold">ACTIVE (NATURAL LANGUAGE NLP)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#27272A]/20">
                  <span className="text-[#988686]">Domain Detection</span>
                  <span className="font-mono text-white font-bold">ACTIVE (DATA-DRIVEN RULES)</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#988686]">Visual Detection</span>
                  <span className="font-mono text-white font-bold">AVAILABLE (VISION CORE ML)</span>
                </div>
              </div>
            </div>
          </div>

          
          <div className="p-5 rounded-2xl bg-[#121214]/40 border border-[#27272A]/30 space-y-3">
            <h3 className="text-sm font-bold text-white font-rounded">AI Subsystem Capabilities & Safety Guarantees</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { title: 'Keystroke Monitoring', val: 'DISABLED (0% Keylogging)', isSafe: true },
                { title: 'Hidden Screen Recording', val: 'DISABLED (0% Screenshots)', isSafe: true },
                { title: 'Private Browsing Cloud Upload', val: 'DISABLED (100% Local)', isSafe: true },
                { title: 'Contextual False-Positive Reducer', val: 'ACTIVE (Educational / Medical)', isSafe: true },
                { title: 'Weighted Confidence Engine', val: 'ACTIVE (Multi-Signal Scoring)', isSafe: true },
                { title: 'Adaptive Intervention', val: 'ACTIVE (Supportive)', isSafe: true }
              ].map(item => (
                <div key={item.title} className="p-3 rounded-xl bg-[#0B0B0C] border border-[#27272A]/30 space-y-1">
                  <div className="text-xs text-[#988686]">{item.title}</div>
                  <div className="text-xs font-mono font-bold text-[#1E8D42]">{item.val}</div>
                </div>
              ))}
            </div>
          </div>

          
          {!isMaxPrivacyModeEnabled && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white font-rounded">Today's Aggregated Local Insights</h3>
              <div className="grid grid-cols-3 gap-3">
                <div className="p-4 rounded-xl bg-[#121214]/40 border border-[#27272A]/30 text-center space-y-1">
                  <div className="text-2xl font-bold font-mono text-[#B73334]">12</div>
                  <div className="text-[11px] text-[#988686]">Blocked Attempts</div>
                </div>
                <div className="p-4 rounded-xl bg-[#121214]/40 border border-[#27272A]/30 text-center space-y-1">
                  <div className="text-2xl font-bold font-mono text-[#EDD06F]">8</div>
                  <div className="text-[11px] text-[#988686]">Warnings Issued</div>
                </div>
                <div className="p-4 rounded-xl bg-[#121214]/40 border border-[#27272A]/30 text-center space-y-1">
                  <div className="text-2xl font-bold font-mono text-[#7C3AED]">4</div>
                  <div className="text-[11px] text-[#988686]">Cooldowns Enforced</div>
                </div>
              </div>
            </div>
          )}
        </div>
      );

    case 'Test Bench':
      return (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          <div className="space-y-1">
            <div className="text-xs font-bold font-mono text-[#EDD06F]">DEVELOPER TEST BENCH</div>
            <h2 className="text-2xl font-bold text-white font-rounded">Live Website & Word Testing</h2>
            <p className="text-xs text-[#988686]">Test any URL, domain name, or keyword against RUKOji local AI & domain detection engine.</p>
          </div>

          
          <div className="p-5 rounded-2xl bg-[#121214]/50 border border-[#27272A]/40 space-y-4">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-white">Custom URL & Word Evaluator</span>
              <span className="font-mono text-[#988686]">Click chip or type & Evaluate</span>
            </div>

            <div className="flex gap-2.5">
              <div className="relative flex-1">
                <Globe className="w-4 h-4 text-[#7C3AED] absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Type URL or word (e.g. casino.com, adult, betting, nsfw)..."
                  value={testInput}
                  onChange={(e) => setTestInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && evaluateInput(testInput)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#0B0B0C] border border-[#27272A]/40 text-xs text-white placeholder-[#988686] focus:outline-none focus:border-[#7C3AED]"
                />
              </div>

              <button
                onClick={() => evaluateInput(testInput)}
                className="px-4 py-2 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Evaluate</span>
              </button>
            </div>

            
            <div className="space-y-2">
              <div className="text-[11px] font-bold text-[#988686]">V3 Smart AI Test Scenarios (Click to test):</div>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'TEST EXPLICIT (pornhub.com)', query: 'pornhub.com' },
                  { label: 'TEST EDUCATIONAL (human reproductive anatomy)', query: 'human reproductive system anatomy' },
                  { label: 'TEST MEDICAL (clinical health treatment)', query: 'clinical health treatment' },
                  { label: 'TEST GAMBLING (online betting casino)', query: 'online betting casino' },
                  { label: 'TEST SAFE (wikipedia.org)', query: 'wikipedia.org' }
                ].map(chip => (
                  <button
                    key={chip.label}
                    onClick={() => {
                      setTestInput(chip.query);
                      evaluateInput(chip.query);
                    }}
                    className="px-2.5 py-1 rounded-full bg-[#121214] hover:bg-[#1E1E22] border border-[#7C3AED]/40 text-[10px] font-mono font-bold text-white transition-all"
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            </div>

            
            {testResult && (
              <div className="p-4 rounded-xl bg-[#0B0B0C] border border-[#7C3AED]/40 space-y-3 animate-in fade-in duration-150">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${testResult.classification === 'EXPLICIT' ? 'bg-[#B73334]' : 'bg-[#1E8D42]'}`}></span>
                    <span className={`text-sm font-mono font-black ${testResult.classification === 'EXPLICIT' ? 'text-[#B73334]' : 'text-[#1E8D42]'}`}>
                      {testResult.classification}
                    </span>
                  </div>

                  <span className="text-xs font-mono font-bold text-[#7C3AED]">
                    Confidence: {(testResult.confidence * 100).toFixed(0)}%
                  </span>
                </div>

                <div className="text-xs text-[#D1D0D0] space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-[#988686]">Category: <strong className="text-white">{testResult.category}</strong></span>
                    <span className="text-[#988686]">Risk Score: <strong className="text-white">{(testResult.riskScore * 100).toFixed(0)}%</strong></span>
                  </div>
                  <p className="text-[11px] text-[#988686]">AI Rationale: {testResult.rationale}</p>
                </div>

                <div className="space-y-1 pt-1 border-t border-[#27272A]/20 text-[10px] font-mono text-[#988686]">
                  {testResult.signals.map((sig, idx) => (
                    <div key={idx}>{sig}</div>
                  ))}
                </div>
              </div>
            )}
          </div>

          
          <div className="p-5 rounded-2xl bg-[#121214]/50 border border-[#27272A]/30 space-y-4">
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-white font-rounded">Add Custom Block Rule</h3>
              <p className="text-xs text-[#988686]">Add any website domain or keyword to automatically trigger RUKOji pause intervention.</p>
            </div>

            <div className="flex gap-2.5 flex-col sm:flex-row">
              <input
                type="text"
                placeholder="e.g. reddit.com, instagram, distraction..."
                value={newRulePattern}
                onChange={(e) => setNewRulePattern(e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl bg-[#0B0B0C] border border-[#27272A]/40 text-xs text-white focus:outline-none focus:border-[#7C3AED]"
              />

              <select
                value={newRuleCategory}
                onChange={(e) => setNewRuleCategory(e.target.value)}
                className="px-3 py-2 rounded-xl bg-[#0B0B0C] border border-[#27272A]/40 text-xs text-white focus:outline-none"
              >
                <option value="Custom">Custom</option>
                <option value="Adult">Adult</option>
                <option value="Gambling">Gambling</option>
                <option value="Social Media">Social Media</option>
              </select>

              <button
                onClick={() => {
                  if (newRulePattern.trim()) {
                    setCustomRules([...customRules, { pattern: newRulePattern.trim(), category: newRuleCategory }]);
                    setNewRulePattern('');
                  }
                }}
                className="px-4 py-2 rounded-xl bg-[#121214] border border-[#7C3AED]/40 hover:bg-[#7C3AED]/20 text-[#7C3AED] font-bold text-xs flex items-center justify-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Rule</span>
              </button>
            </div>

            
            <div className="space-y-2 pt-2 border-t border-[#27272A]/30">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white">Active Domain & Keyword Rules ({customRules.length}):</span>
                <button
                  onClick={() => setHideActiveRules(!hideActiveRules)}
                  className="text-xs text-[#7C3AED] font-bold flex items-center gap-1"
                >
                  {hideActiveRules ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  <span>{hideActiveRules ? 'Show Active Rules' : 'Hide Active Rules'}</span>
                </button>
              </div>

              {!hideActiveRules && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                  {customRules.map((rule, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-[#0B0B0C] border border-[#27272A]/30 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-mono font-bold text-white">{rule.pattern}</div>
                        <div className="text-[10px] text-[#988686]">{rule.category}</div>
                      </div>
                      <button
                        onClick={() => setCustomRules(customRules.filter((_, i) => i !== idx))}
                        className="text-[#B73334] hover:text-red-400 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      );

    case 'Stickers':
      return (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-xs font-bold font-mono text-[#7C3AED]">STICKERS</div>
              <h2 className="text-2xl font-bold text-white font-rounded">Choose your guardian.</h2>
              <p className="text-xs text-[#988686]">Import, manage, and assign visual guardians for intervention.</p>
            </div>

            <button className="px-4 py-2 rounded-xl bg-[#7C3AED] text-white text-xs font-bold flex items-center gap-1.5 shadow-md">
              <Plus className="w-4 h-4" />
              <span>Add Sticker</span>
            </button>
          </div>

          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            
            <div
              onClick={() => setActiveStickerId('gandhi')}
              className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-3 ${
                activeStickerId === 'gandhi'
                  ? 'bg-[#121214] border-[#7C3AED] shadow-xl shadow-[#7C3AED]/15 ring-2 ring-[#7C3AED]'
                  : 'bg-[#121214]/40 border-[#27272A]/30 hover:border-[#27272A]/60'
              }`}
            >
              <div className="h-44 rounded-xl bg-[#0B0B0C] border border-[#27272A]/30 overflow-hidden relative flex items-center justify-center">
                <img
                  src="./assets/gadhijimeme.jpg"
                  alt="Mahatma Gandhi"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = './assets/gandhiji.jpg';
                  }}
                />
                {activeStickerId === 'gandhi' && (
                  <div className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-[#7C3AED] text-white flex items-center justify-center shadow-lg">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white font-rounded">Mahatma Gandhi</h3>
                  <p className="text-xs text-[#988686]">Preset Visual Guardian</p>
                </div>
                <span className="px-2 py-0.5 rounded bg-white/10 text-white font-mono text-[10px] font-bold">
                  DEFAULT
                </span>
              </div>
            </div>

            
            <div
              onClick={() => setActiveStickerId('dogmeme')}
              className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-3 ${
                activeStickerId === 'dogmeme'
                  ? 'bg-[#121214] border-[#7C3AED] shadow-xl shadow-[#7C3AED]/15 ring-2 ring-[#7C3AED]'
                  : 'bg-[#121214]/40 border-[#27272A]/30 hover:border-[#27272A]/60'
              }`}
            >
              <div className="h-44 rounded-xl bg-[#0B0B0C] border border-[#27272A]/30 overflow-hidden relative flex items-center justify-center">
                <img
                  src="./assets/dogmeme.jpg"
                  alt="Dog Meme Guardian"
                  className="w-full h-full object-cover"
                />
                {activeStickerId === 'dogmeme' && (
                  <div className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-[#7C3AED] text-white flex items-center justify-center shadow-lg">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white font-rounded">Dog Meme</h3>
                  <p className="text-xs text-[#988686]">Preset Visual Guardian</p>
                </div>
                <span className="px-2 py-0.5 rounded bg-white/10 text-white font-mono text-[10px] font-bold">
                  PRESET
                </span>
              </div>
            </div>
          </div>
        </div>
      );

    case 'Messages':
      return (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-xs font-bold font-mono text-[#7C3AED]">MESSAGES</div>
              <h2 className="text-2xl font-bold text-white font-rounded">Craft your pause messages.</h2>
              <p className="text-xs text-[#988686]">Customize Hinglish, English, or personalized messages shown during intervention.</p>
            </div>

            <button className="px-4 py-2 rounded-xl bg-[#7C3AED] text-white text-xs font-bold flex items-center gap-1.5 shadow-md">
              <Plus className="w-4 h-4" />
              <span>Create Message</span>
            </button>
          </div>

          
          <div className="space-y-4">
            {[
              {
                id: 'hinglish',
                name: 'Friendly Hinglish',
                cat: 'Preset',
                title: 'Beta, ruk ja ❤️',
                main: 'Jis raaste par tum ja rahe ho, thoda ruk aur soch.',
                sec: 'Take a breath. Choose what matters.',
                btn: 'Go Back'
              },
              {
                id: 'english',
                name: 'Classic English',
                cat: 'Preset',
                title: 'Pause & Reflect',
                main: 'Take a moment before continuing down this path.',
                sec: 'Is this aligned with your goals for today?',
                btn: 'Return to Work'
              },
              {
                id: 'mindful',
                name: 'Mindful Breath',
                cat: 'Mindfulness',
                title: 'Take a Deep Breath',
                main: 'Inhale peace, exhale digital noise.',
                sec: 'Return to your natural flow.',
                btn: 'I am Focused'
              }
            ].map(tpl => (
              <div
                key={tpl.id}
                onClick={() => setActiveMessageId(tpl.id)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-3 ${
                  activeMessageId === tpl.id
                    ? 'bg-[#121214] border-[#7C3AED] ring-1 ring-[#7C3AED]'
                    : 'bg-[#121214]/40 border-[#27272A]/30 hover:border-[#27272A]/60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">{tpl.name}</span>
                    <span className="px-2 py-0.5 rounded bg-white/10 text-white font-mono text-[9px] font-bold">{tpl.cat}</span>
                  </div>

                  {activeMessageId === tpl.id && (
                    <span className="text-xs font-mono font-bold text-[#7C3AED] flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      ACTIVE TEMPLATE
                    </span>
                  )}
                </div>

                <div className="space-y-1 pt-2 border-t border-[#27272A]/20">
                  <h4 className="text-base font-bold text-[#7C3AED] font-rounded">{tpl.title}</h4>
                  <p className="text-xs text-white font-medium">{tpl.main}</p>
                  <p className="text-[11px] text-[#988686]">{tpl.sec}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case 'Sounds':
      return (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-xs font-bold font-mono text-[#7C3AED]">SOUNDS</div>
              <h2 className="text-2xl font-bold text-white font-rounded">Give RUKOji a voice.</h2>
              <p className="text-xs text-[#988686]">Choose audio feedback chimes or import custom soundscapes for interventions.</p>
            </div>

            <button className="px-4 py-2 rounded-xl bg-[#7C3AED] text-white text-xs font-bold flex items-center gap-1.5 shadow-md">
              <Plus className="w-4 h-4" />
              <span>Add Sound Track</span>
            </button>
          </div>

          
          <div className="p-5 rounded-2xl bg-[#121214]/50 border border-[#27272A]/30 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white font-rounded">Intervention Audio Feedback</h3>
                <p className="text-xs text-[#988686]">Play selected chime when an intervention triggers.</p>
              </div>

              <button
                onClick={() => setIsSoundEnabled(!isSoundEnabled)}
                className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-1 shrink-0 ${
                  isSoundEnabled ? 'bg-[#7C3AED]' : 'bg-[#3F3F46]'
                }`}
              >
                <span className={`w-4 h-4 rounded-full bg-white transition-transform ${isSoundEnabled ? 'translate-x-5' : 'translate-x-0'}`}></span>
              </button>
            </div>

            {isSoundEnabled && (
              <div className="flex items-center gap-4 pt-2 border-t border-[#27272A]/30">
                <Volume2 className="w-4 h-4 text-[#7C3AED]" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={soundVolume}
                  onChange={(e) => setSoundVolume(parseFloat(e.target.value))}
                  className="flex-1 accent-[#7C3AED]"
                />
                <span className="text-xs font-mono font-bold text-white w-10 text-right">
                  {Math.round(soundVolume * 100)}%
                </span>
              </div>
            )}
          </div>

          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { id: 'gandhi_audio', name: 'Gandhi Reflection Audio', type: 'Built-in Audio Track', audioSrc: interventionConfig.sounds[0].audioSrc },
              { id: 'fahhh', name: 'Fahhh Sound Chime', type: 'Built-in Audio Track', audioSrc: interventionConfig.sounds[1].audioSrc },
              { id: 'gentle_bell', name: 'Gentle Bell', type: 'Built-in macOS Chime', audioSrc: 'synth:bell' },
              { id: 'zen_bowl', name: 'Zen Bowl Soundscape', type: 'Ambient Track', audioSrc: 'synth:gong' }
            ].map(track => (
              <div
                key={track.id}
                onClick={() => {
                  setActiveSoundId(track.id);
                  if (currentlyPlayingAudio === track.id) {
                    stopCurrentSound();
                    setCurrentlyPlayingAudio(null);
                  } else {
                    setCurrentlyPlayingAudio(track.id);
                    const soundPreset: PresetSound = {
                      name: track.name,
                      type: track.type,
                      description: track.name,
                      audioSrc: track.audioSrc
                    };
                    playSoundCue(soundPreset, () => {
                      setCurrentlyPlayingAudio(null);
                    });
                  }
                }}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  activeSoundId === track.id
                    ? 'bg-[#121214] border-[#7C3AED] ring-1 ring-[#7C3AED]'
                    : 'bg-[#121214]/40 border-[#27272A]/30 hover:border-[#27272A]/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (currentlyPlayingAudio === track.id) {
                        stopCurrentSound();
                        setCurrentlyPlayingAudio(null);
                      } else {
                        setCurrentlyPlayingAudio(track.id);
                        const soundPreset: PresetSound = {
                          name: track.name,
                          type: track.type,
                          description: track.name,
                          audioSrc: track.audioSrc
                        };
                        playSoundCue(soundPreset, () => {
                          setCurrentlyPlayingAudio(null);
                        });
                      }
                    }}
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                      currentlyPlayingAudio === track.id ? 'bg-[#7C3AED] text-white animate-pulse' : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    {currentlyPlayingAudio === track.id ? <StopCircle className="w-5 h-5" /> : <Play className="w-4 h-4 ml-0.5" />}
                  </button>

                  <div>
                    <h4 className="text-xs font-bold text-white">{track.name}</h4>
                    <p className="text-[10px] text-[#988686]">{track.type}</p>
                  </div>
                </div>

                {activeSoundId === track.id && (
                  <CheckCircle2 className="w-4 h-4 text-[#7C3AED]" />
                )}
              </div>
            ))}
          </div>
        </div>
      );

    case 'Cooldown':
      return (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          <div className="space-y-1">
            <div className="text-xs font-bold font-mono text-[#7C3AED]">COOLDOWN & TIMED LOCK</div>
            <h2 className="text-2xl font-bold text-white font-rounded">Custom Duration & Timed App Lock</h2>
            <p className="text-xs text-[#988686]">Set custom time in minutes and seconds. Enable Timed Lock to prevent stopping protection until the timer reaches zero.</p>
          </div>

          
          <div className="p-6 rounded-2xl bg-[#121214]/50 border border-[#27272A]/40 text-center space-y-5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-mono font-bold text-[#7C3AED]">RUKOji COOLDOWN STATUS</span>
              <span className="px-2 py-0.5 rounded bg-[#7C3AED]/20 text-[#7C3AED] font-mono text-[10px] font-bold">
                {isCooldownActive ? 'PAUSED' : 'IDLE'}
              </span>
            </div>

            
            <div className="relative w-40 h-40 mx-auto flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="80" cy="80" r="70" stroke="#3F3F46" strokeWidth="8" fill="transparent" />
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="#7C3AED"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray="440"
                  strokeDashoffset={isCooldownActive ? (1 - remainingCooldownSec / 600) * 440 : 0}
                  strokeLinecap="round"
                  className="transition-all duration-500"
                />
              </svg>
              <div className="absolute space-y-0.5">
                <div className="text-3xl font-mono font-black text-white">{formattedTime(remainingCooldownSec)}</div>
                <div className="text-[10px] text-[#988686]">{isCooldownActive ? 'Time Remaining' : 'Configured Time'}</div>
              </div>
            </div>

            
            <div>
              {isCooldownActive ? (
                <button
                  disabled={true}
                  className="px-6 py-2.5 rounded-full bg-[#B73334]/20 border border-[#B73334]/40 text-[#B73334] font-bold text-xs cursor-not-allowed opacity-60"
                >
                  Stop Cooldown (Locked)
                </button>
              ) : (
                <button
                  onClick={() => {
                    setIsCooldownActive(true);
                    setRemainingCooldownSec(cooldownMinutes * 60 + cooldownSeconds);
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-xs shadow-lg shadow-[#7C3AED]/25 flex items-center gap-2 mx-auto"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Start Cooldown Timer</span>
                </button>
              )}
            </div>
          </div>

          
          <div className="p-5 rounded-2xl bg-[#121214]/40 border border-[#27272A]/30 space-y-4">
            <h3 className="text-xs font-bold text-white">Duration Presets (Minutes & Seconds)</h3>
            <div className="grid grid-cols-5 gap-2">
              {[
                { label: '15s', m: 0, s: 15 },
                { label: '30s', m: 0, s: 30 },
                { label: '1m', m: 1, s: 0 },
                { label: '5m', m: 5, s: 0 },
                { label: '10m', m: 10, s: 0 }
              ].map(preset => (
                <button
                  key={preset.label}
                  onClick={() => {
                    setCooldownMinutes(preset.m);
                    setCooldownSeconds(preset.s);
                    setRemainingCooldownSec(preset.m * 60 + preset.s);
                  }}
                  className={`py-3 rounded-xl border text-center transition-all ${
                    cooldownMinutes === preset.m && cooldownSeconds === preset.s
                      ? 'bg-[#7C3AED] border-[#7C3AED] text-white shadow-md'
                      : 'bg-[#0B0B0C] border-[#27272A]/30 text-[#988686] hover:text-white'
                  }`}
                >
                  <div className="text-sm font-bold font-mono">{preset.label}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      );

    case 'Activity':
      return (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          <div className="space-y-1">
            <div className="text-xs font-bold font-mono text-[#7C3AED]">ACTIVITY</div>
            <h2 className="text-2xl font-bold text-white font-rounded">Digital Pause Insights</h2>
            <p className="text-xs text-[#988686]">Aggregated local summary of interventions and focus streaks.</p>
          </div>

          
          <div className="p-4 rounded-xl bg-[#1E8D42]/10 border border-[#1E8D42]/30 flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-[#1E8D42] shrink-0" />
            <div>
              <div className="text-xs font-bold text-white">100% Local & Private</div>
              <p className="text-[11px] text-[#988686]">No URLs, search queries, or keystrokes are ever logged or stored.</p>
            </div>
          </div>

          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-[#121214]/40 border border-[#27272A]/30">
              <div className="text-xs text-[#988686]">Blocked Attempts</div>
              <div className="text-2xl font-mono font-bold text-[#B73334] mt-1">12</div>
            </div>
            <div className="p-4 rounded-xl bg-[#121214]/40 border border-[#27272A]/30">
              <div className="text-xs text-[#988686]">Cooldowns Taken</div>
              <div className="text-2xl font-mono font-bold text-[#7C3AED] mt-1">8</div>
            </div>
            <div className="p-4 rounded-xl bg-[#121214]/40 border border-[#27272A]/30">
              <div className="text-xs text-[#988686]">Protection Time</div>
              <div className="text-2xl font-mono font-bold text-[#1E8D42] mt-1">4h 15m</div>
            </div>
            <div className="p-4 rounded-xl bg-[#121214]/40 border border-[#27272A]/30">
              <div className="text-xs text-[#988686]">Current Streak</div>
              <div className="text-2xl font-mono font-bold text-[#EDD06F] mt-1">5 days</div>
            </div>
          </div>

          
          <div className="p-5 rounded-2xl bg-[#121214]/40 border border-[#27272A]/30 space-y-4">
            <h3 className="text-sm font-bold text-white font-rounded">Weekly Pause Distribution</h3>
            <div className="h-32 flex items-end justify-between gap-3 pt-4 px-2">
              {[
                { day: 'Mon', count: 4, h: '40%' },
                { day: 'Tue', count: 2, h: '25%' },
                { day: 'Wed', count: 7, h: '70%' },
                { day: 'Thu', count: 3, h: '30%' },
                { day: 'Fri', count: 9, h: '85%' },
                { day: 'Sat', count: 1, h: '15%' },
                { day: 'Sun', count: 0, h: '8%' }
              ].map(bar => (
                <div key={bar.day} className="flex-1 flex flex-col items-center gap-1.5">
                  <span className="text-[10px] font-mono text-[#988686]">{bar.count}</span>
                  <div className="w-full bg-[#7C3AED]/20 rounded-t-lg relative overflow-hidden" style={{ height: bar.h }}>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#7C3AED] to-purple-400"></div>
                  </div>
                  <span className="text-[10px] font-bold text-white">{bar.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case 'Permissions':
      return (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          <div className="space-y-1">
            <div className="text-xs font-bold font-mono text-[#7C3AED]">PERMISSION CENTER</div>
            <h2 className="text-2xl font-bold text-white font-rounded">System Permissions & Integration</h2>
            <p className="text-xs text-[#988686]">1-Click buttons below open macOS System Settings directly to grant permissions.</p>
          </div>

          
          <div className="p-5 rounded-2xl bg-[#121214]/50 border border-[#1E8D42]/30 space-y-4">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-[#1E8D42]" />
              <div>
                <h3 className="text-sm font-bold text-white font-rounded">Accessibility Permission Granted</h3>
                <p className="text-xs text-[#988686]">RUKOji is fully authorized for browser tab monitoring and lockout enforcement.</p>
              </div>
            </div>

            <div className="pt-2 border-t border-[#27272A]/30 flex flex-wrap gap-3">
              <button className="px-4 py-2 rounded-xl bg-[#7C3AED] text-white text-xs font-bold shadow-md">
                Grant Accessibility Permission
              </button>
              <button className="px-4 py-2 rounded-xl bg-[#121214] border border-[#27272A]/40 text-[#D1D0D0] text-xs font-bold">
                Grant Automation Permission
              </button>
            </div>
          </div>

          
          <div className="p-5 rounded-2xl bg-[#121214]/40 border border-[#27272A]/30 space-y-3">
            <h3 className="text-sm font-bold text-white font-rounded">Active macOS Capabilities</h3>
            <div className="space-y-2 text-xs">
              {[
                { title: 'Accessibility API Access', status: 'GRANTED', desc: 'Required for tab title evaluation and closing applications during lockout.' },
                { title: 'AppleScript Automation Access', status: 'ENABLED', desc: 'Observes active frontmost browser tab in Safari, Chrome, Brave, and Edge.' },
                { title: 'Local System Notifications', status: 'ACTIVE', desc: 'Delivers pause intervention alerts and cooldown notifications.' },
                { title: 'On-Device Apple Vision Engine', status: 'AVAILABLE', desc: 'On-device frame buffer risk evaluation using Apple Vision.' }
              ].map(row => (
                <div key={row.title} className="p-3 rounded-xl bg-[#0B0B0C] border border-[#27272A]/20 flex items-center justify-between gap-3">
                  <div>
                    <div className="font-bold text-white">{row.title}</div>
                    <div className="text-[11px] text-[#988686]">{row.desc}</div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-[#1E8D42]/20 text-[#1E8D42] font-mono text-[10px] font-bold shrink-0">
                    {row.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case 'Privacy Center':
      return (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          <div className="space-y-1">
            <div className="text-xs font-bold font-mono text-[#7C3AED]">PRIVACY CENTER</div>
            <h2 className="text-2xl font-bold text-white font-rounded">Privacy Audit & Data Management</h2>
            <p className="text-xs text-[#988686]">RUKOji operates on a strict zero-spyware, 100% local processing commitment.</p>
          </div>

          
          <div className="p-5 rounded-2xl bg-[#121214]/50 border border-[#27272A]/30 space-y-4">
            <h3 className="text-sm font-bold text-white font-rounded">Real-Time Privacy Audit</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl bg-[#0B0B0C] border border-[#27272A]/30 text-center space-y-1">
                <div className="text-2xl font-black font-rounded text-[#1E8D42]">100%</div>
                <div className="text-[10px] text-[#988686]">Local On-Device</div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#0B0B0C] border border-[#27272A]/30 text-center space-y-1">
                <div className="text-2xl font-black font-rounded text-[#1E8D42]">0%</div>
                <div className="text-[10px] text-[#988686]">Keystroke Logging</div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#0B0B0C] border border-[#27272A]/30 text-center space-y-1">
                <div className="text-2xl font-black font-rounded text-[#1E8D42]">0%</div>
                <div className="text-[10px] text-[#988686]">Screen Recording</div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#0B0B0C] border border-[#27272A]/30 text-center space-y-1">
                <div className="text-2xl font-black font-rounded text-[#1E8D42]">0%</div>
                <div className="text-[10px] text-[#988686]">Cloud Telemetry</div>
              </div>
            </div>
          </div>

          
          <div className="p-5 rounded-2xl bg-[#121214]/40 border border-[#27272A]/30 space-y-3">
            <h3 className="text-sm font-bold text-white font-rounded">Data Export & Reset</h3>
            <p className="text-xs text-[#988686]">Export custom block rules and settings to portable JSON, or reset configuration.</p>
            <div className="flex gap-3 pt-2">
              <button className="px-4 py-2 rounded-xl bg-[#7C3AED] text-white text-xs font-bold">
                Export Settings (JSON)
              </button>
              <button className="px-4 py-2 rounded-xl bg-[#B73334]/20 border border-[#B73334]/40 text-[#B73334] text-xs font-bold">
                Reset RUKOji Data
              </button>
            </div>
          </div>
        </div>
      );

    case 'Diagnostics':
      return (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-xs font-bold font-mono text-[#7C3AED]">DIAGNOSTICS & SYSTEM HEALTH</div>
              <h2 className="text-2xl font-bold text-white font-rounded">Technical Diagnostic Report</h2>
              <p className="text-xs text-[#988686]">Privacy-safe technical status information for system verification.</p>
            </div>

            <button
              onClick={() => {
                setIsLogCopied(true);
                setTimeout(() => setIsLogCopied(false), 2000);
              }}
              className="px-4 py-2 rounded-xl bg-[#7C3AED] text-white text-xs font-bold flex items-center gap-1.5 shadow-md"
            >
              {isLogCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{isLogCopied ? 'Copied!' : 'Copy Diagnostic Log'}</span>
            </button>
          </div>

          
          <div className="p-5 rounded-2xl bg-[#121214]/40 border border-[#27272A]/30 space-y-3">
            <h3 className="text-sm font-bold text-white font-rounded">System Component Status</h3>
            <div className="space-y-2 text-xs font-mono">
              {[
                { k: 'Application Version', v: 'RUKOji v4.0.0 (Build 400)' },
                { k: 'macOS System', v: 'macOS 14.5 (Darwin 23.5.0)' },
                { k: 'On-Device AI Model', v: 'RUKOji-Vision-v4.0' },
                { k: 'Persistence Schema', v: 'Storage Version v4' },
                { k: 'Local Processing', v: '100% On-Device (0% Cloud)' },
                { k: 'Keylogging Status', v: '0% (Disabled)' },
                { k: 'Screen Recording', v: '0% (Disabled)' },
                { k: 'Active Protection Status', v: 'ACTIVE' }
              ].map(row => (
                <div key={row.k} className="flex justify-between py-1.5 border-b border-[#27272A]/20">
                  <span className="text-[#988686]">{row.k}</span>
                  <span className="text-white font-bold">{row.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case 'Settings':
      return (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          <div className="space-y-1">
            <div className="text-xs font-bold font-mono text-[#7C3AED]">SETTINGS</div>
            <h2 className="text-2xl font-bold text-white font-rounded">Preferences & Privacy</h2>
            <p className="text-xs text-[#988686]">Configure theme appearance, motion accessibility, and privacy controls.</p>
          </div>

          
          <div className="flex gap-2 border-b border-[#27272A]/30 pb-3">
            {[
              { id: 'general', label: 'General' },
              { id: 'appearance', label: 'Appearance' },
              { id: 'privacy', label: 'Privacy Center' },
              { id: 'permissions', label: 'Permissions' }
            ].map(sec => (
              <button
                key={sec.id}
                onClick={() => setSettingsSection(sec.id as any)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  settingsSection === sec.id
                    ? 'bg-[#7C3AED] text-white'
                    : 'bg-[#121214] text-[#988686] hover:text-white border border-[#27272A]/30'
                }`}
              >
                {sec.label}
              </button>
            ))}
          </div>

          
          {settingsSection === 'general' && (
            <div className="p-5 rounded-2xl bg-[#121214]/40 border border-[#27272A]/30 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">Enable Audio Soundscapes</div>
                  <div className="text-[11px] text-[#988686]">Play chime when pause intervention modal appears.</div>
                </div>
                <button
                  onClick={() => setIsSoundEnabled(!isSoundEnabled)}
                  className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-1 shrink-0 ${
                    isSoundEnabled ? 'bg-[#7C3AED]' : 'bg-[#3F3F46]'
                  }`}
                >
                  <span className={`w-4 h-4 rounded-full bg-white transition-transform ${isSoundEnabled ? 'translate-x-5' : 'translate-x-0'}`}></span>
                </button>
              </div>
            </div>
          )}

          {settingsSection === 'appearance' && (
            <div className="p-5 rounded-2xl bg-[#121214]/40 border border-[#27272A]/30 space-y-4">
              <div className="text-xs font-bold text-white">Theme Appearance</div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'dark', label: 'Dark Mode', icon: Moon },
                  { id: 'light', label: 'Light Mode', icon: Sun },
                  { id: 'auto', label: 'System Auto', icon: Laptop }
                ].map(mode => {
                  const IconComp = mode.icon;
                  return (
                    <div
                      key={mode.id}
                      onClick={() => setThemeMode(mode.id as any)}
                      className={`p-3 rounded-xl border text-center cursor-pointer transition-all space-y-1 ${
                        themeMode === mode.id
                          ? 'bg-[#7C3AED]/20 border-[#7C3AED] text-white'
                          : 'bg-[#0B0B0C] border-[#27272A]/30 text-[#988686]'
                      }`}
                    >
                      <IconComp className="w-5 h-5 mx-auto text-[#7C3AED]" />
                      <div className="text-xs font-bold">{mode.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {settingsSection === 'privacy' && (
            <div className="p-5 rounded-2xl bg-[#121214]/40 border border-[#27272A]/30 space-y-2">
              <div className="text-xs font-bold text-white">Strict Privacy Guarantees</div>
              <p className="text-xs text-[#988686]">Local-first storage (All stickers & settings stay on your Mac).</p>
            </div>
          )}

          {settingsSection === 'permissions' && (
            <div className="p-5 rounded-2xl bg-[#121214]/40 border border-[#27272A]/30 space-y-2">
              <div className="text-xs font-bold text-white font-mono">Accessibility API & AppleScript Engine</div>
              <p className="text-xs text-[#988686]">Fully configured for native macOS integration.</p>
            </div>
          )}
        </div>
      );

    default:
      return null;
  }
};
