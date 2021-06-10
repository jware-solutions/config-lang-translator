import path from 'path'
import webpack from 'webpack'
import common from './webpack.common.config'
import { merge } from 'webpack-merge'

// This prevents 'possible undefined' error
const commonPlugins = common.plugins ?? []

export default merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  watchOptions: {
    ignored: /node_modules/
  },
  plugins: commonPlugins.concat([
    new webpack.HotModuleReplacementPlugin()
  ]),
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    historyApiFallback: true,
    port: 4000,
    open: true
  }
})
