const proxy = require('http-proxy-middleware');

module.exports = function(app){
  app.use(
    proxy("/api/1/medium/plaintext/",{
      target:"https://loripsum.net",
      changeOrigin:true
    })
  )
}