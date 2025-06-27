# Uni Sniffing Plugin

## 📖 Overview

Uni Sniffing Plugin 是一个基于 UniApp 框架开发的资源嗅探工具，旨在帮助用户高效提取网页中的多媒体资源。插件支持两种主要抓取方式：

1. **URL 直链抓取**  
用户可直接输入资源的 URL 直链，插件将对该链接进行快速解析，精准提取图片、视频等媒体资源，方便用户直接下载或管理。

2. **网页抓取**  
通过内嵌 WebView 加载目标网页，实时监听并提取页面内动态加载的资源链接。该功能兼容 PC 端与手机端网页，支持复杂交互和多源资源的嗅探，满足多场景下的需求。

此外，插件支持关键词搜索辅助定位资源，配合简洁友好的界面，为移动端资源聚合类项目提供完整的抓取与管理解决方案。

---

## ✨ Features

- 🔗 **URL 输入直链解析**：支持用户直接输入目标资源链接，快速获取资源
- 🌐 **网页抓取**：基于 WebView 实时监听网页资源，兼容 PC 端和手机端
- 🔍 **关键词搜索**：通过关键词触发多引擎或智能嗅探策略，辅助精准查找
- 🧹 **一键清除输入**：方便用户快速重置，开始新的抓取任务
- 🗂 **资源展示与下载**：提取并列出图片、视频等多媒体资源，支持保存与管理
- 📱 **响应式设计**：UI 适配主流移动设备，操作简洁流畅

---

## 📦 Installation

使用以下步骤将插件引入您的 UniApp 项目：

```bash
# 克隆插件仓库
git clone https://github.com/milkliu3/uni-sniffing-plugin.git

# 进入插件目录
cd uni-sniffing-plugin

# 安装依赖（根据您的包管理工具选择）
npm install
# 或
yarn install
🚀 Usage
集成页面
将插件目录下的 src/pages/sniffing.vue 页面拷贝至您的项目合适位置。

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
通过 uni.navigateTo 跳转到该页面即可：

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

bash
复制
编辑
# Fork 本仓库后：
git checkout -b feature/your-feature

# 提交修改：
git commit -m 'feat: add your feature'

# 推送分支并发起 Pull Request
git push origin feature/your-feature
📄 License
本项目基于 MIT License 协议开源，可自由用于个人或商业项目。

💡 Acknowledgements
感谢 DCloud 和 UniApp 社区的技术支持。

致谢所有为本插件提出建议或提交代码的开发者。
