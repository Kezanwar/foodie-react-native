module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {},
    screens: {
      sm: "380px",
      md: "420px",
      lg: "680px",
      // or maybe name them after devices for `tablet:flex-row`
      tablet: "1024px",
    },
    fontFamily: {
      black: ["Poppins-Black"],
      "extra-bold": ["Poppins-ExtraBold"],
      bold: ["Poppins-Bold"],
      "semi-bold": ["Poppins-SemiBold"],
      "extra-light": ["Poppins-ExtraLight"],
      light: ["Poppins-Light"],
      thin: ["Poppins-Thin"],
      medium: ["Poppins-Medium"],
      regular: ["Poppins-Regular"],
    },
    extend: {
      spacing: {},
      borderRadius: {},
    },
  },
};
