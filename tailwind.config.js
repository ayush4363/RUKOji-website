export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        rukoji: {
          bg: '#0B0B0C',
          card: '#121214',
          cardHover: '#1E1E22',
          border: 'rgba(255, 255, 255, 0.08)',
          borderSolid: '#27272A',
          textPrimary: '#D1D0D0',
          textSecondary: '#988686',
          darkMauve: '#27272A',
          purple: '#7C3AED',
          purpleLight: '#8B5CF6',
          purpleGlow: 'rgba(124, 58, 237, 0.25)',
          success: '#1E8D42',
          warning: '#EDD06F',
          alert: '#B73334',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['SF Mono', 'Menlo', 'Monaco', 'Courier New', 'monospace'],
        rounded: ['ui-rounded', 'SF Pro Rounded', 'Inter', 'sans-serif'],
        chennai: ['"Chennai Regular"', '"Chennai"', 'Comfortaa', 'Quicksand', 'sans-serif']
      },
      borderRadius: {
        'card': '16px',
        'button': '10px'
      },
      boxShadow: {
        'purple-glow': '0 0 30px rgba(124, 58, 237, 0.25)',
        'card': '0 10px 30px -10px rgba(0, 0, 0, 0.5)'
      }
    },
  },
  plugins: [],
}
