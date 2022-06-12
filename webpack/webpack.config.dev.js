const Path = require('path');
const nodeExternals = require('webpack-node-externals');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');

var config = {
  target: 'node',
  mode: 'development',
  devtool: 'inline-source-map',
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
  plugins: [
    //ignore the drivers you don't want.
    new FilterWarningsPlugin({
      exclude: [/mongodb/, /oracledb/, /pg/, /pg-native/, /pg-query-stream/, /redis/, /sqlite3/],
    }),
  ],
};

var mainAppConfig = Object.assign({}, config, {
  entry: './src/entity/index.ts',
  output: {
    path: Path.resolve(__dirname, '../dist/'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  node: {
    __dirname: false,
  },
  watchOptions: {
    ignored: './node_modules/',
    aggregateTimeout: 300,
    poll: 500,
  },
});


module.exports = [mainAppConfig];
