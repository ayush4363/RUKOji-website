import React, { useState, useEffect } from 'react';
import { interventionConfig, PresetSticker, PresetSound } from '../config/intervention.config';
import { Sparkles, Volume2, Info, ArrowLeft, X, Image as ImageIcon } from 'lucide-react';
import { HoverText } from './HoverText';
import { playSoundCue, stopCurrentSound } from '../utils/soundPlayer';

interface StickerThumbnailProps {
  sticker: PresetSticker;
}

const StickerThumbnail: React.FC<StickerThumbnailProps> = ({ sticker }) => {
  const [imgError, setImgError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(sticker.imageSrc);

  useEffect(() => {
    setCurrentSrc(sticker.imageSrc);
    setImgError(false);
  }, [sticker.imageSrc, sticker.name]);

  const handleError = () => {
    if (sticker.fallbackSrc && currentSrc !== sticker.fallbackSrc) {
      setCurrentSrc(sticker.fallbackSrc);
    } else {
      setImgError(true);
    }
  };

  return (
    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden bg-[#121214] border border-white/20 flex-shrink-0 flex items-center justify-center shadow-md">
      {!imgError ? (
        <img
          src={currentSrc}
          alt={sticker.name}
          onError={handleError}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      ) : (
        <ImageIcon className="w-5 h-5 text-[#7C3AED]" />
      )}
    </div>
  );
};

interface StickerPreviewDisplayProps {
  sticker: PresetSticker;
  className?: string;
}

const StickerPreviewDisplay: React.FC<StickerPreviewDisplayProps> = ({ sticker, className }) => {
  const [imgError, setImgError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(sticker.imageSrc);

  useEffect(() => {
    setCurrentSrc(sticker.imageSrc);
    setImgError(false);
  }, [sticker.imageSrc, sticker.name]);

  const handleError = () => {
    if (sticker.fallbackSrc && currentSrc !== sticker.fallbackSrc) {
      setCurrentSrc(sticker.fallbackSrc);
    } else {
      setImgError(true);
    }
  };

  return (
    <div className={`relative flex items-center justify-center overflow-hidden rounded-2xl border-2 border-white/15 bg-[#0B0B0C] shadow-2xl ${className}`}>
      {!imgError ? (
        <img
          src={currentSrc}
          alt={sticker.name}
          onError={handleError}
          className="w-full h-full object-cover transition-all duration-300"
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center bg-[#121214] text-[#988686] p-4 text-center space-y-2">
          <ImageIcon className="w-8 h-8 text-[#7C3AED]" />
          <span className="text-xs font-bold text-white">{sticker.name}</span>
        </div>
      )}

      <div className="absolute bottom-2.5 right-2.5 px-3 py-1 rounded-md bg-[#0B0B0C]/85 backdrop-blur-md text-[10px] font-mono text-white font-bold border border-white/15 shadow-md z-10">
        {sticker.name}
      </div>
    </div>
  );
};

export const SignatureIntervention: React.FC = () => {
  const [selectedSticker, setSelectedSticker] = useState(interventionConfig.stickers[0]);
  const [selectedMessage, setSelectedMessage] = useState(interventionConfig.messages[0]);
  const [selectedSound, setSelectedSound] = useState(interventionConfig.sounds[0]);
  const [playingSoundName, setPlayingSoundName] = useState<string | null>(null);
  const [showWhyPaused, setShowWhyPaused] = useState(false);

  const handleSoundSelect = (snd: PresetSound) => {
    setSelectedSound(snd);
    if (playingSoundName === snd.name) {
      stopCurrentSound();
      setPlayingSoundName(null);
    } else {
      setPlayingSoundName(snd.name);
      playSoundCue(snd, () => {
        setPlayingSoundName(null);
      });
    }
  };

  return (
    <section id="intervention" className="py-24 bg-[#0B0B0C] border-t border-[#27272A]/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#7C3AED]/15 border border-[#7C3AED]/30 text-[#7C3AED]">
            SIGNATURE PAUSE EXPERIENCE
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-chennai">
            <HoverText text="When RUKOji says: ruk ja." />
          </h2>
          <p className="text-[#988686] text-base sm:text-lg">
            Customize visual stickers, Hinglish messages, and sound cues to build your personal digital guardian.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            
            <div className="glass-card p-5 space-y-3">
              <label className="text-xs font-bold text-white uppercase tracking-wider flex items-center justify-between">
                <span>Select Visual Guardian / Sticker</span>
                <span className="text-[#7C3AED] font-mono text-[11px]">STICKER STUDIO</span>
              </label>

              <div className="grid grid-cols-2 gap-3">
                {interventionConfig.stickers.map((sticker) => (
                  <button
                    key={sticker.name}
                    onClick={() => setSelectedSticker(sticker)}
                    className={`p-3 rounded-xl border flex items-center gap-3 transition-all text-left ${
                      selectedSticker.name === sticker.name
                        ? 'bg-[#7C3AED]/20 border-[#7C3AED] text-white shadow-md'
                        : 'bg-[#0B0B0C] border-[#27272A]/40 text-[#988686] hover:text-[#D1D0D0]'
                    }`}
                  >
                    <StickerThumbnail sticker={sticker} />
                    <div className="overflow-hidden">
                      <div className="text-xs font-bold text-white truncate">{sticker.name}</div>
                      <div className="text-[10px] text-[#988686] truncate">{sticker.category}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="glass-card p-5 space-y-3">
              <label className="text-xs font-bold text-white uppercase tracking-wider flex items-center justify-between">
                <span>Select Message Preset</span>
                <span className="text-[#7C3AED] font-mono text-[11px]">HINGLISH / ENGLISH</span>
              </label>

              <div className="space-y-2">
                {interventionConfig.messages.map((msg) => (
                  <button
                    key={msg.name}
                    onClick={() => setSelectedMessage(msg)}
                    className={`w-full p-3 rounded-xl border text-left transition-all ${
                      selectedMessage.name === msg.name
                        ? 'bg-[#7C3AED]/20 border-[#7C3AED] text-white'
                        : 'bg-[#0B0B0C] border-[#27272A]/40 text-[#988686] hover:text-[#D1D0D0]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{msg.name}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#121214] border border-[#27272A]/40 text-[#D1D0D0]">
                        {msg.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#988686] mt-1 line-clamp-1">{msg.title}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="glass-card p-5 space-y-3">
              <label className="text-xs font-bold text-white uppercase tracking-wider flex items-center justify-between">
                <span>Select Sound Cue</span>
                <span className="text-[#7C3AED] font-mono text-[11px]">SOUND STUDIO</span>
              </label>

              <div className="space-y-2">
                {interventionConfig.sounds.slice(0, 3).map((snd) => {
                  const isSelected = selectedSound.name === snd.name;
                  const isPlaying = playingSoundName === snd.name;

                  return (
                    <button
                      key={snd.name}
                      onClick={() => handleSoundSelect(snd)}
                      className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all group ${
                        isSelected
                          ? 'bg-[#7C3AED]/20 border-[#7C3AED] text-white shadow-lg'
                          : 'bg-[#0B0B0C] border-[#27272A]/40 text-[#988686] hover:text-[#D1D0D0] hover:border-[#27272A]/70'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg transition-colors ${
                          isPlaying
                            ? 'bg-[#7C3AED] text-white animate-pulse'
                            : isSelected
                            ? 'bg-[#7C3AED]/30 text-[#7C3AED]'
                            : 'bg-[#121214] text-[#988686] group-hover:text-white'
                        }`}>
                          {isPlaying ? <Volume2 className="w-4 h-4 animate-bounce" /> : <Volume2 className="w-4 h-4" />}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white flex items-center gap-2">
                            <span>{snd.name}</span>
                            {isPlaying && (
                              <span className="px-1.5 py-0.2 rounded bg-[#1E8D42]/20 text-[#1E8D42] font-mono text-[9px] font-bold animate-pulse">
                                PLAYING 🔊
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-[#988686]">{snd.description}</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-[#D1D0D0] bg-[#121214] px-2 py-0.5 rounded border border-[#27272A]/30">
                        {snd.type}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          <div className="lg:col-span-7 flex justify-center">
            <div className="w-full max-w-lg glass-card p-6 sm:p-8 rounded-3xl border-2 border-[#7C3AED]/50 shadow-2xl space-y-6 relative bg-gradient-to-b from-[#121214]/95 to-[#0B0B0C]">
              
              <div className="flex items-center justify-between text-[11px] font-mono text-[#988686] border-b border-[#27272A]/30 pb-3">
                <span className="flex items-center gap-1.5 text-white font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-[#7C3AED]" />
                  RUKOji Floating Panel
                </span>
                <span className="px-2.5 py-0.5 rounded bg-[#B73334]/20 text-[#B73334] font-bold">
                  INTERVENTION ACTIVE
                </span>
              </div>

              <div className="flex justify-center pt-1">
                <StickerPreviewDisplay
                  key={selectedSticker.name}
                  sticker={selectedSticker}
                  className="w-72 h-44 sm:h-48"
                />
              </div>

              <div className="text-center space-y-2">
                <h3 className="text-2xl sm:text-3xl font-black text-white font-chennai tracking-tight">
                  {selectedMessage.title}
                </h3>
                <p className="text-sm font-bold text-[#7C3AED] whitespace-pre-line leading-snug">
                  {selectedMessage.mainMessage}
                </p>
                <p className="text-xs text-[#988686] whitespace-pre-line">
                  {selectedMessage.secondaryMessage}
                </p>
              </div>

              <div className="flex items-center justify-center gap-4 pt-2">
                <button
                  onClick={() => alert(`"Go Back" action triggered for ${selectedMessage.title}`)}
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-95 text-white font-black text-xs shadow-xl transition-transform hover:scale-105 flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {selectedMessage.buttonText}
                </button>
                <button
                  onClick={() => alert('Intervention panel closed.')}
                  className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white/80 font-bold text-xs transition-colors flex items-center gap-1.5"
                >
                  <X className="w-3.5 h-3.5" />
                  CLOSE
                </button>
              </div>

              <div className="pt-2 border-t border-[#27272A]/30 text-center space-y-2">
                <button
                  onClick={() => setShowWhyPaused(!showWhyPaused)}
                  className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#7C3AED] hover:underline"
                >
                  <Info className="w-3.5 h-3.5" />
                  {showWhyPaused ? 'Hide Explanation' : 'Why was this paused?'}
                </button>

                {showWhyPaused && (
                  <div className="p-3.5 rounded-xl bg-[#0B0B0C] border border-[#27272A]/40 text-left text-[11px] text-[#988686] space-y-1.5 animate-in fade-in duration-200">
                    <p className="text-white font-medium">
                      RUKOji paused this content because multi-signal on-device AI classified explicit risk signals.
                    </p>
                    <div className="font-mono text-[#1E8D42] font-semibold">
                      • Processing: 100% On-Device Local (Apple NLTagger & Vision)
                    </div>
                    <div className="font-mono text-[#988686]">
                      • Zero keylogging / zero cloud telemetry uploads
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
