module.exports = {
  devServer: {
    port: 3000,
    open: true,
    overlay: {
      wainings: false,
      errors: true
    },
    // before: require('./mock/mock-server.js'),
    proxy: {
      // 设置代理
      '/api': {
        target: 'http://yuqing.chuangcc.com/api',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
