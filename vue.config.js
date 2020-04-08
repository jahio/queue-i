module.exports = {
  devServer: {
    headers: {
      'Cache-Control': 'no-store'
    },
    disableHostCheck: true,
    watchOptions: {
      ignored: ['db.json', 'node_modules/**']
    }
  },
  chainWebpack: (config) => {
    if (process.env.NODE_ENV === 'development') {
      config.plugins.delete('preload')
    }
  }
}
