/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
    theme: {
        extend: {},
    },
    plugins: [require("daisyui"), require('@tailwindcss/line-clamp'), require('@tailwindcss/typography'),],
    daisyui: {
        themes: ["winter"]
    }
}

