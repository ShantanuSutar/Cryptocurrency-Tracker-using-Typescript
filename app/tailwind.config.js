/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx,ts}"],
  theme: {
    extend: {
      backgroundImage: {
        bannerBG: "url(/src/images/CryptoBanner.jpg)",
      },
    },
  },
  plugins: [],
};
