module.exports = {
  // 插件名称
  name: 'uni-sniffing-plugin',

  // 插件版本
  version: '1.0.0',

  // 插件描述
  description: '一个基于 UniApp 的网页资源嗅探插件，用于提取页面中的媒体资源、链接等信息，支持在 WebView 中监听和抓取网络请求(支持直链抓取和网页抓取)。',

  // 插件作者
  author: 'milkliu3',

  // 插件的主要入口文件
  main: 'src/pages/sniffing.vue',

  // 插件的依赖
  dependencies: {
    'image-tools': '^1.0.0'
  },

  // 插件的配置
  config: {
    // 可以在此定义默认配置项，例如启用/禁用某些类型的资源嗅探
  },

  // 插件的使用说明
  usage: {
    install: '将本插件集成到 UniApp 项目中后，通过跳转或嵌入 sniffing.vue 页面即可开始资源嗅探。',
    features: [
      '支持 WebView 页面中的请求监听与资源提取',
      '可用于识别视频、音频、图片等资源链接',
      '提供简单 UI 展示和交互控制'
    ],
    notes: '建议在合法合规的范围内使用本插件，避免抓取敏感或受版权保护的内容。'
  }
};
