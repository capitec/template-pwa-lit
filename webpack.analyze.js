import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { merge } from 'webpack-merge';
import release from './webpack.release.js';

export default merge(release, {
    plugins: [
        new BundleAnalyzerPlugin()
    ]
});