import type { Config } from "tailwindcss";
import {  fontFamily  } from "tailwindcss/defaultTheme";
import typography from "@tailwindcss/typography"
import aspectRatio from "@tailwindcss/aspect-ratio";
import animatePlugin from "tailwindcss-animate";

const config: Config = {
	optimizeFonts: true,
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
		backgroundImage: {
			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
			'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
		  },
		fontFamily:{
			sans:["var(--font-sans)", ...fontFamily.sans]
		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
		  spacing: {
			'128': '32rem',
		  },
		  keyframes: {
			'accordion-down': {
			  from: { height: '0' },
			  to: { height: 'var(--radix-accordion-content-height)' },
			},
			'accordion-up': {
			  from: { height: 'var(--radix-accordion-content-height)' },
			  to: { height: '0' },
			},
			float: {
			  '0%, 100%': { transform: 'translateY(0)' },
			  '50%': { transform: 'translateY(-10px)' },
			},
			pulse: {
			  '0%, 100%': { opacity: '1' },
			  '50%': { opacity: '.5' },
			},
			fadeUp: {
				'0%': { opacity: '0', transform: 'translateY(20px)' },
				'100%': { opacity: '1', transform: 'translateY(0)' },
			  },
			  fadeIn: {
				'0%': { opacity: '0' },
				'100%': { opacity: '1' },
			  },
			  slideIn: {
				'0%': { transform: 'translateX(-100%)' },
				'100%': { transform: 'translateX(0)' },
			  },
		  },
		fontSize: {
			// Example: Fluid font size from 1.5rem to 3rem
			'fluid-2xl': 'clamp(1.5rem, 2vw + 1rem, 2.5rem)',
			'fluid-3xl': 'clamp(1.75rem, 2.5vw + 1rem, 3rem)',
			'fluid-5xl': 'clamp(2.25rem, 3vw + 1rem, 4rem)',
			'fluid-6xl': 'clamp(2.5rem, 4vw + 1rem, 5rem)',
		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
		
  	},
	  bounce: {
		'0%, 100%': { transform: 'translateY(0)' },
		'50%': { transform: 'translateY(-10px)' },
	  },
	  animation: {
        jump: 'bounce 1s infinite',
		'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        float: 'float 3s ease-in-out infinite',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
		'fade-up': 'fadeUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-in': 'slideIn 0.5s ease-out'
      },
  },
  variants: {
    extend: {
      animation: ['motion-safe'],
    },
  },
  plugins: [typography,
    animatePlugin,
    aspectRatio,],

} satisfies Config;

export default config;
