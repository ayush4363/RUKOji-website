export interface ProductConfig {
  appName: string;
  tagline: string;
  subtagline: string;
  version: string;
  buildNumber: string;
  macOSMinVersion: string;
  supportedBrowsers: string[];
  downloadUrl: string;
  dmgFileName: string;
  githubUrl: string;
  privacyGuarantee: string[];
  platformStatus: {
    macOS: {
      status: "Production / Active";
      label: "macOS 14.0+ Native";
      isAvailable: true;
    };
    android: {
      status: "Planned / In Development";
      label: "Android Beta (Coming Soon)";
      isAvailable: false;
    };
  };
}

export const productConfig: ProductConfig = {
  appName: "RUKOji",
  tagline: "Pause before you scroll.",
  subtagline: "RUKOji gives you a moment to stop, breathe, and choose what matters — with instant adult website blocking and mindful focus protection.",
  version: "4.0.0",
  buildNumber: "400",
  macOSMinVersion: "macOS 14.0 Sonoma or later",
  supportedBrowsers: ["Google Chrome", "Apple Safari", "Brave Browser", "Microsoft Edge"],
  downloadUrl: "#download",
  dmgFileName: "RUKOji.dmg",
  githubUrl: "https://github.com",
  privacyGuarantee: [
    "100% On-Device Processing (Zero Cloud Uploads)",
    "0% Keystroke Monitoring (No System Keylogger)",
    "0% Continuous Screen Recording (No Background Screenshots)",
    "Local Storage Only (~/Library/Application Support/RUKOji)"
  ],
  platformStatus: {
    macOS: {
      status: "Production / Active",
      label: "macOS 14.0+ Native",
      isAvailable: true
    },
    android: {
      status: "Planned / In Development",
      label: "Android Beta (Coming Soon)",
      isAvailable: false
    }
  }
};
