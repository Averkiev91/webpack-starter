const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
    target: 'web',
    entry: ["@babel/polyfill", "./src/script/script.js"],
    output: {
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        filename: "script.js",
        assetModuleFilename: "img/[name][ext]"
    },
    devServer: {
        static : {
            directory: path.join(__dirname, 'dist')
        },
        watchFiles: ["./src/*"],
        compress: true,
        port: 9999
    },
    plugins: [
        new HtmlWebpackPlugin(
            {
                filename: "index.html",
                template: "./src/index.html"
            }
        ),
        new MiniCssExtractPlugin(
            {
                filename: "style.css",
            }
        ),
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin()
        ]
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test: /\.woff2?$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name][ext]'
                }
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    resolve: {
        fallback: {
            "fs": false,
            "tls": false,
            "net": false,
            "path": false,
            "zlib": false,
            "http": false,
            "https": false,
            "stream": false,
            "crypto": false,
            "url": false,
            "util": false,
            "os": false,
            "assert": false,
            "crypto-browserify": require.resolve('crypto-browserify')
        }
    }
}