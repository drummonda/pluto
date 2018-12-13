const webpack = require('webpack');
const path = require('path');
const config = {
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      port: 8000
    },
    entry:  {
      index: ['babel-polyfill', __dirname + '/js/index.js']
    },
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        }
      ],
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css']
    },
};
module.exports = config;
