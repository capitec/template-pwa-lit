import { merge } from 'webpack-merge';
import common from './webpack.common.js';

export default merge(common, {
	mode: 'development',
	devtool: 'inline-source-map',
	devServer: {
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