module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          extensions: [".ios.js", ".android.js", ".js", ".ts", ".tsx", ".json"],
          alias: {
            lib: "./src/lib",
            components: "./src/components",
            features: "./src/features",
            hocs: "./src/hocs",
            store: "./src/store",
            types: "./src/types",
            hooks: "./src/hooks",
            theme: "./src/theme",
            constants: "./src/constants",
            util: "./src/util",
            navigation: "./src/navigation",
            screens: "./src/screens",
          },
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};
