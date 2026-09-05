import React, { useState } from 'react';
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

  return (
    <div data-app-showcase="true" className="app-showcase-window w-full max-w-5xl mx-auto rounded-2xl overflow-hidden bg-[#0B0B0C] border border-[#27272A]/40 shadow-2xl font-sans text-[#D1D0D0] select-none text-left">
      
      <div className="bg-[#0B0B0C] px-4 py-3 border-b border-[#27272A]/30 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#B73334]"></div>
          <div className="w-3 h-3 rounded-full bg-[#EDD06F]"></div>
          <div className="w-3 h-3 rounded-full bg-[#1E8D42]"></div>
        </div>
        <div className="text-[11px] font-mono text-[#988686]">RUKOji v4.0 — macOS Native</div>
      </div>

      <div className="flex h-[580px] max-h-[580px] bg-[#0B0B0C] overflow-hidden">
        
        <div className={`transition-all duration-300 border-r border-[#27272A]/30 bg-[#0B0B0C] flex flex-col p-3 h-full overflow-hidden ${
          isSidebarCollapsed ? 'w-16' : 'w-56 sm:w-60'
        }`}>
          
          <div className="flex items-center justify-between px-2 py-1 shrink-0">
            {!isSidebarCollapsed && (
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#7C3AED]" />
                <span className="font-bold text-white text-sm font-rounded">RUKOji</span>
              </div>
            )}
            {isSidebarCollapsed && (
              <Shield className="w-5 h-5 text-[#7C3AED] mx-auto" />
            )}

            <button 
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="p-1 rounded-full text-[#988686] hover:text-white bg-[#27272A]/20 hover:bg-[#27272A]/40 transition-colors"
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
                  className={`w-full flex items-center gap-3 px-3 py-1.5 rounded-lg text-xs transition-all text-left ${
                    isSelected
                      ? 'bg-[#7C3AED]/20 border border-[#7C3AED]/40 text-white font-bold'
                      : 'text-[#988686] hover:text-[#7C3AED] hover:bg-[#121214]'
                  }`}
                >
                  <IconComponent className={`w-4 h-4 shrink-0 ${isSelected ? 'text-[#7C3AED]' : 'text-[#988686]'}`} />
                  {!isSidebarCollapsed && <span>{item.name}</span>}
                </button>
              );
            })}
          </div>

          {!isSidebarCollapsed && (
            <div className="mt-auto p-3 rounded-xl bg-[#121214] border border-[#27272A]/30 space-y-1 shrink-0">
              <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold text-white tracking-wider">
                <span className={`w-1.5 h-1.5 rounded-full ${isLocked ? 'bg-[#7C3AED]' : 'bg-[#1E8D42]'}`}></span>
                {isLocked ? 'RUKOJI COOLDOWN' : 'PROTECTED'}
              </div>
              <div className="text-[9px] text-[#988686]">
                Privacy First • Local Monitoring
              </div>
            </div>
          )}

        </div>

        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          
          <div className="px-6 py-3.5 border-b border-[#27272A]/30 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <HouseIcon className="w-4 h-4 text-[#7C3AED]" />
              <span className="font-bold text-white text-base font-rounded">{activeTab}</span>
            </div>

            <button
              onClick={() => setIsLocked(!isLocked)}
              className="px-3 py-1 rounded-full bg-[#121214] border border-[#27272A]/40 font-mono text-[10px] font-bold text-white flex items-center gap-2 hover:bg-[#1E1E22] transition-all cursor-pointer"
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isLocked ? 'bg-[#7C3AED]' : 'bg-[#1E8D42]'}`}></span>
              {isLocked ? 'RUKOJI COOLDOWN' : 'PROTECTED'}
            </button>
          </div>

          <div className="p-6 sm:p-8 flex-1 overflow-y-auto min-h-0">
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
