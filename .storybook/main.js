const path = require("path");
module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "storybook-addon-mock/register",
  ],
  framework: "@storybook/react",
  webpackFinal: async (config, { configType }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@app": path.resolve(__dirname, "../src/app"),
      "@context": path.resolve(__dirname, "../src/context"),
      "@hooks": path.resolve(__dirname, "../src/hooks"),
      "@mocks": path.resolve(__dirname, "../src/mocks"),
      "@site": path.resolve(__dirname, "../src/site"),
      "@src": path.resolve(__dirname, "../src"),
    };

    return config;
  },
};
