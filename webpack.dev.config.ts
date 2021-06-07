import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpack, { Configuration as WebpackConfiguration } from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import ESLintPlugin from 'eslint-webpack-plugin'

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const config: Configuration = {
  mode: 'development',
  output: {
    publicPath: '/'
  },
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript'
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it uses publicPath in webpackOptions.output
              publicPath: '../'
            }
          },
          'css-loader'
        ]
      },
      {
        test: /\.(ttf|eot|svg|png|jpg|gif|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ForkTsCheckerWebpackPlugin({
      async: false
    }),
    new ESLintPlugin({
      extensions: ['js', 'jsx', 'ts', 'tsx']
    }),
    new MiniCssExtractPlugin({
      filename: '[name]-[hash].css'
    })
  ],
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    historyApiFallback: true,
    port: 4000,
    open: true,
    hot: true
  }
}

export default config
