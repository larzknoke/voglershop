module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'serif': ['Arvo', 'Georgia', "Cambria", "Times New Roman", "Times", "serif"],
        'sans': ['Lato', "Helvetica Neue", "Arial", "Noto Sans", "sans-serif"]
      },
      colors: {
        'vogler-yellow': '#FFFEF2',
        'vogler-yellow2': '#EDECB3',
        'vogler-green': '#467F40',
        'vogler-green2': '#BFCCAD',
        'vogler-grey': '#757575',
        'vogler-grey2': '#292b2c',
        'vogler-orange': '#f3953e'
      }
    },
  },
  plugins: [],
}
