'use strict';

const baseConfig = require('./webpack.config.js');

const devConfig = Object.assign({}, baseConfig, {
    mode: 'development',
    devtool: 'eval',
    devServer: {
        contentBase: baseConfig.output.path,
        compress: true,
        port: 3000,
        publicPath: '/',
        historyApiFallback: true,
        https: false,
        hot: true,
        proxy: {
            'http://localhost:3000/api': {
                target: 'http://95.216.246.213:31863/',
                changeOrigin: true,
                secure: false,
                logLevel: 'debug',
            },
        },
        overlay: {
            warnings: false,
            errors: true
        },
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$|\.jsx$/,
                exclude: [/node_modules/],
                loader: 'eslint-loader',
                options: {
                    cache: false,
                    emitWarning: true,
                }
            },
            {
                test: /\.js$|\.jsx$/,
                exclude: /(node_modules)/,
                use: "babel-loader",
            },
            {
                test: /\.css$|\.scss$/,
                use: ['style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap']
            },
        ],
        noParse: [/\.min\.js/]
    },
});

module.exports = devConfig;
