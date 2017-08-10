'use strict'
const _ = require('lodash')
const autoprefixer = require('autoprefixer')
const webpackMerge = require('webpack-merge')
const DefinePlugin = require('webpack/lib/DefinePlugin')
const CompressionPlugin = require('compression-webpack-plugin')
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin')

const helpers = require('./helpers')

const config = require('./webpack.conf.js')

const ENV = process.env.ENV = 'local'
process.env.NODE_ENV = 'development'

const METADATA = _.extend(config.metadata, {
  ENV: ENV,
  LOG_LEVEL: 'info'
})

module.exports = webpackMerge(config.data, {
  devtool: 'source-map',
  output: {
    library: 'ac_[name]',
    libraryTarget: 'var',
  },
  plugins: [
    new CompressionPlugin({
      regExp: /\.css$|\.html$|\.js$|\.map$/,
      algorithm: 'gzip'
    }),
    new DefinePlugin({
      'ENV': JSON.stringify(METADATA.ENV),
      'HMR': METADATA.HMR,
      'LOG_LEVEL': JSON.stringify(METADATA.LOG_LEVEL),
      'process.env': {
        'ENV': JSON.stringify(METADATA.ENV),
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'HMR': METADATA.HMR,
      }
    }),
    new LoaderOptionsPlugin({
      debug: true,
      options: {
        tslint: {
          emitErrors: false,
          failOnHint: false,
          resourcePath: 'src'
        },
        postcss: [
          autoprefixer({ browsers: [ 'last 3 versions' ] })
        ],
        sassLoader: {
          outputStyle: 'compressed',
          precision: 10,
          sourceComments: false,
          includePaths: [ helpers.root('src ') ]
        },
        context: '/'
      }
    })
  ]
})
