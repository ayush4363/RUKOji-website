export interface FeatureItem {
  id: string;
  title: string;
  category: "production" | "mac-only" | "planned" | "developer";
  statusText: string;
  description: string;
  benefit: string;
  iconName: string;
  screenName: string;
}

export const featuresConfig: FeatureItem[] = [
  {
    id: "intervention-overlay",
    title: "Floating ScreenSaver Overlay",
    category: "production",
    statusText: "Production / macOS",
    description: "System-wide NSPanel hovering at .screenSaver window level over all apps when distraction or adult content is detected.",
    benefit: "Creates an unmissable physical boundary before impulse scrolling begins.",
    iconName: "Shield",
    screenName: "Intervention Overlay"
  },
  {
    id: "short-form-blocking",
    title: "Short-Form Video Interceptor",
    category: "production",
    statusText: "Production / Active",
    description: "Dedicated toggle to block YouTube Shorts, Instagram Reels, TikTok, Facebook Reels, and Snapchat Spotlight.",
    benefit: "Eliminates high-dopamine endless feeds without blocking main productive websites.",
    iconName: "Video",
    screenName: "Protection Settings"
  },
  {
    id: "on-device-ai",
    title: "On-Device AI Engine (NLP + Vision)",
    category: "production",
    statusText: "Production / Local ML",
    description: "Combines Apple NaturalLanguage NLTagger, Vision Framework, Domain Reputations, and False Positive Reducer.",
    benefit: "Protects privacy by classifying content 100% locally on your Mac with zero telemetry.",
    iconName: "Brain",
    screenName: "AI Dashboard"
  },
  {
    id: "voluntary-cooldown",
    title: "Custom Cooldown & Timed App Lock",
    category: "production",
    statusText: "Production / Active",
    description: "Enforces voluntary breaks with custom minutes & seconds. Persistent protection_lock.json prevents quitting RUKOji while active.",
    benefit: "Removes willpower friction during deep focus sessions.",
    iconName: "Timer",
    screenName: "Cooldown Center"
  },
  {
    id: "browser-lockout",
    title: "Repeated Attempt Browser Lockout",
    category: "production",
    statusText: "Production / Active",
    description: "Automatically closes browser applications if adult or distracting content is repeatedly attempted (configurable limit).",
    benefit: "Breaks compulsion cycles by enforcing dedicated time-out periods.",
    iconName: "Lock",
    screenName: "Cooldown & Lockout"
  },
  {
    id: "sticker-studio",
    title: "Sticker Studio & Visual Guardians",
    category: "production",
    statusText: "Production / Custom",
    description: "Import custom PNG/JPEG images or use presets (Mahatma Gandhi, Dog Meme) to personalize your intervention overlay.",
    benefit: "Replaces frustrating error screens with emotional, relatable visual pauses.",
    iconName: "Sparkles",
    screenName: "Sticker Studio"
  },
  {
    id: "message-studio",
    title: "Hinglish & English Message Studio",
    category: "production",
    statusText: "Production / Custom",
    description: "Preset & custom templates with supportive, motivational, funny, or zen Hinglish quotes ('Beta, ruk ja ❤️').",
    benefit: "Communicates in a warm, relatable human voice rather than rigid corporate warnings.",
    iconName: "MessageSquare",
    screenName: "Message Studio"
  },
  {
    id: "sound-studio",
    title: "Sound Feedback & Custom Audio",
    category: "production",
    statusText: "Production / Custom",
    description: "Play custom MP3 audio tracks ('Jis Raah Pe Tum', 'Fahhh Audio') or calming system chimes during pause events.",
    benefit: "Provides immediate auditory cueing to disrupt passive scrolling habits.",
    iconName: "Volume2",
    screenName: "Sound Studio"
  },
  {
    id: "privacy-audit",
    title: "Real-Time Privacy Audit Matrix",
    category: "production",
    statusText: "Production / Verified",
    description: "Transparent dashboard verifying 0% keylogging, 0% screenshots, and 0% cloud data transmission.",
    benefit: "Gives complete peace of mind that your personal browsing remains private.",
    iconName: "EyeOff",
    screenName: "Privacy Center"
  },
  {
    id: "android-app",
    title: "Android Companion App",
    category: "planned",
    statusText: "Planned / Coming Soon",
    description: "Accessibility Service & VPN filtering for Android smartphones (currently in architectural design).",
    benefit: "Will extend mindful pause protection to mobile devices.",
    iconName: "Smartphone",
    screenName: "Android Showcase"
  }
];
