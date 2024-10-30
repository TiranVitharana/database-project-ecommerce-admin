// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				background: '#151c2c',
				backgroundSoft: '#182237',
				text: '#ffffff',
				textSoft: '#b7bac1',
			},
			animation: {
				'fast-pulse': 'pulse 0.8s ease-in-out infinite',
			},
			keyframes: {
				pulse: {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.4' },
				},
			},
		},
	},
	plugins: [],
};
