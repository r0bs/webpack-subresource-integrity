var SriPlugin = require('webpack-subresource-integrity');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');

module.exports = {
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    publicPath: '/',
    crossOriginLoading: 'anonymous'
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: 'jquery',
          entry: {
            path: 'https://code.jquery.com/jquery-3.2.1.js'
          },
          global: 'jQuery'
        }
      ]
    }),
    new SriPlugin({ hashFuncNames: ['sha256', 'sha384'] })
  ]
};
