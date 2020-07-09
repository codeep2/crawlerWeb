const webpack = require('webpack')

module.exports = {
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