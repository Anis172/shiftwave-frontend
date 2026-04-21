/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#faf5ff',
                    100: '#f3e8ff',
                    200: '#e9d5ff',
                    300: '#d8b4fe',
                    400: '#c084fc',
                    500: '#a855f7',
                    600: '#9333ea',
                    700: '#7e22ce',
                    800: '#6b21a8',
                    900: '#581c87',
                },
                dream: {
                    blue: '#60a5fa',
                    purple: '#a855f7',
                    pink: '#ec4899',
                    cyan: '#22d3ee',
                },
                glow: {
                    violet: '#c084fc',
                    pink: '#f472b6',
                    blue: '#93c5fd',
                },
                success: '#10b981',
                warning: '#fbbf24',
                danger: '#f43f5e',
            },
            backgroundImage: {
                'dreamy-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                'dreamy-sunset': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                'dreamy-ocean': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                'dreamy-purple': 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
                'dreamy-cyber': 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)',
            },
            animation: {
                'float': 'float 3s ease-in-out infinite',
                'glow': 'glow 2s ease-in-out infinite',
                'shimmer': 'shimmer 2s linear infinite',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                glow: {
                    '0%, 100%': { boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)' },
                    '50%': { boxShadow: '0 0 30px rgba(168, 85, 247, 0.8)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-1000px 0' },
                    '100%': { backgroundPosition: '1000px 0' },
                },
            },
        },
    },
    plugins: [],
}

