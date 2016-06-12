const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const packages = require('./package.json');

//Paths 
const path = require('path');
const outFolder = path.resolve(__dirname, './wwwroot');

//Configuration values depending on environment 
const entryPoint = './app/app.js';
const plugins = [
    new HtmlWebpackPlugin({
        template: __dirname + '/index.tmpl.html',
        hash: true
    }),
    new ExtractTextPlugin('style-bundle-[hash].css', {
        allChunks: true
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor-[hash].js', Infinity),
    new webpack.HotModuleReplacementPlugin()
];

const appFolder = /app/;
const debugPort = 3000;

const configuration = {
    devtool: 'eval',
    debug: true,
    entry: {
        app: ['webpack-dev-server/client?http://localhost:' + debugPort + '/',
            'webpack/hot/only-dev-server', entryPoint
        ],
        vendor: Object.keys(packages.dependencies)
    },
    output: {
        path: outFolder,
        filename: 'app-bundle-[hash].js'
    },
    plugins: plugins,
    module: {
        preLoaders: [{
            test: /\.(js|jsx)$/,
            loader: 'eslint',
            include: appFolder
        }],
        loaders: [{
            test: /\.(js|jsx)$/,
            loader: 'babel',
            include: appFolder
        }, {
            test: /\.(scss|sass)$/,
            loaders: ['style', 'css?modules&importLoaders=1', 'postcss', 'sass'],
            include: appFolder
        }]
    },
    postcss: [autoprefixer],
    debugPort: debugPort
}

module.exports = configuration;