export default {
  // 文件路径，所有目录都使用相对于项目根目录的相对目录格式
  path: {
    // 源文件目录
    src: 'src',
    // 静态文件目录
    assets: 'src/assets',
    // 页面初始化mock数据文件存放目录
    mockPageInit: 'mock/pages/',
    // webpack打包入口JS文件目录
    entries: 'src/pages/{pagename}/entry.js',
    // entries: (pagename) => `src/${pagename.replace('pages', 'containers')}/entry.js`,
    // 模版目录
    templates: 'src/templates',
    templatesPages: 'src/templates/pages',
    // 编译输出产物目录
    dist: 'prd',
    // 编译后的静态文件目录
    assetsDist: 'prd/assets',
    // 编译后的模版目录
    templatesDist: 'prd/views',
    templatesDistPages: 'prd/views/pages'
  },

  // 模版类型
  templateLoader: ['html'],
  // 模版文件扩展名
  templateExtension: ['.html'],

  // webserver端口
  port: {
    // 开发环境端口号
    dev: 9002,
    // 预览编译后结果的端口号
    dist: 8080
  },

  commonChunks: {
    // CommonsChunkPlugin会将最后一个当作Entry chunk
    vendor: [
      'react',
      'react-dom',
      'react-router',
      'redux',
      'react-redux',
    ]
  },

  // URL转发路由规则配置
  // require! 表示使用本地mock文件
  rewriteRules: {
    // 网站URL与模版的对应路由关系
    '^/$': '/smart-home.html',

    // 本地数据 Mock
    // '^/passport/send_vcode.json': 'require!/mock/api/send_vcode.js',
    // '^/passport/login.json': 'require!/mock/api/login.js',
    // '^/control/room/list.json': 'require!/mock/api/list.js',
    // '^/control/sync_status.json': 'require!/mock/api/status.js',
    // '^/control/switch.json': 'require!/mock/api/switch.js',
    // '^/control/device_buttons.json': 'require!/mock/api/device_buttons.js',
    // '^/mobile/category/applist': 'require!/mock/api/applist.js',
    // '^/bugFlow/list': 'require!/mock/api/buglist.js',

    // API转发
    //'^/api/(.*)': 'require!/mock/api/$1.js',
    // '^/jspatch/(.*)': 'http://localhost:7002/jspatch/$1',
    // '^/bugFlow/(.*)': 'http://localhost:7002/bugFlow/$1',
    // '^/mobile/category/applist(.*)': 'http://localhost:7002/mobile/category/applist$1'

    //beta
    '^/passport/(.*)': 'http://my.lvyuetravel.com:8100/passport/$1',
    '^/control/(.*)': 'http://my.lvyuetravel.com:8100/control/$1',
    '^/control/room/(.*)': 'http://my.lvyuetravel.com:8100/control/room/$1',
    '^/feedback/(.*)': 'http://my.lvyuetravel.com:8100/feedback/$1'
  }

};
