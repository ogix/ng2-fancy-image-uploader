const webpack = require('webpack');
const path = require('path');

module.exports = {
    devtool: 'cheap-module-source-map',
    entry: './index.ts',
    output: {
        path: './dist',
        filename: 'index.js'
    },
    resolve: {
      root: [ path.join(__dirname, 'src') ],
      extensions: ['', '.ts', '.js']
    },
    module: {
        loaders: [
          { test: /\.ts$/, loaders: ['awesome-typescript-loader'] },
          { test: /\.(html|css)$/, loader: 'raw-loader' }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
            output: {
                comments: false,
            },
        }),
    ]
}