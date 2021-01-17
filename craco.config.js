const CracoLessPlugin = require('craco-less');

// const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin');

module.exports = {
  webpack: {
    // plugins: [new SimpleProgressWebpackPlugin()]
  },
  babel: {
    presets: ["@babel/preset-env"],
    plugins: [
      ['import', {libraryName: 'antd', style: true}],
      ["@babel/plugin-proposal-decorators", {legacy: true}],
    ]
  },
  devServer: {
    port: 2099,
    proxy: {
      '/mock/11': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {'@primary-color': '#1d6aa5'},
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
