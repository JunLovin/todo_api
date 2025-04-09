/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class', 
    theme: {
        extend: {
            colors: {
                // Modo claro
                primary: {
                    DEFAULT: '#8B5CF6',
                    hover: '#7C3AED',
                },
                secondary: {
                    DEFAULT: '#10B981',
                    hover: '#059669',
                },
                accent: {
                    DEFAULT: '#F59E0B',
                    hover: '#D97706',
                },
                background: {
                    DEFAULT: '#F9FAFB',
                    secondary: '#F3F4F6',
                },
                text: {
                    DEFAULT: '#1F2937',
                    secondary: '#6B7280',
                },
                border: '#E5E7EB',
                success: '#10B981',
                error: '#EF4444',

                // Modo oscuro
                dark: {
                    primary: {
                        DEFAULT: '#A78BFA',
                        hover: '#8B5CF6',
                    },
                    secondary: {
                        DEFAULT: '#34D399',
                        hover: '#10B981',
                    },
                    accent: {
                        DEFAULT: '#FBBF24',
                        hover: '#F59E0B',
                    },
                    background: {
                        DEFAULT: '#111827',
                        secondary: '#1F2937',
                    },
                    text: {
                        DEFAULT: '#F9FAFB',
                        secondary: '#9CA3AF',
                    },
                    border: '#374151',
                    success: '#34D399',
                    error: '#F87171',
                }
            }
        },
    },
    plugins: [],
}