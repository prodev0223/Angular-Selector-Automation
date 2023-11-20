module.exports = {
  mode: "",
  content: ["./src/**/*.{html,scss,js,ts}"],
  darkMode: "class",
  theme: {
    extend: {
      borderWidth: {
        '1': '1px',
      },
      screens: {
        xs: { max: '640px' },
        sm: { 'min': '640px', 'max': '767px' },
        md: { 'min': '768px', 'max': '1023px' },
        lg: { 'min': '1024px', 'max': '1279px' },
        xl: { 'min': '1280px', 'max': '1535px' },
        xxl: { 'min': '1536px' },
      },
      fontSize: {
        base: "1rem",
      },
      colors: {
        primary: "#6979f8",
        surface: "#151c2d",
        warning: "#f44336",
        success: "#00C48C",
        light: "#E9F0FB",
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        /* ------------------------------- background ------------------------------- */
        '.surface-bg-color': {
          '@apply bg-white dark:bg-surface': {}
        },
        '.light-bg-color': {
          '@apply bg-light dark:bg-slate-800': {}
        },
        '.highlight-bg-color': {
          '@apply bg-gray-50 dark:bg-slate-800': {}
        },
        '.secondary-bg-color': {
          '@apply bg-gray-200 dark:bg-slate-700': {}
        },
        /* --------------------------------- border --------------------------------- */
        '.secondary-border-color': {
          '@apply border-gray-200 dark:border-slate-700': {}
        },
        /* ---------------------------------- text ---------------------------------- */
        '.text-strong': {
          '@apply text-zinc-800 dark:text-gray-200': {}
        },
        '.text-dark': {
          '@apply text-zinc-700 dark:text-gray-300': {}
        },
        '.text-mild': {
          '@apply text-zinc-600 dark:text-gray-400': {}
        },
        '.text-pale': {
          '@apply text-gray-500 dark:text-gray-400': {}
        },
      })
    }
  ],
};
