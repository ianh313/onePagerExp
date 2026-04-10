/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy:      { DEFAULT: '#1B3A4B', 2: '#2A5369' },
        gold:      { DEFAULT: '#C4A35A', lt: '#E8D5A3' },
        cream:     '#F5F0E8',
        'brown-dk':'#2D1B0E',
        'warm-dk': '#1A120A',
        'site-teal':'#3A7068',
        ink:       '#1A1008',
        'ink-mid': '#4A4036',
        'ink-lt':  '#8A7A6A',
      },
      fontFamily: {
        serif: ['"Noto Serif TC"', 'Georgia', 'serif'],
        sans:  ['"Noto Sans TC"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      animation: {
        cue: 'cue 2.2s ease-in-out infinite',
      },
      keyframes: {
        cue: {
          '0%, 100%': { transform: 'translateX(-50%) translateY(0)',  opacity: '0.5' },
          '50%':      { transform: 'translateX(-50%) translateY(8px)', opacity: '1' },
        },
      },
      transitionDelay: {
        150:  '150ms',
        300:  '300ms',
        450:  '450ms',
        600:  '600ms',
        750:  '750ms',
        900:  '900ms',
        1100: '1100ms',
      },
      transitionDuration: {
        700: '700ms',
      },
      // Use dynamic viewport height so sections fill the screen correctly
      // even when the mobile browser address bar is visible
      height:    { screen: '100dvh' },
      minHeight: { screen: '100dvh' },
    },
  },
  plugins: [],
}
