'use strict'
const helpers = require('./helpers')

// Short usage reference
// `ENV` = local | development | stage | release | production
// `NODE_ENV` = development | test | production
// `MOCK_MODE` = none | api | loader | all
// `LOG_LEVEL` = error | warn | info | debug

module.exports = {
  data: {
    cache: true,
    resolve: {
      extensions: [ '.ts', '.js', '.scss' ],
      modules: [
        helpers.root('src'),
        'node_modules'
      ],
      mainFiles: [ 'index' ]
    },
    output: {
      path: helpers.root('public'),
      filename: '[name].js',
      sourceMapFilename: '[name].map',
      chunkFilename: '[id].chunk.js'
    },
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.ts$/,
          loader: 'tslint',
          exclude: [
            /node_modules/,
            /\.(spec|e2e)\.ts$/
          ]
        },
        {
          enforce: 'pre',
          test: /\.js$/,
          loader: 'source-map'
        },
        {
          test: /\.ts$/,
          loader: 'awesome-typescript',
          exclude: [ /\.(spec|e2e)\.ts$/ ]
        },
        {
          test: /\.json$/,
          loader: 'json'
        },
        {
          test: /\.html$/,
          loader: 'raw',
          exclude: [ helpers.root('src/index.html') ]
        },
        {
          test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
          loader: 'file?name=assets/[name].[hash].[ext]'
        },
        {
          test: /\.scss/,
          loader: 'raw!postcss?sourceMap!sass?sourceMap',
          include: helpers.root('src/app')
        },
        {
          test: /main\.scss/,
          loader: 'style!css!postcss!sass'
        },
        {
          test: /\.css/,
          loader: 'style!css!postcss'
        }
      ],
      noParse: [
        /zone\.js\/dist\/.+/,
        /angular2\/bundles\/.+/,
        /\.(spec|e2e)\.ts$/
      ]
    },
    node: {
      global: true,
      crypto: 'empty',
      process: true,
      module: false,
      clearImmediate: false,
      setImmediate: false
    },
    devServer: {
      port: 8081
    }
  }
}
