<template>
  <view class="maxbox">

    <view class="jgtitle" v-if="kzxx"><u-icon name="error-circle-fill" size="40"
        color="#FF8F1F"></u-icon><text>本页面仅提供网页浏览器能力，请合理使用~</text></view>

    <view class="box" v-if="kzxx">

      <view class="wbys" style="margin-top: 0">
        <view class="zwbox"></view>
        <view class="wbys-title">输入目标网址</view>
      </view>

      <view class="input-box">
        <u--textarea placeholder="请输入内容" border="surround" v-model="value" class="input-style"
          height="200"></u--textarea>
        <text class="title1" @click="search">关键词搜索</text>
        <text class="title2" @click="openUrl">打开URL链接</text>
        <text class="title3" @click="clearss">清空</text>
      </view>

      <!-- 最近访问和热门 -->

      <!-- <view class="wbys">
        <view class="zwbox"></view>
        <view class="wbys-title">热门站点</view>
      </view> -->

      <!-- <view class="hotbox">
        <view class="recentbox">
          <view class="recentfangweng">
            <text>https://www.baidu.com</text>
          </view>
      </view>
      </view> -->

      <!-- <view class="editbox">
      <view class="wbys">
        <view class="zwbox"></view>
        <view class="wbys-title">最近访问</view>
        </view>
        <view class="editbtn" @click="editfangweng" :style="{ color: isEditing ? '#7D5ADB' : '' }">编辑</view>
      </view>

      <view class="recentbox">
        <view class="recentfangweng" v-for="(item, index) in fangwenglist" :key="item" @click="recenturl(item)">
          <text>{{ item.data }}</text>
          <view v-if="isEditing" class="delete-btn" @tap.stop="deleteFangweng(index)">×</view>
        </view>
      </view> -->

      <view class="masks">
        <image src="/static/image/msk.png" mode="scaleToFill" />
      </view>


    </view>

    <view v-if="!kzxx" class="webview-box" style="margin-top: 200rpx;">

      <view class="searchnavber">

        <view class="searchview" v-if="uapuanduan" @click="kzuapuanduan">
          <text>移动</text>
          <image src="/static/image/gongju/xtpc.png" />
          <u-icon name="reload" size="32" color="#000"></u-icon>
        </view>

        <view class="searchview" v-if="!uapuanduan" @click="kzuapuanduan">
          <text>PC</text>
          <image src="/static/image/gongju/xtyd.png" />

          <u-icon name="reload" size="32" color="#000"></u-icon>
        </view>

        <view class="search-box">
          <u-icon name="home" size="32" color="#7D5ADB" @click="ztback"
            style="position: absolute; left: 226rpx; top: 50%; transform: translateY(-50%); z-index: 1;"></u-icon>
          <input type="text" v-model="ssurl" style="width: 256rpx; margin-right: 70rpx; padding-left: 40rpx;"
            placeholder="请输入有效URL">
          <u-icon v-if="ssurl" name="close-circle-fill" size="32" color="#999" @click="clearInput"
            class="clear-btn"></u-icon>
          <view class="searchurl" @click="searchurl">搜索</view>
        </view>
      </view>

      <view class="webview">
        <web-view @message="onMessage" @onPostMessage="onPostMessage">
        </web-view>
      </view>

    </view>

    <view class="zylist" v-show="zyxx">
      <view class="zylist-header">
        <view class="zylist-title">资源嗅探结果</view>
        <u-icon name="close" size="40" @click="closezylist" class="closebtn"></u-icon>
        <view class="tabs">
          <text @click="activeTab = 'all'" :class="{ active: activeTab === 'all' }">全部({{ getlist.video.length +
            getlist.image.length }})</text>
          <text @click="activeTab = 'video'" :class="{ active: activeTab === 'video' }">视频({{ getlist.video.length
          }})</text>
          <text @click="activeTab = 'image'" :class="{ active: activeTab === 'image' }">图片({{ getlist.image.length
          }})</text>
          <text @click="clearzylist" class="clearzylist">清空列表</text>
        </view>
      </view>

      <view v-if="activeTab === 'all'">

        <view class="atvideoitems">
          <view class=" videoitems" v-for="item in getlist.video" :key="item" style="margin-bottom: 20rpx;">
            <dom-video :src="item" controls class="videoitem"></dom-video>
            <view class="downloadbtn" @click="downloadVideo(item)"><u-icon name="download" size="24"
                color="#7D5ADB"></u-icon>下载视频</view>
          </view>
        </view>

        <view class="atimgitems">
          <view class=" imgitems" v-for="item in getlist.image" :key="item">
            <image :src="item" class="imgitem" mode="aspectFit"></image>
            <view class="downloadbtn" @click="downloadImage(item)"><u-icon name="download" size="24"
                color="#7D5ADB"></u-icon>下载图片</view>
          </view>
        </view>

      </view>

      <view v-if="activeTab === 'video'" class="atvideoitems">
        <view class=" videoitems" v-for="item in getlist.video" :key="item">
          <dom-video :src="item" controls class="videoitem"></dom-video>
          <view class="downloadbtn" @click="downloadVideo(item)"><u-icon name="download" size="24"
              color="#7D5ADB"></u-icon>下载视频</view>
        </view>
      </view>

      <view v-if="activeTab === 'image'" class="atimgitems">
        <view class=" imgitems" v-for="item in getlist.image" :key="item">
          <image :src="item" class="imgitem" mode="aspectFit"></image>
          <view class="downloadbtn" @click="downloadImage(item)"><u-icon name="download" size="24"
              color="#7D5ADB"></u-icon>下载图片</view>
        </view>
      </view>


      </view>

    <view class="navber">
      <view class="navberkzt1">
        <!-- <u-icon name="home" size="56" color="#FFFFFF" @click="ztback"></u-icon> -->
        <u-icon name="arrow-leftward" size="56" color="#FFFFFF" @click="back"></u-icon>
        <u-icon name="reload" size="56" color="#FFFFFF" @click="reload"></u-icon>
        <u-icon name="arrow-rightward" size="56" color="#FFFFFF" @click="next"></u-icon>
      </view>
      <view class="navberkzt2" @click="zyxxs">已找到：视频<span>({{ getlist.video.length }})</span> 图片<span>({{
        getlist.image.length }})</span> </view>
    </view>

  </view>
</template>

<script>
import domVideo from '@/components/domVideo/domVideo.vue'
import { pathToBase64, base64ToPath } from 'image-tools'
var wv;

export default {
  components: {
    domVideo
  },
  data() {
    return {
      value: '',
      ssurl: '',
      shuaxurl: '',
      zyxx: false,
      kzxx: true,
      dianjpd: false,
      activeTab: 'all',
      zylist: {
        all: [],
        base64: [],
        image: [],
        video: [],
        unknown: []
      },
      getlist: {
        image: [],
        video: [],
        unknown: []
      },
      uapuanduan: true,
      fangwenglist: (() => {
        const storedData = uni.getStorageSync('fangwenglist');
        if (Array.isArray(storedData)) {
          return storedData;
        }
        if (!storedData) return [];
        if (Array.isArray(storedData.data)) {
          return storedData.data.map(item => ({
            data: item,
            thekey: storedData.thekey || 'ss'
          }));
        }
        return [];
      })(),
      isEditing: false,
      historyStack: [],  // 历史记录栈
      currentIndex: -1,  // 当前页面索引
    }
  },
  onLoad() {
    //  if( uni.getStorageSync('uapuanduan')=='null'||uni.getStorageSync('uapuanduan')=='undefined'){
    //   this.uapuanduan = true;
    //  }
    uni.showToast({
      title: '关键词搜索时，浏览器有时需要安全验证，需要先切换到PC端进行验证，验证完成后可选择再切换到移动端',
      duration: 6000,
      icon: 'none'
    });
  },
  mounted() {
    // #ifdef APP-PLUS
    const currentWebview = this.$scope.$getAppWebview();
    currentWebview.addEventListener('loaded', () => {
      console.log('URL 变化:', currentWebview.getURL());
    });
    // #endif
  },
  methods: {

    ztback() {
      this.zyxx = false;
      this.kzxx = true;
    },
    //返回
    back() {
      const currentWebview = this.$scope.$getAppWebview();
      const wv = currentWebview.children()[0];

      if (wv) {
        wv.evalJS("window.history.back()", (res) => {
          uni.showToast({
            title: '返回成功',
            icon: 'none'
          });
        });
      } else {
        uni.showToast({
          title: '无历史记录',
          icon: 'none'
        });
      }
    },
    //下一页
    next() {
      const currentWebview = this.$scope.$getAppWebview();
      const wv = currentWebview.children()[0];

      if (wv) {
        wv.evalJS("window.history.forward()", (res) => {
          uni.showToast({
            title: '前进成功',
            icon: 'none'
          });
        });
      } else {
        uni.showToast({
          title: '无后续记录',
          icon: 'none'
        });
      }
    },
    //刷新
    reload() {
      if (this.ssurl) {
        this.get_webview({ url: this.ssurl });
        uni.showToast({
          title: '刷新成功',
          icon: 'success'
        });
      } else {
        uni.showToast({
          title: '当前没有可刷新的 URL',
          icon: 'none'
        });
      }
    },
    //资源嗅探结果显示
    zyxxs() {
      this.zyxx = !this.zyxx;

      // 获取 webview 对象
      const currentWebview = this.$scope.$getAppWebview();
      const wv = currentWebview.children()[0];

      if (wv) {
        if (this.zyxx) {

          wv.setStyle({
            width: '50%',
            height: '36%',
            top: '140',
            left: '25%'
          });
        } else {

          wv.setStyle({
            width: '100%',
            height: '72%',
            top: '140',
            left: '0'
          });
        }
      }
    },
    //关闭资源嗅探结果
    closezylist() {
      this.zyxx = false;
      const currentWebview = this.$scope.$getAppWebview();
      const wv = currentWebview.children()[0];

      if (wv) {
        if (this.zyxx) {

          wv.setStyle({
            width: '50%',
            height: '36%',
            top: '140',
            left: '25%'
          });
        } else {

          wv.setStyle({
            width: '100%',
            height: '72%',
            top: '140',
            left: '0'
          });
        }
      }
    },
    init_msg() {
      plus.globalEvent.addEventListener('receiveMessage', function (msg) {
        console.log('receiveMessage', msg);
      })
    },
    onPostMessage(event) {
      console.log('onPostMessage:', event.data);
    },
    // 修改后的 onMessage 方法
    onMessage(event) {
      if (event.detail.data[0].type === 'getUrl') {
        this.ssurl = event.detail.data[0].url;
      }
      // 使用防抖处理，避免短时间内多次执行
      if (this.messageProcessTimer) {
        clearTimeout(this.messageProcessTimer);
      }

      // 收集数据，稍后批量处理
      if (!this.pendingMessages) {
        this.pendingMessages = [];
      }

      const data = event.detail.data;
      if (Array.isArray(data) && data.length > 0) {
        this.pendingMessages.push(...data);
      }

      // 设置延迟处理，批量处理收集到的消息
      this.messageProcessTimer = setTimeout(() => {
        this.processPendingMessages();
      }, 300); // 300ms 的延迟，可根据实际情况调整
    },

    // 新增批量处理方法
    processPendingMessages() {
      if (!this.pendingMessages || this.pendingMessages.length === 0) {
        return;
      }

      // 批量处理所有待处理消息
      for (const item of this.pendingMessages) {
        const url = item.url;
        const mediaType = item.mediaType;
        const base64Pattern = /^data:image\/(jpeg|jpg|gif|png|bmp|webp);base64,/i;

        // 先处理 base64 图片
        if (base64Pattern.test(url)) {
          this.pendingMessages = this.pendingMessages.filter(i => i.url !== url);
          this.handleBase64Image(url);
          continue;
        }

        // 处理普通资源
        if (mediaType === 'video') {
          // 视频使用 push 添加到末尾
          if (!this.getlist.video.includes(url)) {
            this.getlist.video.push(url);
          }
        } else if (mediaType === 'image') {
          // 图片使用 unshift 添加到开头
          if (!this.getlist.image.includes(url)) {
            this.getlist.image.unshift(url);
          }
        } else {
          if (!this.getlist.unknown.includes(url)) {
            this.getlist.unknown.push(url);
          }
        }
      }

      console.log('this.getlist', this.getlist);
      this.pendingMessages = [];
    },

    // 新增辅助方法
    addUniqueItem(array, item) {
      if (!array.includes(item)) {
        array.push(item);
      }
    },

    // 独立处理 base64 图片
    async handleBase64Image(base64Data) {
      try {
        const path = await base64ToPath(base64Data);
        if (!this.getlist.image.includes(path)) {
          this.getlist.image.push(path);
        }
      } catch (error) {
        console.error('Base64 转换失败:', error);
        // 可选：将原始 base64 存入其他数组
        // this.addUniqueItem(this.getlist.base64, base64Data);
      }
    },

    //搜索框搜索URL
    searchurl() {
      const urlPattern = /(https?:\/\/[^\s]+)/g;
      const urls = this.ssurl.match(urlPattern);

      this.dianjpd = false;
      if (urls && urls.length > 0) {
        const firstUrl = urls[0];
        this.ssurl = firstUrl;
        this.shuaxurl = firstUrl;

        // 创建新对象
        const newItem = {
          data: firstUrl,
          thekey: 'ss'
        };

        // 检查是否已存在相同项
        const exists = this.fangwenglist.some(item =>
          item.data === newItem.data && item.thekey === newItem.thekey
        );

        if (!exists) {
          this.updateFangwenglist(newItem);
        }

        // 显示等待提示
        uni.showLoading({
          title: '等待中...',
          mask: true
        });

        // 调用 get_webview 方法
        this.get_webview({ url: firstUrl });
      } else {
        uni.showToast({
          title: '未识别到有效的 URL',
          icon: 'none'
        });
      }
    },
    //关键词搜索功能
    search() {
      if (this.value.trim() == '' || this.value == null) {
        uni.showToast({
          title: '请输入关键词',
          icon: 'none'
        });
      } else {
        const encodedValue = encodeURIComponent(this.value);
        const newItem = {
          data: this.value,
          thekey: 'gjc'
        };
        this.dianjpd = true;
        // 检查是否已存在相同项
        const exists = this.fangwenglist.some(item =>
          item.data === newItem.data && item.thekey === newItem.thekey
        );

        if (!exists) {
          this.updateFangwenglist(newItem);
        }

        this.kzxx = false;
        this.zyxx = false;
        this.ssurl = `https://quark.sm.cn/s?q=${encodedValue}&safe=1&snum=6`;
        this.get_webview({
          url: `https://quark.sm.cn/s?q=${encodedValue}&safe=1&snum=6`
        });
      }
    },
    //打开URL
    openUrl() {
      const urlPattern = /(https?:\/\/[^\s]+)/g;
      const urls = this.value.match(urlPattern);

      if (urls && urls.length > 0) {
        const firstUrl = urls[0];
        const newItem = {
          data: firstUrl,
          thekey: 'ss'
        };

        const exists = this.fangwenglist.some(item =>
          item.data === newItem.data && item.thekey === newItem.thekey
        );

        if (!exists) {
          this.updateFangwenglist(newItem);
          this.dianjpd = false;
        }

        this.ssurl = firstUrl;
        this.shuaxurl = firstUrl;
        this.kzxx = false;
        this.zyxx = false;
        console.log('识别到的第一个 URL:', firstUrl);
        this.get_webview({
          url: firstUrl
        });
      } else {
        console.log('请确保文本中包含完整链接内容，也可以尝试关键词搜索');
        uni.showToast({
          title: '请确保文本中包含完整链接内容，也可以尝试关键词搜索',
          icon: 'none'
        })
      }
    },

    recenturl(item) {
      if (item.thekey == 'ss') {
        this.get_webview({ url: item.data });
        this.kzxx = false;
        this.zyxx = false;
      }
      else if (item.thekey == 'gjc') {
        this.get_webview({ url: `https://quark.sm.cn/s?q=${item.data}&safe=1&snum=6` });
        this.kzxx = false;
        this.zyxx = false;
      }
    },
    clearss() {
      this.value = '';
    },
    //获取webview
    get_webview(option) {
      uni.showLoading({
        title: '解析中...',
        mask: true
      })
      // if (option.url) {
      //   this.view_url = option.url
      // }
      //设置userAgent代理
      // plus.navigator.setUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36");
      if (this.uapuanduan) {
        plus.navigator.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1')
        uni.showToast({
          title: `当前为${!this.uapuanduan ? 'PC' : '移动'}模式`,
          icon: 'none'
        });
      } else {
        plus.navigator.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36')
        uni.showToast({
          title: `当前为${!this.uapuanduan ? 'PC' : '移动'}模式`,
          icon: 'none'
        });
      }


      // #ifdef APP-PLUS
      var currentWebview = this.$scope.$getAppWebview() //获取当前页面的webview对象
      setTimeout(function () {
        wv = currentWebview.children()[0]
        wv.setStyle && wv.setStyle({
          scalable: true,
          width: '100%',
          height: '72%',
          top: '140',
          left: '0',
          bounce: 'vertical',
          zIndex: 1
        })
        wv.appendJsFile('static/js/preload.js')
        wv.appendJsFile('static/js/uni_bridge.js')
        wv.appendJsFile('static/js/media-logger.js')
        wv.loadURL(option.url)
        uni.hideLoading()
        wv.overrideUrlLoading({
          // "reject"  表示满足match属性定义的提交时拦截url跳转并触发callback回调，不满足match属性定义的条件时不拦截url继续加载。
          // "allow"  表示满足match属性定义的条件时不拦截url继续加载，不满足match属性定义的条件时拦截url跳转并触发callback回调；
          mode: 'reject',
          match: '^(?!https?://).*', // '^(snssdk1128:\/\/.*|appmarket:\/\/.*)$'
        }, function (e) {
          console.log(e)
          console.log('reject Url', url);
        })
      }, 1000); //如果是页面初始化调用时，需要延时一下
      // #endif
    },
    //清空资源列表
    clearzylist() {
      // 清空 zylist 数组
      this.getlist = {
        all: [],
        base64: [],
        image: [],
        video: [],
        unknown: []
      };
      uni.showToast({
        title: '列表已清空',
        icon: 'success'
      });
    },
    //清空输入框
    clearInput() {
      this.ssurl = ''; // 清空输入框内容
    },
    //下载视频
    downloadVideo(url) {
      uni.showLoading({
        title: '下载中...',
        mask: true
      });

      uni.downloadFile({
        url: url,
        success: (res) => {
          if (res.statusCode === 200) {
            // 保存文件到本地
            uni.saveFile({
              tempFilePath: res.tempFilePath,
              success: (saveRes) => {
                // 将视频保存到相册
                uni.saveVideoToPhotosAlbum({
                  filePath: saveRes.savedFilePath,
                  success: () => {
                    uni.hideLoading();
                    uni.showToast({
                      title: '保存成功',
                      icon: 'success'
                    });
                  },
                  fail: (err) => {
                    uni.hideLoading();
                    uni.showToast({
                      title: '保存失败',
                      icon: 'none'
                    });
                    console.error('保存失败:', err);
                  }
                });
              },
              fail: (saveErr) => {
                uni.hideLoading();
                uni.showToast({
                  title: '保存文件失败',
                  icon: 'none'
                });
                console.error('保存文件失败:', saveErr);
              }
            });
          } else {
            uni.hideLoading();
            uni.showToast({
              title: '视频下载失败',
              icon: 'none'
            });
            console.error('视频下载失败:', res);
          }
        },
        fail: (err) => {
          uni.hideLoading();
          uni.showToast({
            title: '视频下载失败',
            icon: 'none'
          });
          console.error('视频下载失败:', err);
        }
      });
    },
    //下载图片
    downloadImage(url) {
      uni.showLoading({
        title: '下载中...',
        mask: true
      });

      // 判断是否是临时路径（以 _doc/uniapp_temp/ 开头）
      const tempPathPattern = /^_doc\/uniapp_temp\/.*/;
      if (tempPathPattern.test(url)) {
        console.log(url);

        pathToBase64(url)
          .then(base64 => {
            this.downloadBase64Image(base64, 'img.png');
          })
          .catch(error => {
            console.error(error)
          })

      }

      // 如果是普通图片 URL，直接下载并保存
      uni.downloadFile({
        url: url,
        success: (res) => {
          if (res.statusCode === 200) {
            // 将图片保存到相册
            uni.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success: () => {
                uni.hideLoading();
                uni.showToast({
                  title: '保存成功',
                  icon: 'success'
                });
              },
              fail: (err) => {
                uni.hideLoading();
                uni.showToast({
                  title: '保存失败',
                  icon: 'none'
                });
                console.error('保存到相册失败:', err);
              }
            });
          } else {
            uni.hideLoading();
            uni.showToast({
              title: '图片下载失败',
              icon: 'none'
            });
            console.error('图片下载失败:', res);
          }
        },
        fail: (err) => {
          uni.hideLoading();
          uni.showToast({
            title: '图片下载失败',
            icon: 'none'
          });
          console.error('图片下载失败:', err);
        }
      });
    },
    //下载base64图片
    downloadBase64Image(base64Data, fileName) {
      const bitmap = new plus.nativeObj.Bitmap("img");
      bitmap.loadBase64Data(base64Data, () => {
        const path = `_downloads/${fileName}`; // App 端存储路径
        bitmap.save(path, {}, () => {
          uni.saveImageToPhotosAlbum({
            filePath: path,
            success: () => {
              uni.hideLoading(); // 隐藏加载动画
              uni.showToast({ title: '下载成功', icon: 'success' });
            },
            fail: (err) => {
              uni.hideLoading(); // 隐藏加载动画
              console.error('保存失败', err);
              uni.showToast({ title: '保存失败', icon: 'none' });
            }
          });
        }, (error) => {
          uni.hideLoading(); // 隐藏加载动画
          console.error('保存失败', error);
        });
      }, (error) => {
        uni.hideLoading(); // 隐藏加载动画
        console.error('加载Base64失败', error);
      });
    },
    // 更新最近访问列表
    updateFangwenglist(item) {
      // 查找是否存在相同项（根据data和thekey判断）
      const existingIndex = this.fangwenglist.findIndex(i =>
        i.data === item.data && i.thekey === item.thekey
      );

      // 如果已存在，先移除旧项
      if (existingIndex > -1) {
        this.fangwenglist.splice(existingIndex, 1);
      }

      // 添加新项到数组开头
      this.fangwenglist.unshift(item);

      // 保持数组长度不超过20
      if (this.fangwenglist.length > 20) {
        this.fangwenglist.pop(); // 移除最后一项
      }

      // 更新本地存储
      uni.setStorageSync('fangwenglist', this.fangwenglist);
    },
    // 切换编辑状态
    editfangweng() {
      this.isEditing = !this.isEditing;
    },
    // 删除对应的项
    deleteFangweng(index) {
      if (Array.isArray(this.fangwenglist)) {
        this.fangwenglist.splice(index, 1);
        uni.setStorageSync('fangwenglist', this.fangwenglist);
      }
    },

    kzuapuanduan() {
      this.uapuanduan = !this.uapuanduan;
      // uni.setStorageSync('uapuanduan', this.uapuanduan);


      const ua = this.uapuanduan ?
        'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1' :
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36';

      plus.navigator.setUserAgent(ua);


      this.get_webview({ url: this.ssurl });

      uni.showToast({
        title: `已切换至${this.uapuanduan ? '移动' : 'PC'}模式，需要重新进入才能生效`,
        icon: 'none'
      });

    },
    // 更新历史记录
    updateHistory(url) {
      if (this.historyStack[this.currentIndex] !== url) {
        // 移除当前索引后的记录
        this.historyStack = this.historyStack.slice(0, this.currentIndex + 1);
        this.historyStack.push(url);
        this.currentIndex++;
      }
    },
  }
}
</script>

<style lang="scss">
.masks {
  margin-top: 50rpx;
  width: 100%;
  height: 800rpx;

  image {
    width: 100%;
    height: 100%;
  }
}

.maxbox {
  width: 100%;
  height: 100vh;
  background: #F7F8FA;
  overflow: hidden;
}

.box {
  width: 100%;
  padding: 20rpx;
  box-sizing: border-box;

  .input-style {
    width: 100%;
    height: 300rpx;
    border: 0px;
    border-radius: 20rpx;
    padding: 20rpx;
    box-sizing: border-box;
    background: #FFFFFF;
    font-size: 28rpx;
    line-height: 1.5;
    white-space: normal;
  }
}

.jgtitle {
  width: 100%;
  font-size: 30rpx;
  color: #FF8F1F;

  background: #FFF2E6;
  padding: 20rpx;
  display: flex;
}

.wbys {
  display: flex;
  align-items: center;
  margin: 20rpx 0;

  .zwbox {
    border-radius: 40rpx;
    width: 8rpx;
    height: 32rpx;
    background-color: #7D5ADB;
    margin-right: 12rpx;
    margin-top: 4rpx;
  }

  .wbys-title {
    font-size: 32rpx;
    line-height: 1.4;
    color: #333;
    font-weight: 600;
  }
}

.input-box {
  position: relative;

  .title1 {
    position: absolute;
    bottom: 16rpx;
    right: 250rpx;
    padding: 10rpx;
    color: #7D5ADB;
  }

  .title2 {
    position: absolute;
    bottom: 16rpx;
    right: 20rpx;
    padding: 10rpx;
    color: #7D5ADB;
  }

  .title3 {
    position: absolute;
    bottom: 16rpx;
    left: 20rpx;
    padding: 10rpx;
    color: #7D5ADB;
  }
}


.zylist {
  width: 100%;
  height: 50vh;
  /* 使用视口高度单位 */
  overflow-y: auto;
  background: #FFFFFF;
  z-index: 1001;
  box-sizing: border-box;
  position: fixed;
  left: 0;
  bottom: 0;
  box-shadow: 0 -4rpx 12rpx rgba(125, 90, 219, 0.1);
  border-radius: 36rpx 36rpx 0 0;
}

.zylist-header {
  position: sticky;
  top: 0;
  z-index: 1001;
  background-color: #FFFFFF;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);

}

.closebtn {
  position: absolute;
  right: 24rpx;
  top: 20rpx;
}

.zylist-title {
  font-size: 32rpx;
  color: #333;
  font-weight: 800;
  padding: 20rpx;
  text-align: center;
}

.tabs {
  display: flex;
  gap: 20rpx;
  margin-bottom: 24rpx;
  padding: 16rpx 0;
  position: sticky;
  top: 0;
  background-color: #FFFFFF;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);

  text {
    flex: 1;
    padding: 12rpx 24rpx;
    text-align: center;
    font-size: 28rpx;
    color: #666;
    border-radius: 8rpx;
    transition: all 0.3s ease;
    cursor: pointer;

    &.active {
      color: #7D5ADB; // 紫色
      font-weight: bold;

    }

    &:active {
      transform: scale(0.98);
    }
  }

  .clearzylist {
    text-align: center;
    margin-left: 20rpx;
    white-space: nowrap;
  }
}

.atvideoitems {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20rpx;
  padding: 20rpx;
  margin-bottom: 20rpx;

  .videoitems {
    width: 100%;
    height: 280rpx;
    background: #000;
    object-fit: contain;
    margin-bottom: 60rpx;

    .videoitem {
      width: 100%;
      height: 260rpx;
    }



  }
}

.atimgitems {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15rpx;
  padding: 20rpx;

  .imgitem {
    width: 100%;
    height: 200rpx;
    overflow: hidden;
    background: #f5f5f7;
    position: relative;

    image {
      position: absolute;
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
}

.navber {
  width: 100%;
  height: 140rpx;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #FFFFFF;

  .navberkzt1 {
    width: 272rpx;
    height: 104rpx;
    border-radius: 0rpx 400rpx 400rpx 0rpx;
    background: #8A38F5;
    box-shadow: 0rpx -10rpx 20rpx 0rpx rgba(0, 0, 0, 0.05);
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .navberkzt2 {
    width: 454rpx;
    height: 104rpx;
    border-radius: 400rpx 0rpx 0rpx 400rpx;
    background: #8A38F5;
    box-shadow: 0rpx 0rpx 16rpx 0rpx rgba(0, 0, 0, 0.05);
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-size: 32rpx;

    span {
      color: #FFC300;
    }
  }
}

.downloadbtn {

  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: #f5f5f7;
  color: #7D5ADB;
  padding: 10rpx;
  font-size: 24rpx;
  text-align: center;
  box-sizing: border-box;
  border-top: 1rpx solid rgba(216, 216, 216, 0.3);
}

.recentbox {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: left;
  flex-wrap: wrap;
  max-height: 200rpx;
  overflow: hidden;

  .recentfangweng {
    position: relative;
    padding: 10rpx;
    background: #FFFFFF;
    border-radius: 10rpx;
    margin-right: 10rpx;
    margin-bottom: 10rpx;
    max-width: 300rpx;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    .delete-btn {
      position: absolute;
      top: -10rpx;
      right: -10rpx;
      width: 40rpx;
      height: 40rpx;
      background-color: #ff4d50a9;
      color: #fff;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 28rpx;
      cursor: pointer;
    }
  }

}

.editbox {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.searchnavber {
  position: fixed;
  top: 12rpx;
  left: 20rpx;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10rpx;

  .searchview {
    width: 180rpx;
    height: 80rpx;
    border: 2rpx solid #7D5ADB;
    background: #FFFFFF;
    border-radius: 16rpx;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 0 20rpx;
    box-sizing: border-box;
    color: #000;
    margin-right: 20rpx;

    text {
      white-space: nowrap;
      font-size: 28rpx;
    }

    image {
      width: 40rpx;
      height: 40rpx;
    }

    u-icon {
      width: 40rpx;
      height: 40rpx;
    }
  }

  .search-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: 10rpx;
    height: 80rpx;
    font-size: 32rpx;
    padding: 0 32rpx;
    border-radius: 16rpx;
    background: #FFFFFF;
    box-sizing: border-box;
    border: 2rpx solid #7D5ADB;
    box-shadow: 0rpx 8rpx 20rpx 0rpx rgba(179, 182, 212, 0.1);

    input {
      height: 32rpx;
      margin: 20rpx 0;
    }

    .clear-btn {
      position: absolute;
      right: 120rpx; // 调整位置，确保不覆盖搜索按钮
      cursor: pointer;
      transition: opacity 0.3s ease;

      &:hover {
        opacity: 0.8;
      }
    }

    .search-input-title {
      font-size: 32rpx;
      color: #7D5ADB;
      white-space: nowrap;

      &::before {
        content: '|';
        margin-right: 16rpx;
        color: var(--border-color);
      }
    }
  }
}

.searchurl {
  white-space: nowrap;
}
</style>