/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                rubik: ['Rubik', 'sans-serif'],
            },
            colors: {
                'grayish-blue': '#67727E',
                'dark-blue': '#334253',
                'moderate-blue': '#5357B6',
                'very-light-gray': '#F5F6FA',
                'soft-red': '#ED6368',
                'light-gray': '#E9EBF0',
                'light-grayish-blue': '#C5C6EF',
            },
        },
    },
    plugins: [],
};
