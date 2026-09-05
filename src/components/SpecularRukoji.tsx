import React from 'react';
import rukojiAppIcon from '../assets/rukoji_app_icon.png';

interface SpecularRukojiProps {
  className?: string;
  iconSize?: string;
  textSize?: string;
}

export const SpecularRukoji: React.FC<SpecularRukojiProps> = ({
  className = '',
  iconSize = 'w-8 h-8',
  textSize = 'text-2xl',
}) => {
  return (
    <div className={`relative inline-flex items-center group ${className}`}>
      <div className="relative flex items-center gap-2.5 px-3 py-1.5 rounded-full overflow-hidden transition-all duration-300">
        
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden rounded-full">
          <div className="absolute -inset-[100%] animate-specular-sweep bg-[conic-gradient(from_0deg,transparent_0_300deg,rgba(255,255,255,0.95)_335deg,rgba(124,58,237,1)_360deg)] opacity-85 group-hover:opacity-100 transition-opacity" />
          <div className="absolute inset-[1px] rounded-full bg-[#0B0B0C]" />
        </div>

        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden rounded-full">
          <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 animate-specular-shine" />
        </div>

        <div className="relative z-20 flex items-center gap-2.5">
          <img 
            src={rukojiAppIcon} 
            alt="RUKOji Logo" 
            className={`${iconSize} object-contain rounded-xl shrink-0 group-hover:scale-105 transition-transform duration-300`}
          />
          <span className={`${textSize} font-extrabold tracking-tight text-[#D1D0D0] font-chennai translate-y-[1px]`}>
            RUKO<span className="text-[#7C3AED] group-hover:text-[#8B5CF6] transition-colors">ji</span>
          </span>
        </div>
      </div>
    </div>
  );
};
