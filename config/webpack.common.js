
 var webpack = require('webpack');
 var HtmlWebpackPlugin = require('html-webpack-plugin');
 var ExtractTextPlugin = require('extract-text-webpack-plugin');
 var helpers = require('./helpers');

 /*Webpack is a NodeJS-based tool that reads configuration from a JavaScript commonjs module file.
The configuration imports dependencies with require statements and exports several objects as properties of a module.exports object.*/

 module.exports = {
    entry: {
        'polyfills': './src/polyfills.ts',
        'vendor': './src/vendor.ts',
        'app': './src/main.ts'
      },
    
      resolve: {
        extensions: ['.ts', '.js']
      },

      module: {
        rules: [
          {
            test: /\.ts$/,
            loaders: [
              {
                loader: 'awesome-typescript-loader',
                options: { configFileName: helpers.root('src', 'tsconfig.json') }
              } , 'angular2-template-loader'
            ]
          },
          {
            test: /\.html$/,
            loader: 'html-loader'
          },
          {
            test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
            loader: 'file-loader?name=assets/[name].[hash].[ext]'
          },
          {
            test: /\.css$/,
            exclude: helpers.root('src', 'app'),
            loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader?sourceMap' })
          },
          {
            test: /\.css$/,
            include: helpers.root('src', 'app'),
            loader: 'raw-loader'
          }
        ]
      },
    
      plugins: [
        // Workaround for angular/angular#11580
        new webpack.ContextReplacementPlugin(
          // The (\\|\/) piece accounts for path separators in *nix and Windows
          /angular(\\|\/)core(\\|\/)@angular/,
          helpers.root('./src'), // location of your src
          {} // a map of your routes
        ),
    
        new webpack.optimize.CommonsChunkPlugin({
          name: ['app', 'vendor', 'polyfills']
        }),
    
        new HtmlWebpackPlugin({
          template: 'src/index.html'
        })
      ]
  
//   output: {
//     filename: '[name].js' //bundle files
//   }
    //Webpack constructs two separate dependency graphs and emits two bundle files, 
    //one called app.js containing only the application code and another called vendor.js with all the vendor dependencies.
 };