const path = require('path')
const webpack = require('webpack');
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
    performance: {
        hints: false
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
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer'],
        }),
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
                                quality: 75
                            },
                            optipng: {
                                quality: 75
                            },
                            pngquant: {
                                quality: [0.75, 0.90],
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
    },
    resolve: {
        fallback: {
            assert: require.resolve('assert/'),
            buffer: require.resolve('buffer/'),
            console: require.resolve('console-browserify/'),
            constants: require.resolve('constants-browserify/'),
            crypto: require.resolve('crypto-browserify/'),
            domain: require.resolve('domain-browser/'),
            http: require.resolve('stream-http/'),
            https: require.resolve('https-browserify/'),
            os: require.resolve('os-browserify/browser'),
            path: require.resolve('path-browserify/'),
            punycode: require.resolve('punycode/'),
            process: require.resolve('process/browser'),
            querystring: require.resolve('querystring-es3/'),
            stream: require.resolve('stream-browserify/'),
            string_decoder: require.resolve('string_decoder/'),
            sys: require.resolve('util/'),
            timers: require.resolve('timers-browserify/'),
            tty: require.resolve('tty-browserify/'),
            url: require.resolve('url/'),
            util: require.resolve('util/'),
            vm: require.resolve('vm-browserify/'),
            zlib: require.resolve('browserify-zlib'),
        },
    }
}