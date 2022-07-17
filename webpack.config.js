const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');

module.exports = {
    entry: './src/index.tsx',
    output: { path: path.join(__dirname, 'build'), filename: 'index.bundle.js', clean: true },
    mode: process.env.NODE_ENV || 'development',
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            '@shiba': path.resolve(__dirname, './src/common/shiba'),
        },
    },
    devServer: {
        historyApiFallback: {
            index: '/index.html',
        },
        port: 3000,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: ['ts-loader'],
            },
            {
                test: /\.module\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: {
                                localIdentName: 'sb-[local]-[hash:base64]',
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(css|scss|sass)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
                exclude: /\.module\.css$/,
            },
            {
                test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
                use: ['file-loader'],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
        ],
    },
    optimization: {
        minimize: true,
        minimizer: [new CssMinimizerPlugin(), new TerserWebpackPlugin()],
        removeAvailableModules: true,
        removeEmptyChunks: true,
        mergeDuplicateChunks: true,
        emitOnErrors: false,
        concatenateModules: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'public', 'index.html'),
            favicon: path.join(__dirname, 'public', 'favicon.ico'),
        }),
        new MiniCssExtractPlugin({
            filename: '[name].min.css',
        }),
        new CircularDependencyPlugin(),
    ],
};
