import React, { useState, useEffect } from 'react';
import { 
  Home as HouseIcon, 
  Shield, 
  Brain, 
  Wrench, 
  Sparkles, 
  MessageSquare, 
  Volume2, 
  Timer, 
  BarChart3, 
  ShieldCheck, 
  Lock, 
  Activity, 
  Settings,
  PanelLeftClose
} from 'lucide-react';
import { VirtualAppScreens } from './virtual-app/VirtualAppScreens';

interface RealRukojiAppWindowProps {
  onTestClick?: () => VoidFunction | void;
}

export const RealRukojiAppWindow: React.FC<RealRukojiAppWindowProps> = ({ onTestClick }) => {
  const [activeTab, setActiveTab] = useState('Home');
  const [isLocked, setIsLocked] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      if (window.innerWidth < 640) {
        setIsSidebarCollapsed(true);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const sidebarNavItems = [
    { name: 'Home', icon: HouseIcon },
    { name: 'Protection', icon: Shield },
    { name: 'AI Center', icon: Brain },
    { name: 'Test Bench', icon: Wrench },
    { name: 'Stickers', icon: Sparkles },
    { name: 'Messages', icon: MessageSquare },
    { name: 'Sounds', icon: Volume2 },
    { name: 'Cooldown', icon: Timer },
    { name: 'Activity', icon: BarChart3 },
    { name: 'Permissions', icon: ShieldCheck },
    { name: 'Privacy Center', icon: Lock },
    { name: 'Diagnostics', icon: Activity },
    { name: 'Settings', icon: Settings },
  ];

  const activeNavItem = sidebarNavItems.find(item => item.name === activeTab);
  const ActiveTabIcon = activeNavItem ? activeNavItem.icon : HouseIcon;

  return (
    <div data-app-showcase="true" className="app-showcase-window w-full max-w-5xl mx-auto rounded-xl sm:rounded-2xl overflow-hidden bg-[#0B0B0C] border border-[#27272A]/40 shadow-2xl font-sans text-[#D1D0D0] select-none text-left">
      
      <div className="bg-[#0B0B0C] px-3 sm:px-4 py-2.5 sm:py-3 border-b border-[#27272A]/30 flex items-center justify-between">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#B73334]"></div>
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#EDD06F]"></div>
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#1E8D42]"></div>
        </div>
        <div className="text-[10px] sm:text-[11px] font-mono text-[#988686]">RUKOji v4.0 — macOS Native</div>
      </div>

      <div className="flex h-[520px] sm:h-[580px] max-h-[580px] bg-[#0B0B0C] overflow-hidden">
        
        <div className={`transition-all duration-300 border-r border-[#27272A]/30 bg-[#0B0B0C] flex flex-col p-2 sm:p-3 h-full overflow-hidden shrink-0 ${
          isSidebarCollapsed ? 'w-12 sm:w-16' : 'w-48 sm:w-60'
        }`}>
          
          <div className="flex items-center justify-between px-1 sm:px-2 py-1 shrink-0">
            {!isSidebarCollapsed && (
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#7C3AED]" />
                <span className="font-bold text-white text-xs sm:text-sm font-rounded truncate">RUKOji</span>
              </div>
            )}
            {isSidebarCollapsed && (
              <Shield className="w-5 h-5 text-[#7C3AED] mx-auto" />
            )}

            <button 
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="p-1 rounded-full text-[#988686] hover:text-white bg-[#27272A]/20 hover:bg-[#27272A]/40 transition-colors ml-auto"
              title="Toggle Sidebar"
            >
              <PanelLeftClose className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="h-[1px] bg-[#27272A]/30 my-1.5 shrink-0"></div>

          <div className="space-y-0.5 py-1 shrink-0 overflow-y-auto">
            {sidebarNavItems.map((item) => {
              const IconComponent = item.icon;
              const isSelected = activeTab === item.name;

              return (
                <button
                  key={item.name}
                  onClick={() => setActiveTab(item.name)}
                  title={item.name}
                  className={`w-full flex items-center gap-2.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs transition-all text-left ${
                    isSelected
                      ? 'bg-[#7C3AED]/20 border border-[#7C3AED]/40 text-white font-bold'
                      : 'text-[#988686] hover:text-[#7C3AED] hover:bg-[#121214]'
                  }`}
                >
                  <IconComponent className={`w-4 h-4 shrink-0 ${isSelected ? 'text-[#7C3AED]' : 'text-[#988686]'}`} />
                  {!isSidebarCollapsed && <span className="truncate">{item.name}</span>}
                </button>
              );
            })}
          </div>

          {!isSidebarCollapsed && (
            <div className="mt-auto p-2.5 sm:p-3 rounded-xl bg-[#121214] border border-[#27272A]/30 space-y-1 shrink-0">
              <div className="flex items-center gap-1.5 font-mono text-[9px] sm:text-[10px] font-bold text-white tracking-wider truncate">
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isLocked ? 'bg-[#7C3AED]' : 'bg-[#1E8D42]'}`}></span>
                {isLocked ? 'RUKOJI COOLDOWN' : 'PROTECTED'}
              </div>
              <div className="text-[8px] sm:text-[9px] text-[#988686] truncate">
                Privacy First • Local Monitoring
              </div>
            </div>
          )}

        </div>

        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          
          <div className="px-3 sm:px-6 py-2.5 sm:py-3.5 border-b border-[#27272A]/30 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
              <ActiveTabIcon className="w-4 h-4 text-[#7C3AED] shrink-0" />
              <span className="font-bold text-white text-xs sm:text-base font-rounded truncate">{activeTab}</span>
            </div>

            <button
              onClick={() => setIsLocked(!isLocked)}
              className="px-2.5 sm:px-3 py-1 rounded-full bg-[#121214] border border-[#27272A]/40 font-mono text-[9px] sm:text-[10px] font-bold text-white flex items-center gap-1.5 sm:gap-2 hover:bg-[#1E1E22] transition-all cursor-pointer shrink-0 ml-2"
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isLocked ? 'bg-[#7C3AED]' : 'bg-[#1E8D42]'}`}></span>
              {isLocked ? 'RUKOJI COOLDOWN' : 'PROTECTED'}
            </button>
          </div>

          <div className="p-3 sm:p-6 md:p-8 flex-1 overflow-y-auto min-h-0">
            <VirtualAppScreens
              activeTab={activeTab}
              onNavigateTab={(tab) => setActiveTab(tab)}
              onTriggerTestIntervention={onTestClick}
            />
          </div>

        </div>

      </div>
    </div>
  );
};
