let cssPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        './vendors': './src/vendors.js',
        './master/master': './src/master/master.js',

        './index/index': './src/index/index.js',

    },
    output: {
        path: __dirname + '/public'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    cssPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            url: function (url) {
                                if (url.match(/\.(png|svg|jp(e)?g|gif)$/)) {
                                    return false;
                                } else {
                                    return true;
                                }
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(woff(2)?|eot|ttf)/
            }
        ]
    },
    plugins: [
        new cssPlugin()
    ]
}
