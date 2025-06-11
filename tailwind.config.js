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
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0',
						opacity: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)',
						opacity: '1'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)',
						opacity: '1'
					},
					to: {
						height: '0',
						opacity: '0'
					}
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' },
				},
				'wave': {
					'0%': { transform: 'rotate(0deg)' },
					'10%': { transform: 'rotate(14deg)' },
					'20%': { transform: 'rotate(-8deg)' },
					'30%': { transform: 'rotate(14deg)' },
					'40%': { transform: 'rotate(-4deg)' },
					'50%': { transform: 'rotate(10deg)' },
					'60%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(0deg)' },
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				'scroll-x': {
					'0%': { transform: 'translateX(0)' },
					'100%': { transform: 'translateX(calc(-100% + 100vw))' },
				},
				'tilt': {
					'0%, 50%, 100%': {
						transform: 'rotate(0deg)',
					},
					'25%': {
						transform: 'rotate(1deg)',
					},
					'75%': {
						transform: 'rotate(-1deg)',
					}
				},
				'shimmer': {
					'0%': { backgroundPosition: '-100% center' },
					'100%': { backgroundPosition: '200% center' },
				},
				'pulse-opacity': {
					'0%, 100%': { opacity: '0.4' },
					'50%': { opacity: '0.8' }
				},
				'rotate-slow': {
					from: { transform: 'rotate(0deg)' },
					to: { transform: 'rotate(360deg)' }
				},
				'spin-glow': {
					'0%': { 
						transform: 'rotate(0deg)',
						boxShadow: '0 0 10px theme(colors.primary.DEFAULT), 0 0 20px theme(colors.accent.DEFAULT)'
					},
					'50%': {
						boxShadow: '0 0 20px theme(colors.primary.DEFAULT), 0 0 30px theme(colors.accent.DEFAULT)'
					},
					'100%': { 
						transform: 'rotate(360deg)',
						boxShadow: '0 0 10px theme(colors.primary.DEFAULT), 0 0 20px theme(colors.accent.DEFAULT)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 6s ease-in-out infinite',
				'wave': 'wave 2.5s ease-in-out infinite',
				'fade-in': 'fade-in 0.5s ease-out forwards',
				'scroll-x': 'scroll-x 30s linear infinite',
				'tilt': 'tilt 10s ease-in-out infinite',
				'shimmer': 'shimmer 3s ease-in-out infinite',
				'pulse-opacity': 'pulse-opacity 3s ease-in-out infinite',
				'rotate': 'rotate-slow 15s linear infinite',
				'spin-glow': 'spin-glow 3s linear infinite',
			},
			fontFamily: {
				'sans': ['Inter', 'sans-serif'],
				'mono': ['Fira Code', 'monospace'],
			},
			backdropFilter: {
				'none': 'none',
				'blur': 'blur(20px)',
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
