const fs = require('fs')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const merge = require('webpack-merge')

const path = require('path')
const base = path.join(__dirname, '..')

const productionConfig = require('./webpack.prod.js')
const developmentConfig = require('./webpack.dev.js')

const setConfig = (entryPath, type) => {
  const entries = {}
  const htmlPlugins = []
  fs.readdirSync(entryPath).forEach(filename => {
    if (type === 'entry') {
      entries[filename] = path.join(entryPath, filename, 'main.js')
    }
    else if (type === 'html') {
      htmlPlugins.push(
        new HtmlWebpackPlugin({
          title: 'baidutuiguang',
          filename: `${filename}.html`,
          template: path.join(entryPath, filename, 'index.html')
        })
      )
    }
  })
  return type === 'entry' ? entries : htmlPlugins
}

const commonConfig = env => {
  const devMode = env !== 'production'

  const imageloader = [
    {
      loader: 'file-loader',
      options: {
        name: devMode ? '[name].[ext]' : '[hash].[ext]',
        outputPath: 'images'
      }
    },    
    {
      loader: 'image-webpack-loader',
      options: {       
        mozjpeg: {
          progressive: true,
          quality: 65
        },
        optipng: {
          enabled: false,
        },
        pngquant: {
          quality: [0.65, 0.90],
          speed: 4
        },
        gifsicle: {
          interlaced: false,
        },
        webp: {
          quality: 75
        }
      }
    }
  ]

  const cssloader = [
    {
      loader: MiniCssExtractPlugin.loader, //将css单独打包成文件
      options: {
        hmr: devMode,
      }
    },
    'css-loader',
    'sass-loader'
  ]

  return {
    entry: setConfig(path.resolve(base, 'src'), 'entry'),
    output: {
      filename: 'js/[name]_[hash].js',
      path: path.resolve(base, 'dist')
    },
    module: {
      rules: [
        {
          test: /\.s?css$/,
          exclude: /node_modules/,
          use: cssloader
        },
        {
          test: /\.(gif|png|jpe?g|svg)$/,
          exclude: /node_modules/,
          use: imageloader
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        }
      ]
    },
    plugins: [
      ...setConfig(path.resolve(base, 'src'), 'html'),
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: devMode ? 'css/[name].css' : 'css/[name].[hash].css'
      })
    ],
    optimization: {
      splitChunks: {
        chunks: 'all',
        minSize: 30000,
        maxSize: 0,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        automaticNameDelimiter: '~',
        name: true,
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10
          },
          default: {
            minChunks: 2, //最小公用次数
            priority: -20, //优先级
            reuseExistingChunk: true
          }
        }
      }
    }
  }
}

module.exports = env => {
  const config = env === 'production' ? productionConfig : developmentConfig
  return merge(commonConfig(env), config)
}

