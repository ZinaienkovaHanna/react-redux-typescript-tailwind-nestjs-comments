/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                montserrat: ['Rubik', 'sans-serif'],
            },
            colors: {
                'bg-header': '#393a4b',
                'bg-note': '#e3e4f1',
                'text-note': '#494c6b',
                'text-header': '#fafafa',
                'button-hover': '#3a7cfd',
                'error-highlight': 'red',
                'bg-modal': 'rgba(0, 0, 0, 0.5)',
            },
        },
    },
    plugins: [],
};
