
module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  configureWebpack: {
    // Set up all the aliases.
    resolve: {
      alias: require('./aliases.config').webpack,
    },
  },
  outputDir: "docs",
  publicPath: "/snake-game/"
}
