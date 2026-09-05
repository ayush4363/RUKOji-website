import React from 'react';
import { BarChart3, Flame, Clock, ShieldAlert, Timer } from 'lucide-react';
import { HoverText } from './HoverText';

export const ActivityInsights: React.FC = () => {
  const weeklyData = [
    { day: 'Mon', count: 3, height: '45%' },
    { day: 'Tue', count: 5, height: '75%' },
    { day: 'Wed', count: 2, height: '30%' },
    { day: 'Thu', count: 7, height: '100%' },
    { day: 'Fri', count: 4, height: '60%' },
    { day: 'Sat', count: 1, height: '15%' },
    { day: 'Sun', count: 2, height: '30%' },
  ];

  return (
    <section className="py-24 bg-[#0B0B0C] border-t border-[#27272A]/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#7C3AED]/15 border border-[#7C3AED]/30 text-[#7C3AED]">
            DIGITAL PAUSE INSIGHTS
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-chennai">
            <HoverText text="Track your focus, locally." />
          </h2>
          <p className="text-[#988686] text-base sm:text-lg">
            Aggregated local metrics visualize your pause interventions without uploading private data anywhere.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            
            <div className="glass-card p-5 space-y-2 border border-[#B73334]/30">
              <div className="flex items-center justify-between text-[#B73334]">
                <ShieldAlert className="w-5 h-5" />
                <span className="text-xs font-mono font-bold">BLOCKED</span>
              </div>
              <div className="text-3xl font-black text-white font-mono">12</div>
              <div className="text-xs text-[#988686]">Blocked Attempts</div>
            </div>

            <div className="glass-card p-5 space-y-2 border border-[#7C3AED]/30">
              <div className="flex items-center justify-between text-[#7C3AED]">
                <Timer className="w-5 h-5" />
                <span className="text-xs font-mono font-bold">PAUSES</span>
              </div>
              <div className="text-3xl font-black text-white font-mono">4</div>
              <div className="text-xs text-[#988686]">Cooldowns Taken</div>
            </div>

            <div className="glass-card p-5 space-y-2 border border-[#1E8D42]/30">
              <div className="flex items-center justify-between text-[#1E8D42]">
                <Clock className="w-5 h-5" />
                <span className="text-xs font-mono font-bold">ACTIVE</span>
              </div>
              <div className="text-2xl font-black text-white font-mono">3h 42m</div>
              <div className="text-xs text-[#988686]">Protection Time</div>
            </div>

            <div className="glass-card p-5 space-y-2 border border-[#EDD06F]/30">
              <div className="flex items-center justify-between text-[#EDD06F]">
                <Flame className="w-5 h-5" />
                <span className="text-xs font-mono font-bold">STREAK</span>
              </div>
              <div className="text-2xl font-black text-white font-mono">6 Days</div>
              <div className="text-xs text-[#988686]">Focus Streak</div>
            </div>

          </div>

          <div className="lg:col-span-7 glass-card p-6 sm:p-8 border border-[#27272A]/50 rounded-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-[#27272A]/30 pb-4">
              <div className="flex items-center gap-3">
                <BarChart3 className="w-5 h-5 text-[#7C3AED]" />
                <div>
                  <h3 className="text-base font-bold text-white font-chennai">
                    <HoverText text="Weekly Pause Distribution" />
                  </h3>
                  <p className="text-xs text-[#988686]">Local aggregated count of mindful pause interventions</p>
                </div>
              </div>
              <span className="text-xs font-mono text-[#1E8D42] font-bold">100% PRIVATE</span>
            </div>

            <div className="h-48 flex items-end justify-between gap-3 pt-6 px-2">
              {weeklyData.map((item) => (
                <div key={item.day} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <span className="text-[10px] font-mono text-[#988686] opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.count}
                  </span>
                  <div
                    style={{ height: item.height }}
                    className="w-full max-w-[36px] bg-gradient-to-t from-[#7C3AED] to-[#8B5CF6] rounded-t-lg transition-all group-hover:scale-y-105 shadow-lg shadow-[#7C3AED]/20"
                  ></div>
                  <span className="text-xs font-mono font-semibold text-[#D1D0D0] mt-1">
                    {item.day}
                  </span>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
