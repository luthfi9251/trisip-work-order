// tailwind.config.js
import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./node_modules/@heroui/theme/dist/components/(button|date-picker|ripple|spinner|calendar|date-input|form|popover).{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    darkMode: "class",
    plugins: [heroui()],
};
