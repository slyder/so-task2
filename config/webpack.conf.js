'use strict'
const _ = require('lodash')
const webpack = require('webpack')
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin')
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin')

const helpers = require('./helpers')

const commonConfig = require('./common.webpack.conf.js')

const METADATA = {
  title: 'ts+webpack seed',
  BASE_URL: '/',
  LOG_LEVEL: 'error'
}

module.exports = {
  metadata: METADATA,
  data: _.extend(commonConfig.data, {
    entry: {
      'main': './src/main.ts'
    },
    plugins: [
      new ForkCheckerPlugin(),
      new ContextReplacementPlugin(
        // The (\\|\/) piece accounts for path separators in *nix and Windows
        /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
        helpers.root('src') // location of your src
      )
    ]
  })
}
