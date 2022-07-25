module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  runtimeCompiler: true,
  // Doesn't seem to work even though documentation says it should
  pwa: {
    workboxOptions: {
      skipWaiting: true
    }
  }
}
