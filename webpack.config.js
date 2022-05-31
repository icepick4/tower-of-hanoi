const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: {
        main : './src/main.ts',
        hanoi : './src/hanoi.ts',
    },
    module: {
        rules: [{
            test: /.ts?$/,
            use: 'ts-loader',
            include: [path.resolve(__dirname, 'src')],
        }],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        publicPath: 'public/js',
        filename: '[name].js',
        path: path.resolve(__dirname, 'public/js'),
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        })
    ],
};