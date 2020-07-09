const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')


module.exports = {
  mode: 'production',
  plugins: [
    new UglifyJsPlugin(), 
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'), //用于优化 CSS 的 CSS处理器
      cssProcessorOptions: { safe: true, discardComments: { removeAll: false } },
      canPrint: true //是否可以将消息打印到控制台
    })
  ]
}