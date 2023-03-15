import { merge } from 'webpack-merge';
import { GenerateSW } from 'workbox-webpack-plugin';
import common from './webpack.common.js';

export default merge(common, {
    mode: 'production',
    devtool: false,
    performance: {
		hints: 'error'
	},
	optimization: {
		minimize: true
	},
	stats: {
		preset: 'normal'
	},
	plugins: [
		// Basic precache and runtime caching boilerplate.
		// Refer to https://developer.chrome.com/docs/workbox/modules/workbox-webpack-plugin/ for more info and other options.
		new GenerateSW()
	]
});