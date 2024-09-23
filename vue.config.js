const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  /**@部屬環境GitHubPage使用 */
  // publicPath: process.env.NODE_ENV === 'production' ? '/form-build/' : './',
  transpileDependencies: true,
  productionSourceMap: process.env.NODE_ENV !== 'production',
  /**@配置postcss */
  css: {
    loaderOptions: {
      postcss: {
        postcssOptions: {
          plugins: [require('tailwindcss'), require('autoprefixer')],
        },
      },
    },
  },
})
