const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    proxy:{
      "/elm":{
        target:"https://elm.cangdu.org",
        changeOrigin:true,
        pathRewrite:{
          "^/elm":""
        }
      }
    }
  }
})
