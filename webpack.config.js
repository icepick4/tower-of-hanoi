const path = require("path");
const webpack = require("webpack");

module.exports = {
    mode: "development",
    entry: "./threejs/src/main.ts",
    module: {
        rules: [
            {
                test: /.ts?$/,
                use: "ts-loader",
                include: [path.resolve(__dirname, "threejs/src")],
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    output: {
        publicPath: "threejs/public",
        filename: "main.js",
        path: path.resolve(__dirname, "threejs/public/js"),
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("development"),
        }),
    ],
};
