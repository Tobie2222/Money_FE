// /** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "primaryColor": "#438883",
        "textColor": "#666666",
        "borderColor": "#DCDFE3",
        "warningColor": "#EF4E4E",
        "clickButton": "#41C867",
        "backGroundColor": "#F5F4FB",
        "iconColor": "#AAAAAA",
        "backGroundColorWarning": "#FFD7D7",
        "successColor": "#1c7a00"
      },
      scale: {
        'x-2': '2',
      }
    },
  },
  plugins: [],
};
