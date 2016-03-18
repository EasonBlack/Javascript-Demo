module.exports = {
    entry: "./src/main.js",
    output: {
        path: "./build",
        filename: "bundle.js"
    },
    devtool: 'source-map',
    resolve: {
        alias: {
            dustjs: 'dustjs-linkedin'
        }
    },
    module: {
        loaders: [
            {
                test: /\.js$/, exclude: /node_modules/, loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            }
            ,{ test: /\.dust$/, loader: "dust-loader-complete" }
        ]
    }
}