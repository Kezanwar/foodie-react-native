const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  // plugins: [
  //   plugin(({ addUtilities }) => {
  //     addUtilities({
  //       ".section-top": {
  //         padding: 3,
  //         borderRadius: 10,
  //         textTransform: `uppercase`,
  //         backgroundColor: `#333`,
  //       },
  //       ".resize-repeat": {
  //         resizeMode: `repeat`,
  //       },
  //     });
  //   }),
  // ],
  theme: {
    colors: {
      white: "#fff",
      black: "#000",
      primary: {
        lighter: "#ffa66b",
        light: "#f27b44",
        "main-04": "#ffa66b2c",
        main: "#f0692a",
        dark: "#ce5f2c",
        darker: "#c65c2b",
        contrast: "#FFFFFF",
      },
      secondary: {
        lighter: "#fcf0ff",
        light: "#e7aaf6",
        "main-04": "#d67ded2c",
        main: "#d67ded",
        dark: "#c860e2",
        darker: "#a63ac1",
        contrast: "#FFFFFF",
      },
      info: {
        lighter: "#d5eeff",
        light: "#72c4ff",
        "main-04": "#33aaff2c",
        main: "#33aaff",
        dark: "#237ab8",
        darker: "#03375d",
        contrast: "#fff",
      },
      success: {
        lighter: "#D8FBDE",
        light: "#86E8AB",
        "main-04": "#36b37f2c",
        main: "#36B37E",
        dark: "#1B806A",
        darker: "#0A5554",
        contrast: "#fff",
      },
      warning: {
        lighter: "#fff6d0",
        light: "#FFD666",
        "main-04": "#ffaa002c",
        main: "#FFAB00",
        dark: "#cc800e",
        darker: "#7A4100",
        contrast: "#637381", //grey-600
      },
      error: {
        lighter: "#FFE9D5",
        light: "#FFAC82",
        "main-04": "#fc4d2e2c",
        main: "#fc4d2e",
        dark: "#B71D18",
        darker: "#7A0916",
        contrast: "#fff",
      },
      grey: {
        100: "#F9FAFB",
        200: "#F4F6F8",
        250: "#e9e9e9",
        300: "#DFE3E8",
        400: "#C4CDD5",
        500: "#919EAB",
        600: "#637381",
        700: "#454F5B",
        800: "#212B36",
        900: "#161C24",
        950: "#171a21",
      },
      type: {
        light: {
          primary: "#212B36",
          secondary: "#637381",
          disabled: "#919EAB",
        },
        dark: {
          primary: "#fff",
          secondary: "#919EAB",
          disabled: "#637381",
        },
      },
      background: {
        light: {
          paper: "#fff",
          default: "#fff",
          neutral: "#F4F6F8",
          paperOpposite: "#212B36",
        },
        dark: {
          paper: "#212B36",
          paperOpposite: "#F9FAFB",
          default: "#161C24",
          neutral: "#919eab37",
        },
      },
    },
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
