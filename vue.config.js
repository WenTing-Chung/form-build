const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  /**@部屬環境GitHubPage使用 */
  // publicPath: process.env.NODE_ENV === 'production' ? '/form-build/' : './',
  transpileDependencies: true,
  productionSourceMap: process.env.NODE_ENV !== 'production',
  configureWebpack: (config) => {
    // 生產環境下
    if (process.env.NODE_ENV === 'production') {
      /** prerender-spa-plugin */
      const PrerenderSPAPlugin = require('@dreysolano/prerender-spa-plugin')
      const Renderer = PrerenderSPAPlugin.PuppeteerRenderer
      const path = require('path')
      config.plugins.push(
        new PrerenderSPAPlugin({
          staticDir: path.join(__dirname, 'dist'),
          routes: ['/login', '/register', '/form-render'],
          renderer: new Renderer({
            inject: { foo: 'bar' },
            headless: false,
            // 在 main.js 中 document.dispatchEvent(new Event('render-event'))，兩者的事件名稱要對應上。
            renderAfterDocumentEvent: 'render-event',
          }),
        })
      )
    }
  },
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
