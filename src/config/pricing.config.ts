export interface PricingTier {
  id: string;
  name: string;
  priceDisplay: string;
  pricePeriod?: string;
  badge?: string;
  description: string;
  highlighted?: boolean;
  features: string[];
  ctaText: string;
  ctaLink: string;
}

export interface PricingConfig {
  isPlannedPricing: boolean;
  pricingNotice: string;
  currencySymbol: string;
  currencyCode: string;
  tiers: PricingTier[];
}

export const pricingConfig: PricingConfig = {
  isPlannedPricing: true,
  pricingNotice: "RUKOji macOS v4.0 is currently 100% Free during initial launch. Pricing options below represent upcoming tier plans.",
  currencySymbol: "₹",
  currencyCode: "INR",
  tiers: [
    {
      id: "free",
      name: "FREE",
      priceDisplay: "₹0",
      pricePeriod: "forever",
      description: "Essential mindful pause protection for individuals.",
      highlighted: false,
      features: [
        "Core Mindful Pause Intervention Overlay",
        "YouTube Shorts & Reels Interceptor",
        "Default Sticker Presets (Gandhi & Dog Meme)",
        "Voluntary Cooldown Timer (15s to 60m)",
        "100% On-Device Local AI NLP Classifier",
        "Zero Keylogging & Zero Cloud Uploads"
      ],
      ctaText: "Download Free for Mac",
      ctaLink: "#download"
    },
    {
      id: "pro-monthly",
      name: "PRO MONTHLY",
      priceDisplay: "₹199",
      pricePeriod: "per month",
      badge: "MOST POPULAR",
      description: "Advanced protection & custom intervention studio.",
      highlighted: true,
      features: [
        "All Free Features Included",
        "Unlimited Custom Image Sticker Imports",
        "Custom Hinglish & English Message Studio",
        "Custom Audio Sound Studio Uploads",
        "Repeated Attempt Browser Lockout Engine",
        "Timed Protection App Lock (Persistent Lock)",
        "Max Privacy Mode & Diagnostic Export"
      ],
      ctaText: "Get Pro Access",
      ctaLink: "#download"
    },
    {
      id: "pro-yearly",
      name: "YEARLY FOCUS",
      priceDisplay: "₹1,499",
      pricePeriod: "per year",
      badge: "SAVE 37%",
      description: "Uncompromised digital focus for dedicated creators.",
      highlighted: false,
      features: [
        "All Pro Features Included",
        "Priority On-Device AI Model Updates",
        "Multi-Device macOS Sync",
        "Early Access to Android Companion (Planned)",
        "Direct Developer Support Channel",
        "Lifetime Version Upgrade Guarantees"
      ],
      ctaText: "Claim Yearly Plan",
      ctaLink: "#download"
    }
  ]
};
