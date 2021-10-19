/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
module.exports = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
  env: {
    api: `${process.env.PORT  }/`,
  },
  serverRuntimeConfig: {
    apiUrl: '',
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    staticFolder: '/public',
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.plugins.push(new webpack.IgnorePlugin(/^pg-native$/));
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config
  },
};
