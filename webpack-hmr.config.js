const nodeExternals = require('webpack-node-externals');
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');

module.exports = function (options, webpack) {
  return {
    ...options,
    entry: [
      'webpack/hot/poll?1000', // check for changes every second
      options.entry, // original entry
    ],
    externals: [
      nodeExternals({
        allowlist: ['webpack/hot/poll?1000'], // allow polling for hot reload
      }),
    ],
    plugins: [
      ...options.plugins,
      new webpack.HotModuleReplacementPlugin(), // enable HMR globally
      new webpack.WatchIgnorePlugin({
        paths: [/\.js$/, /\.d\.ts$/], // ignore built files
      }),
      new RunScriptWebpackPlugin({ name: options.output.filename }), // run the output file after each build
    ],
  };
};
