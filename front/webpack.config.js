var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
    entry: {
        bundle: './src/index.tsx'
      },
    output: {
        filename: '[name].[chunkhash].js', //chunkhash - for caching
        path: path.resolve(__dirname, 'build'),
        publicPath: '/'//for reloading page bundle not found if url like users/new
    },
     // Enable sourcemaps for debugging webpack's output.
     devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".jsx"],
        /*modules: [
            path.resolve('./src'), //for non relative paths
            path.resolve('./node_modules')
        ]*/
    },
    module: {
        rules: [
            {
                use: 'babel-loader', //teaches babel how to work with webpack
                test: /\.(js|jsx)$/,
                exclude: /node_modules/
            },
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader"
                    }
                ]
            },
            {
                use: [
                    'style-loader', // style-loader - takes css modules and stick them in style tag in html file 
                    'css-loader' // css-loader - for reading content of css files
                ],
                test: /\.css$/
            }
        ]
    },
    devServer: {
        historyApiFallback: true, // allow reload page
      },
    plugins : [
        new HtmlWebpackPlugin ({
            template : 'src/index.html' //add tags script to html template with src= bundle.js or vendors.js
        })
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                defaultVendors: {
                    test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    }

}

module.exports = config