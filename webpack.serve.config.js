/* eslint-disable @typescript-eslint/no-var-requires */
const config = require('./webpack.config.js')
const path = require('path')

config.entry = {main: './src/demo/index.js'};
config.output = {
    filename: './main.js',
    path: path.resolve(__dirname),
};
config.mode = 'development'
config.externals = undefined
config.devtool = 'inline-source-map'
module.exports = config;
