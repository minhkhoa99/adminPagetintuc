module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: "pre",
        use: ["source-map-loader"],
      },
    ],
  },
  resolve: {
    fallback: {
      crypto: require.resolve("crypto-browserify"),
    },
  },
  ignoreWarnings: [/Failed to parse source map/],
};
