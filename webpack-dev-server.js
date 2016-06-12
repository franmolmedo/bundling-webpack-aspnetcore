var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
    hot: true,
    historyApiFallback: true,
    inline: true,
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
}).listen(config.debugPort, 'localhost', function(err) {
    if (err) {
        console.log(err);
    }
    console.log('Listening at localhost:' + config.debugPort);
});