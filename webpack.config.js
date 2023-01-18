const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
	const isDevMode = argv.mode === 'development';
	const config = {
		entry: { main: './src/index.ts' },
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
		},
		plugins: [
			new HtmlWebpackPlugin({
				hash: true,
				template: 'src/index.html',
				scriptLoading: 'blocking',
				inject: 'head',
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
				export: 'default',
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
