module.exports = {
  devServer: {
    headers: {
      'Cache-Control': 'no-store'
    },
    disableHostCheck: true
  },
  chainWebpack: (config) => {
    if (process.env.NODE_ENV === 'development') {
      config.plugins.delete('preload')
    }
  }
}
