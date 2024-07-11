"use strict";

module.exports = {
    entry: `${__dirname}/../index.js`,

    output: {
        path:          `${__dirname}/../distribution`,
        filename:      "helpbox.js",
        libraryTarget: "commonjs",
        library:       "helpbox"
    },

    module: {
        loaders: [{
            test:    /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use:     [{
                loader:  "babel-loader",
                options: { presets: ["env"], plugins: ["transform-runtime"] }
            }]
        }]
    }
};
