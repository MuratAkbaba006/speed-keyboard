const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function(app){
  app.use(
    "/api/1/medium/plaintext/",createProxyMiddleware({
      target:"https://loripsum.net",
      changeOrigin:true
    })
  )
}