const { TRUE } = require("node-sass");

module.exports = {
    devServer: {
        historyApiFallback: true,
    },
    entry: path.resole(__dirname, "./src/index.tsx")
}