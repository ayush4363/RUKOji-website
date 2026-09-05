import jisRaahAudio from '../assets/sounds/jis-raah-pe-tum-chal-rahe-ho.mp3';
import fahhhAudio from '../assets/sounds/fahhhaudio.mp3';

export interface PresetSticker {
  name: string;
  category: string;
  imageSrc: string;
  fallbackSrc?: string;
  isDefault?: boolean;
}

export interface PresetMessage {
  name: string;
  title: string;
  mainMessage: string;
  secondaryMessage: string;
  buttonText: string;
  category: string;
}

export interface PresetSound {
  name: string;
  type: string;
  description: string;
  audioSrc?: string;
}

export const interventionConfig = {
  stickers: [
    {
      name: "Mahatma Gandhi",
      category: "Default Presets",
      imageSrc: "./assets/gadhijimeme.jpg",
      fallbackSrc: "./assets/gandhiji.jpg",
      isDefault: true
    },
    {
      name: "Dog Meme",
      category: "Humor & Memes",
      imageSrc: "./assets/dogmeme.jpg",
      fallbackSrc: "./assets/dogmeme.jpg",
      isDefault: false
    }
  ] as PresetSticker[],

  messages: [
    {
      name: "Supportive (Hinglish)",
      title: "Beta, ruk ja ❤️",
      mainMessage: "Jis raaste par tum ja rahe ho,\nthoda ruk aur soch.",
      secondaryMessage: "Take a breath. Choose what matters.",
      buttonText: "Go Back",
      category: "Supportive"
    },
    {
      name: "No More Shorts",
      title: "No More Shorts! 🎬",
      mainMessage: "Shorts & Reels dekh ke time waste mat karo.\nFocus on what really matters! 🚀",
      secondaryMessage: "Take a breath. Choose deep focus over infinite scrolling.",
      buttonText: "Back to Focus",
      category: "Shorts"
    },
    {
      name: "Funny (Hinglish)",
      title: "Arre bhai 😂 RUKOji keh raha hai.",
      mainMessage: "Kya yeh abhi itna zaroori hai?\nGoal yaad rakho!",
      secondaryMessage: "Your future self will thank you for closing this.",
      buttonText: "Go Back",
      category: "Funny"
    },
    {
      name: "Motivational (English)",
      title: "Don't sacrifice your goal 🔥",
      mainMessage: "5 minutes of temporary distraction is not worth losing your streak.",
      secondaryMessage: "Focus on your deep work.",
      buttonText: "Return to Focus",
      category: "Motivational"
    },
    {
      name: "Mindful Pause (Zen)",
      title: "Breathe in... Breathe out 🌿",
      mainMessage: "Pause for just 10 seconds. Is this intentional?",
      secondaryMessage: "Mindful choices build focus.",
      buttonText: "Pause & Reflect",
      category: "Zen"
    }
  ] as PresetMessage[],

  sounds: [
    { name: "Jis Raah Pe Tum", type: "Vocal MP3 Audio", description: "Empathetic vocal track reminder", audioSrc: jisRaahAudio },
    { name: "Fahhh Audio", type: "Expressive Audio", description: "Disruptive vocal audio clip", audioSrc: fahhhAudio },
    { name: "Zen Bell Chime", type: "Calming Sound", description: "Resonant glass chime tone", audioSrc: "synth:bell" },
    { name: "Soft Gong", type: "Mindfulness Gong", description: "Deep grounding reverberation", audioSrc: "synth:gong" },
    { name: "Water Droplet", type: "Subtle Cue", description: "Crisp natural acoustic pop", audioSrc: "synth:droplet" }
  ] as PresetSound[]
};
