const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const packages = require('./package.json');

//Paths 
const path = require('path');
const outFolder = path.resolve(__dirname, 'build/wwwroot');

//Configuration values depending on environment 
const entryPoint = './app/app.js';
const plugins = [
    new HtmlWebpackPlugin({
        template: __dirname + '/index.tmpl.html',
        hash: true
    }),
    new webpack.BannerPlugin('Generated 05/29/2016 By folmedo'),
    new ExtractTextPlugin('style-bundle-[chunkhash].css', {
        allChunks: true
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor-[chunkhash].js', Infinity),
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('production')
        }
    })
];

const appFolder = /app/;

const configuration = {
    entry: {
        app: entryPoint,
        vendor: Object.keys(packages.dependencies)
    },
    output: {
        path: outFolder,
        filename: 'app-bundle-[chunkhash].js'
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
            loader: ExtractTextPlugin.extract('style', ['css?modules&importLoaders=1', 'postcss', 'sass']),
            include: appFolder
        }]
    },
    postcss: [autoprefixer]
}

module.exports = configuration;