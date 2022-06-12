const Path = require('path');
const nodeExternals = require('webpack-node-externals');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
const TerserPlugin = require('terser-webpack-plugin');

var config = {
  target: 'node',
  mode: 'production',
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: [/\.ts?$/, /\.json?$/],
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            }
          }
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
  },
};

var mainAppConfig = Object.assign({}, config, {
  entry: './src/entity/index.ts',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          keep_classnames: true,
          keep_fnames: true,
        },
      }),
    ],
  },
  plugins: [
    //ignore the drivers you don't want.
    new FilterWarningsPlugin({
      exclude: [/mongodb/, /oracledb/, /pg/, /pg-native/, /pg-query-stream/, /redis/, /sqlite3/],
    }),
  ],
  output: {
    path: Path.resolve(__dirname, '../dist/'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  node: {
    __dirname: false,
  },
});

module.exports = [mainAppConfig];
