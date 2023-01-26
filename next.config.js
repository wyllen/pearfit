/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
//s!process.env.SKIP_ENV_VALIDATION && (await import('./src/env/server.mjs'));

const i18nConfig = require('./next-i18next.config.js');

const config = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: i18nConfig.i18n,
  webpack: (config) => {
    // add alias for scss folder
    //config.resolve.alias['@scss'] = path.resolve(__dirname, 'src/scss');

    // camel-case style names from css modules

    /** @type any */
    const webpackConfig = config;

    webpackConfig.module.rules
      .find(({ oneOf }) => !!oneOf)
      .oneOf.filter(({ use }) => JSON.stringify(use)?.includes('css-loader'))
      .reduce((acc, { use }) => acc.concat(use), [])
      .forEach(({ options }) => {
        if (options.modules) {
          options.modules.exportLocalsConvention = 'camelCase';
        }
      });

    return config;
  },
};
module.exports = config;
