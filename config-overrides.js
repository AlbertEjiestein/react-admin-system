const {
  override,
  addLessLoader,
  fixBabelImports,
  addDecoratorsLegacy
} = require('customize-cra')

const modifyVars = require('./lessVars')

module.exports = override(
  // 使用less-loader将less转换为css
  addLessLoader({
    javascriptEnabled: true,
    modifyVars
  }),
  // 支持按需加载less或者css文件
  fixBabelImports('import',{
    libraryName: "antd",
    libraryDirectory: "es",
    style: true,   
  }),
  addDecoratorsLegacy()
)