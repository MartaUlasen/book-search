'use strict';

const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const baseConfig = require('./webpack.config.js');

const prodConfig = Object.assign({}, baseConfig, {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.js$|\.jsx$/,
                exclude: /(node_modules)/,
                use: 'babel-loader',
            },
            {
                test: /\.css$|\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader',
                    'sass-loader',
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: [
                                //path.resolve(__dirname, '../src/styles/variables.scss'),
                            ],
                        },
                    },
                ],
            },
        ]
    },
});

prodConfig.plugins.push(
    new MiniCssExtractPlugin({
        filename: '[contenthash].css',
    }),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production'),
    }),
);

module.exports = prodConfig;
