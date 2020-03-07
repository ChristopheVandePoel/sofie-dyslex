module.exports = {
  lintOnSave: false,
  publicPath: '',
  configureWebpack: {
    output: {
      filename: '[name].[hash].js',
    },
  },
  chainWebpack: (config) => {
    if (process.env.NODE_ENV === 'development') {
      config.plugins.delete('preload');
    }
  },
};
