/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                myColor: '#333',
                mutedPurp: '#420EA1',
                darkPurp: '#280961',
                basePurp: '#5C14E0',
                lightCol: '#6115ED',
                darker: '#5112C7',
                lightest: '#d5bfff',
            },
        },
    },
    plugins: [],
}
