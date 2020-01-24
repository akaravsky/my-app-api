var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build'),
    },
    module: {
        rules: [
            {
                use: 'babel-loader', //teaches babel how to work with webpack
                test: /\.js$/,
                exclude: /node_modules/
            },
            {
                use: [
                    'style-loader', // style-loader - takes css modules and stick them in style tag in html file 
                    'css-loader'
                ], // css-loader - for reading content of css files
                test: /\.css$/
            }
        ]
    },
    plugins : [
        new HtmlWebpackPlugin ({
            template : 'src/index.html'
        })
    ]

}

module.exports = config