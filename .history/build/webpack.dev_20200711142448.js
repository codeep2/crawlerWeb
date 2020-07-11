const webpack = require('webpack')

module.exports = {
  output: {
    filename: 'js/[name]_[hash].js',
    chunkFilename: 'js/[name]_[hash].js',
    path: path.resolve('dist')
  },
  devServer: {
    port: '8383',
    contentBase: './dist',
    hot: true,
    overlay: true
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
}