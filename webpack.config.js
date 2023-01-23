const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
	const isDevMode = argv.mode === 'development';
	const config = {
		entry: { 'sortable-tree': './index.ts' },
		module: {
			rules: [
				{
					test: /\.ts$/,
					use: ['ts-loader'],
					exclude: /node_modules/,
				},
				{
					test: /\.(less|css)$/i,
					use: [
						MiniCssExtractPlugin.loader,
						'css-loader',
						'less-loader',
					],
				},
				{
					test: /\.woff2?$/i,
					type: 'asset/resource',
					generator: {
						filename: (pathData) => {
							const name = path.basename(
								pathData.module.resourceResolveData.relativePath
							);

							return `./fonts/${name
								.replace('.var', '-var')
								.toLowerCase()}`;
						},
					},
				},
			],
		},
		resolve: {
			extensions: ['.ts', '.js'],
		},
		optimization: {
			minimizer: [new CssMinimizerPlugin(), '...'],
			splitChunks: {
				cacheGroups: {
					vendor: {
						test: /(demo|node_modules)/,
						chunks: 'all',
						name: 'demo',
						enforce: true,
					},
				},
			},
		},
		plugins: [
			new HtmlWebpackPlugin({
				hash: true,
				template: 'demo/index.html',
				scriptLoading: 'blocking',
				inject: 'head',
				minify: false,
			}),
			new MiniCssExtractPlugin({
				filename: '[name].css',
			}),
		],
		output: {
			filename: isDevMode ? '[name].[hash].js' : '[name].js',
			path: path.resolve(__dirname, 'dist'),
			library: {
				name: 'SortableTree',
				type: 'umd',
				export: 'SortableTree',
			},
		},
	};

	if (isDevMode) {
		console.log('Development Mode');

		return Object.assign({}, config, {
			devServer: {
				static: './dist',
			},
			devtool: 'inline-source-map',
		});
	}

	console.log('Production Mode');

	return config;
};
