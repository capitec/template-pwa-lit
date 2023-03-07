import path from 'path';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import TerserWebpackPlugin from 'terser-webpack-plugin';

/**
 * @typedef {import('webpack/types').Configuration} Configuration
 */

/**
 * @type {Configuration}
 */
export default {
    entry: {
        app: { import: path.resolve(process.cwd(), './src/index.ts') },
    },
    output: {
        filename: '[name].[chunkhash:8].js',
        path: path.resolve(process.cwd(), 'dist'),
        clean: true
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                { from: './src/index.css', to: 'index.css' },
                { from: './src/manifest.json', to: 'manifest.json' },
                {
                    from: './src/assets',
                    to: 'assets',
                    globOptions: {
                        ignore: ['**/.DS_Store']
                    }
                }
            ]
        }),
        new HtmlWebpackPlugin({
            title: 'Omni Starter Lit',
            filename: 'index.html',
            template: './src/index.html'
        })
    ],
    resolve: {
        modules: [path.resolve(process.cwd(), './node_modules')],
        extensions: ['.ts', '.js', '.d.ts']
    },
    resolveLoader: {
        modules: [path.resolve(process.cwd(), './node_modules')],
        extensions: ['.js', '.json'],
        mainFields: ['index', 'loader', 'main']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                            plugins: [
                                ['@babel/transform-runtime'],
                                ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true }],
                                ['@babel/plugin-proposal-class-properties'],
                                ['@babel/plugin-proposal-private-methods']
                            ]
                        }
                    },
                    {
                        loader: 'ts-loader'
                    }
                ]
            }, {
                test: /\.svg$/, type: 'asset'
            }
        ]
    },
    optimization: {
        usedExports: true,
        minimizer: [
            new TerserWebpackPlugin({
                terserOptions: {
                    format: {
                        comments: false
                    }
                },
                extractComments: false
            }),
            new CssMinimizerPlugin()
        ],
        splitChunks: {
            chunks: 'all',
            maxInitialRequests: Infinity,
            minSize: 0
        }
    },
    stats: {
        preset: 'errors-warnings',
        colors: true
    }
}