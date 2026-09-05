import React from 'react';

interface HoverTextProps {
  text: string;
  className?: string;
  hoverColor?: string;
}

export const HoverText: React.FC<HoverTextProps> = ({
  text,
  className = '',
  hoverColor = 'hover:text-[#7C3AED] hover:drop-shadow-[0_0_8px_rgba(124,58,237,0.8)]',
}) => {
  const words = text.split(' ');

  return (
    <span className={className}>
      {words.map((word, wIdx) => (
        <React.Fragment key={wIdx}>
          <span className="inline-block whitespace-nowrap">
            {Array.from(word).map((char, cIdx) => (
              <span
                key={cIdx}
                data-hover-purple="true"
                className={`hover-purple-target cursor-none transition-all duration-150 ${hoverColor}`}
              >
                {char}
              </span>
            ))}
          </span>
          {wIdx < words.length - 1 && <span> </span>}
        </React.Fragment>
      ))}
    </span>
  );
};
