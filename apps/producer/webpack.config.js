const path = require('path');
const nodeExternals = require('webpack-node-externals');

// Load the TypeScript configuration
const tsConfig = require('../../tsconfig.json');

// Create a paths mapping
const alias = {};
if (tsConfig.compilerOptions.paths) {
  for (const [key, value] of Object.entries(tsConfig.compilerOptions.paths)) {
    alias[key.replace('/*', '')] = path.join(
      path.resolve(__dirname, '../..'), // project root
      value[0].replace('/*', ''),
    );
  }
}

module.exports = {
  entry: {
    main: './apps/producer/src/main.ts',
    lambda: './apps/producer/src/lambda.ts',
  },
  output: {
    path: path.resolve(__dirname, '../../dist/apps/producer/'),
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    clean: true,
  },
  resolve: {
    alias,
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  target: 'node',
  externals: [nodeExternals()], // Prevent bundling of node_modules
  mode: 'development',
  devtool: 'source-map', // Optional for better debugging
};
