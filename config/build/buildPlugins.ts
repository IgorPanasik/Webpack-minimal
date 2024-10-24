import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import webpack from 'webpack';
import { IBuildOptions } from './types/types';

export const buildPlugins = ({
	mode,
	paths,
}: IBuildOptions): webpack.WebpackPluginInstance[] => {
	const isDev = mode === 'development';
	const isProd = mode === 'production';

	const plugins: webpack.WebpackPluginInstance[] = [
		new HtmlWebpackPlugin({
			template: paths.html,
			favicon: path.resolve(path.resolve(paths.public, 'favicon.ico')),
		}),
		new CopyPlugin({
			patterns: [{ from: 'src/assets', to: 'assets' }],
		}),
	];

	if (isDev) {
		plugins.push(new ForkTsCheckerWebpackPlugin());
		plugins.push(new ReactRefreshWebpackPlugin());
	}

	if (isProd) {
		plugins.push(
			new MiniCssExtractPlugin({
				filename: 'css/[name].[contenthash:8].css',
				chunkFilename: 'css/[name].[contenthash:8].css',
			})
		);
	}
	return plugins;
};
