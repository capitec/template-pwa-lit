import common from './webpack.common.js';
import { merge } from 'webpack-merge';

export default merge(common, {
	mode: 'development',
	devtool: 'inline-source-map',
	devServer: {
		port: 5190,
		compress: true,
		historyApiFallback: true,
		hot: false,
		devMiddleware: {
			writeToDisk: true
		}
	},
	performance: {
		hints: false
	},
	optimization: {
		minimize: false
	}
});