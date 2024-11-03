const { defineConfig } = require('@vue/cli-service')
const { VuetifyPlugin } = require('webpack-plugin-vuetify')

module.exports = defineConfig({
  publicPath: '/',
  outputDir: 'dist',
  transpileDependencies: [
    'vuetify'
  ],
  configureWebpack: {
    plugins: [
      new VuetifyPlugin({
        autoImport: true,
      }),
    ],
  },
})