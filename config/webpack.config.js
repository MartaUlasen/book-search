'use strict';

const webpack = require('webpack'),
      path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const srcPath = path.join(__dirname, '../src/'),
      distPath = path.join(__dirname, '../dist/');

module.exports = {
    context: srcPath,
    entry: {
        app: [
            'babel-polyfill',
            'react-hot-loader/patch',
            './index.jsx',
        ],
    },
    output: {
        path: distPath,
        filename: '[hash].js',
        chunkFilename: '[id].[hash].js',
        publicPath: '/',
    },
    resolve: {
        modules: ["node_modules", srcPath],
        extensions: [".js", ".json", ".jsx", ".css", ".scss"],
        alias: {
            'react-dom': '@hot-loader/react-dom',
        },
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.ContextReplacementPlugin(
            /moment[/\\]locale$/,
            /en/
        ),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        }),
        new CopyWebpackPlugin([]),
    ]
};
