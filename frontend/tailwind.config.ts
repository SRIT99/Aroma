import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: { '2xl': '1400px' },
    },
    extend: {
      colors: {
        border: 'var(--line)',
        background: 'var(--bg)',
        foreground: 'var(--ink)',
        primary: {
          DEFAULT: 'var(--ember)',
          light: 'var(--ember-light)',
          deep: 'var(--ember-deep)',
        },
        secondary: 'var(--gold)',
        accent: 'var(--gold)',
        muted: 'var(--smoke)',
        surface: 'var(--bg-elevated)',
        ink: 'var(--ink)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 4px)',
        sm: 'calc(var(--radius) - 8px)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      keyframes: {
        'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
        'accordion-up': { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } },
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        slideIn: { from: { transform: 'translateY(10px)', opacity: '0' }, to: { transform: 'translateY(0)', opacity: '1' } },
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        'marquee-vertical': { '0%': { transform: 'translateY(0)' }, '100%': { transform: 'translateY(-50%)' } },
        float: { '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' }, '50%': { transform: 'translateY(-14px) rotate(1.5deg)' } },
        flicker: { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0.82' } },
        'ember-rise': {
          '0%': { transform: 'translateY(0) scale(1)', opacity: '0.9' },
          '100%': { transform: 'translateY(-120px) scale(0.3)', opacity: '0' },
        },
        grain: {
          '0%, 100%': { transform: 'translate(0,0)' },
          '10%': { transform: 'translate(-1%,-2%)' },
          '30%': { transform: 'translate(2%,1%)' },
          '50%': { transform: 'translate(-2%,3%)' },
          '70%': { transform: 'translate(1%,-1%)' },
          '90%': { transform: 'translate(3%,2%)' },
        },
        reveal: { '0%': { transform: 'translateY(110%)' }, '100%': { transform: 'translateY(0%)' } },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-in': 'slideIn 0.6s ease-out',
        marquee: 'marquee 32s linear infinite',
        'marquee-fast': 'marquee 16s linear infinite',
        'marquee-vertical': 'marquee-vertical 40s linear infinite',
        float: 'float 6s ease-in-out infinite',
        flicker: 'flicker 3.2s ease-in-out infinite',
        'ember-rise': 'ember-rise 4s ease-in infinite',
        grain: 'grain 1s steps(3) infinite',
        reveal: 'reveal 0.9s cubic-bezier(0.65,0,0.35,1) forwards',
      },
      boxShadow: {
        ember: '0 0 40px -8px var(--ember)',
        gold: '0 0 40px -12px var(--gold)',
        card: '0 20px 60px -20px rgba(0,0,0,0.6)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
};

export default config;
