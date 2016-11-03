# 使用说明

## 前提

* nodejs>0.10

## 步骤

```sh
# npm使用qunar源
npm install --registry http://registry.npm.corp.qunar.com

# 安装项目依赖包
npm install
# 生产环境运行以下命令
# npm install -production

# 运行本地服务器
npm start
# or npm run serve

# 浏览网页
open http://localhost:9002/

#### 其他命令 ####
# 编译全站
npm run build
npm run build:dev
npm run build:beta
npm run build:prod

# 预览编译后的文件
npm run serve:dist
```

## 特点
* [babel]支持ES6、ES7
* [模板]支持jade
* [less]支持less
* [webpack]支持模块化
* [autoprefixer]自动补全浏览器厂商前缀
* [esint]esint语法检查
* [router-api]开发环境支持同步／异步接口假数据
* [liveReload]文件修改后自动刷新浏览器

## 约定
* 用entry.js作为页面的入口文件
* 文件名称统一使用小写和中划线

## 目录说明

```
.
├── /config/                            # webpack配置文件
│   ├── /packing.js                     # 和构建工具相关的配置
│   ├── /webpack.build.babel.js         # webpack编译环境配置文件
│   ├── /webpack.serve.babel.js         # webpack开发环境配置文件
│   └── /webpack.serve:dist.js          # webpack预览编译后结果的配置文件
├── /mock/                              # 模拟数据
│   ├── /api/                           # API接口类型模拟数据
│   └── /pages                          # 页面初始化类型模拟数据
├── /prd/                               # 项目编译输出目录
├── /src/                               # 项目源码目录
│   ├── /asset/                         # 静态资源，包含图片、字体等
│   ├── /pages/                         # 页面组件
│   │   └── /demo/                      # demo页面
│   │       ├── /xxx/                   # 页面包含的非公用其他组件
│   │       ├── demo.less               # 页面css文件
│   │       ├── entry.js                # 约定的js入口文件
│   │       ├── index.js                # 页面组件定义文件
│   ├── /templates/                     # velocity templates
│   │   ├── /layout/                    # 布局模版
│   │   └── /pages/                     # 页面目录
│   │       └── /demo.html              # 模版文件
│   └── /utils/                         # Utility classes and functions
├── /tools/                             # webpack配置文件
│   ├── /serve.js                       # serve脚本
│   └── /serve:dist.js                  # serve:dist脚本
│── .babelrc                            # babel配置
│── .editorconfig                       # 代码编辑器配置
│── .eslintrc                           # eslint配置
│── package.json
│── pom.xml                             # maven配置
└── README.md                   
```
