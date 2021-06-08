import path from 'path'
import common from './webpack.common.config'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import ESLintPlugin from 'eslint-webpack-plugin'
import { merge } from 'webpack-merge'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'

// This prevents 'possible undefined' error
const commonPlugins = common.plugins ?? []

export default merge(common, {
  mode: 'production',
  devtool: false,
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].[contenthash].js',
    publicPath: ''
  },
  plugins: commonPlugins.concat([
    new ForkTsCheckerWebpackPlugin({
      async: false
    }),
    new ESLintPlugin({
      extensions: ['js', 'jsx', 'ts', 'tsx']
    }),
    new CleanWebpackPlugin()
  ])
})
