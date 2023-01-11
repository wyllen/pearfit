module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/preset-scss"
  ],
  "framework": "@storybook/react",
  "core": {
    "builder": "@storybook/builder-webpack5"
  },
  webpackFinal: async (config, { configType }) => {
    // get index of css rule
    const ruleScssIndex = config.module.rules.findIndex(
      (rule) => rule.test.toString() === "/\\.s[ca]ss$/"
    );

    const ruleCssIndex = config.module.rules.findIndex(
      (rule) => rule.test.toString() === "/\\.css$/"
    );
    // map over the 'use' array of the css rule and set the 'module' option to true
    config.module.rules[ruleScssIndex].use.map((item) => {
      if (item.loader && item.loader.includes("/css-loader/")) {
        item.options = {
          modules : {
					exportLocalsConvention : 'camelCase'
        }
      }
      }
    })
    config.module.rules[ruleCssIndex].use.map((item) => {
      if (item.loader && item.loader.includes("/css-loader/")) {
        item.options.modules = {
					exportLocalsConvention : 'camelCase'
        };
      }

      return item;
    });

    return config;
  },
}