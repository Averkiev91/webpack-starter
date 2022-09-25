const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const TerserPlugin = require('terser-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: ["@babel/polyfill", "./src/js/index.js"],
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, 'dist')
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
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: "src/img",
                    to: "img",
                    globOptions: {
                        ignore: ['*.DS_Store'],
                    },
                },
            ],
        })
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
            // Styles: Inject CSS into the head with source maps
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            // Images: Copy image files to build folder
            {
                test: /\.(gif|png|jpe?g|svg)$/i
            },
            // Fonts and SVGs: Inline files
            {
                test: /\.(ttf|eot|svg|woff2?)$/i
            },
            // JavaScript: Use Babel to transpile JavaScript files
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
    }
}