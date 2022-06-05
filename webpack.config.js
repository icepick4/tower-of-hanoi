const path = require("path");
const webpack = require("webpack");

module.exports = {
    mode: "development",
    entry: "./2d/click-to-select/src/main.ts",
    module: {
        rules: [
            {
                test: /.ts?$/,
                use: "ts-loader",
                include: [path.resolve(__dirname, "2d/click-to-select/src")],
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    output: {
        publicPath: "2d/click-to-select/public",
        filename: "main.js",
        path: path.resolve(__dirname, "2d/click-to-select/public/js"),
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("development"),
        }),
    ],
};
