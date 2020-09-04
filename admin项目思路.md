## 一、项目配置`config-overrides.js`
基于`customize-cra`和`react-app-rewired`进行配置，前者是自定义的`react-app`环境，其依赖于后者的配置文件。基于`antd`

+ 配置按需加载组件和样式，`babel-plugin-import` 插件，使用`customize-cra` 的`fixBabelImports` 方法

+ 配置less，需要安装`less`、`less-loader` 插件，后者最好安装5.0版本，6.0版本有问题，使用`customize-cra` 的`addLessLoader` 方法

+ 自定义配置主题色，`antd`基于less作为开发语言，自定义的主题色作为`modifyVars`的值
+ 配置装饰器模式的HOC写法，`@babel/plugin-proposal-decorators` 插件，使用`customize-cra`的`addDecoratorsLegacy`方法

