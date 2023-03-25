const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
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
            },
            {
                test: /\.(jpe?g|png|webp|gif|svg)$/i,
                use: [
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                            },
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: [0.65, 0.90],
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            webp: {
                                quality: 75
                            },
                        }
                    }
                ],
                type: 'asset/resource',
            }
        ]
    }
}