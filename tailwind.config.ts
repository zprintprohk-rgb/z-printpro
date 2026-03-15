import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // 品牌主色（Figma 科技感）
        brand: {
          blue: '#2972F4',
          blueDark: '#1E5BC4',
          blueLight: '#5C94F6',
          orange: '#FF8223',
          orangeDark: '#E66A00',
          orangeLight: '#FF9D4D',
          dark: '#1A1A2E',
          light: '#F8F9FA',
        },
        // 紧迫感颜色（NextDayFlyers 风格）
        urgency: {
          red: '#DC2626',
          redLight: '#FEE2E2',
          green: '#16A34A',
          greenLight: '#DCFCE7',
          yellow: '#F59E0B',
          yellowLight: '#FEF3C7',
        },
        // 产品类别色
        product: {
          flyer: '#2972F4',
          bag: '#16A34A',
          sticker: '#F59E0B',
          box: '#DC2626',
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-fast': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'slide-in': 'slideIn 0.3s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-in-up': 'slideInUp 0.4s ease-out',
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 20px rgba(41, 114, 244, 0.3)',
        'glow-orange': '0 0 20px rgba(255, 130, 35, 0.3)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
};

export default config;