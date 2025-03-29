/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: "class",
    theme: {
      extend: {
        colors: {
          primary: {
            light: '#007bff',
            dark: '#1E90FF',
          },
          secondary: {
            light: '#6c757d',
            dark: '#2C2C2C',
          },
          background: {
            light: '#f8f9fa',
            dark: '#121212',
          },
          text: {
            light: '#212529',
            dark: '#E0E0E0',
          },
        },
      },
    },
    plugins: [],
  };
  