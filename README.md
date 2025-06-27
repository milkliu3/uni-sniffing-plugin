Uni Sniffing Plugin
📖 Overview
Uni Sniffing Plugin 是一个基于 UniApp 框架开发的资源嗅探工具，旨在在 WebView 中对网页资源（如图片、视频等）进行监听、提取与管理。插件支持用户输入网址、关键词搜索，并通过简洁友好的界面进行浏览和下载操作，适用于移动端资源聚合类项目。

✨ Features
🔗 URL 输入：支持用户直接输入目标网址进行资源嗅探。

🔍 关键词搜索：通过关键词触发多引擎或智能嗅探逻辑。

🌐 网页跳转与预览：内嵌 WebView 直接打开并浏览目标网页。

🧹 一键清除输入：方便用户进行新一轮操作。

🗂 资源展示与下载：提取并列出网页中的媒体资源（图片、视频等），支持保存或下载。

📱 响应式设计：兼容主流移动设备，UI 简洁易用。

📦 Installation
使用以下步骤将插件引入您的 UniApp 项目：

bash
复制
编辑
# 克隆插件仓库
git clone https://github.com/yourusername/uni-sniffing-plugin.git

# 进入插件目录
cd uni-sniffing-plugin

# 安装依赖（根据您项目的包管理工具选择）
npm install
# 或者
yarn install
🚀 Usage
集成页面
将插件目录下的 src/pages/sniffing.vue 页面拷贝至您的项目中合适位置。

配置页面路由
在 pages.json 中注册该页面：

json
复制
编辑
{
  "path": "pages/sniffing/sniffing",
  "style": {
    "navigationBarTitleText": "资源嗅探器"
  }
}
页面调用
直接通过 uni.navigateTo 跳转到该页面即可：

js
复制
编辑
uni.navigateTo({
  url: '/pages/sniffing/sniffing'
});
🧩 Project Structure
bash
复制
编辑
uni-sniffing-plugin/
├── src/
│   └── pages/
│       └── sniffing.vue       # 核心页面组件
├── package.json               # 插件基础信息
├── README.md                  # 使用说明
🙌 Contributing
欢迎社区开发者贡献代码或提出建议！

Fork 本仓库

新建分支：git checkout -b feature/your-feature

提交修改：git commit -m 'feat: add your feature'

推送分支并发起 Pull Request

📄 License
本项目基于 MIT License 协议开源，可自由用于个人或商业项目。

💡 Acknowledgements
感谢 DCloud 和 UniApp 社区的技术支持。

致谢所有为本插件提出建议或提交代码的开发者。