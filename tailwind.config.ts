
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				serif: ['Playfair Display', 'serif'],
				mono: ['JetBrains Mono', 'monospace'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				evrgrn: {
					dark: '#0F0F0F',
					darker: '#080808',
					muted: '#1E1E1E',
					light: '#2D2D2D',
					accent: '#00F5D4',
					'accent-light': '#33F8E0',
					'accent-dark': '#00C8AD',
					green: '#00C896',
					'green-light': '#33D3A9',
					'green-dark': '#00A07A',
					white: '#FFFFFF',
					red: '#FF3A4B',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
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
				'glitch': {
					'0%': { transform: 'translate(0)' },
					'20%': { transform: 'translate(-2px, 2px)' },
					'40%': { transform: 'translate(-2px, -2px)' },
					'60%': { transform: 'translate(2px, 2px)' },
					'80%': { transform: 'translate(2px, -2px)' },
					'100%': { transform: 'translate(0)' },
				},
				'pulse-soft': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.8' },
				},
				'fade-in': {
					from: { opacity: '0', transform: 'translateY(10px)' },
					to: { opacity: '1', transform: 'translateY(0)' },
				},
				'fade-in-slow': {
					from: { opacity: '0' },
					to: { opacity: '1' },
				},
				'text-reveal': {
					from: { maskSize: '0% 100%', webkitMaskSize: '0% 100%' },
					to: { maskSize: '100% 100%', webkitMaskSize: '100% 100%' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'glitch': 'glitch 0.5s infinite',
				'glitch-subtle': 'glitch 3s infinite',
				'pulse-soft': 'pulse-soft 3s infinite ease-in-out',
				'fade-in': 'fade-in 0.6s ease-out forwards',
				'fade-in-slow': 'fade-in-slow 1.2s ease-out forwards',
				'text-reveal': 'text-reveal 1s ease-out forwards',
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'noise': "url('data:image/png;base64,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')",
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
