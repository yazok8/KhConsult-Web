import type { Config } from "tailwindcss";
import {  fontFamily  } from "tailwindcss/defaultTheme";
import typography from "@tailwindcss/typography"

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
      },
  },
  variants: {
    extend: {
      animation: ['motion-safe'],
    },
  },
  plugins: [typography],

} satisfies Config;

export default config;
