'use strict'

const path = require("path");
const autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: "./index.js",
    output: {
        publicPath: '/',
        path: path.resolve(__dirname, "dist"),
        filename: "main.js",
    },
    // ◄ ВИПРАВЛЕНО: Об'єднано два блоки resolve в один спільний об'єкт
    resolve: {
        modules: [path.join(__dirname, 'src'), 'node_modules'],
        extensions: [".js", ".jsx", ".json"], // Додано крапку перед json (.json)
        alias: {
            react: path.join(__dirname, 'node_modules', 'react'),
        },
    },
    devServer: {
        port: 8000, // Краще вказувати числом, а не рядком
        host: '0.0.0.0',
        allowedHosts: [
            'eom191721unr.org',
            'www.eom191721unr.org', // Замість "://" додано правильний піддомен www
            'all'
        ],
        client: {
            webSocketURL: 'auto://0.0.0.0:0/ws',
            overlay: false,
        },
        // ◄ ДОДАНО: Проксі для безпечного обходу CORS через порт 80 Cloudflare
        proxy: [
            {
                context: ['/api'],
                target: 'http://myserver:3012', // Назва докер-сервісу вашого Node.js бекенду
                pathRewrite: { '^/api': '' },
                changeOrigin: true,
            },
        ],
        historyApiFallback: true,
        static: {
            directory: path.join(__dirname, "dist"),
        },
        compress: true,
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './src/index.html' })
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.(scss)$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: () => [
                                    require('autoprefixer')
                                ]
                            }
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            }
        ],
    },
}
