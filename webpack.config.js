var path = require('path')
module.exports = {
  entry: './public/javascripts/app.js',
  output: {
    path: path.resolve(__dirname, './public/javascripts'),
    filename: 'app.bundle.js',
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }]
  }
}