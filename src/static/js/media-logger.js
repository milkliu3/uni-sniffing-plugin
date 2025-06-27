(function() {

  const mediaTypes = ['video', 'audio', 'image'];
  const originalOpen = XMLHttpRequest.prototype.open;
  const originalSend = XMLHttpRequest.prototype.send;
  const originalFetch = window.fetch;

  // 判断 URL 对应的媒体类型
  function getMediaType(url) {
    // 处理base64图片
    if (url && url.startsWith('data:')) {
      const mimeType = url.split(',')[0].split(':')[1].split(';')[0];
      if (mimeType.startsWith('image/')) return 'image';
      if (mimeType.startsWith('video/')) return 'video';
      if (mimeType.startsWith('audio/')) return 'audio';
      return 'unknown';
    }
    
    // 处理URL路径
    if (url) {
      // 通过文件扩展名判断
      const extension = url.split('?')[0].split('#')[0].split('.').pop().toLowerCase();
      const imageExts = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp', 'ico'];
      const videoExts = ['mp4', 'webm', 'ogg', 'mov', 'avi', 'mkv', 'm4v'];
      const audioExts = ['mp3', 'wav', 'ogg', 'aac', 'flac', 'm4a'];
      
      if (imageExts.includes(extension)) return 'image';
      if (videoExts.includes(extension)) return 'video';
      if (audioExts.includes(extension)) return 'audio';
      
      // 通过URL包含的关键词判断
      return mediaTypes.find(type => url.includes(type)) || 'unknown';
    }
    
    return 'unknown';
  }

  // 使用fetch HEAD请求获取资源类型
  async function fetchResourceType(url) {
    try {
      // 跳过base64和非http(s)链接
      if (url.startsWith('data:') || !(url.startsWith('http://') || url.startsWith('https://'))) {
        return null;
      }
      
      const response = await fetch(url, { method: 'HEAD' });
      const contentType = response.headers.get('content-type');
      
      return {
        url,
        status: response.status,
        contentType,
        mediaType: contentType ? 
          (contentType.includes('image') ? 'image' : 
           contentType.includes('video') ? 'video' : 
           contentType.includes('audio') ? 'audio' : 'unknown') 
          : 'unknown'
      };
    } catch (e) {
      console.warn('Failed to fetch resource type:', url, e);
      return null;
    }
  }

  // 发送资源信息到UniApp
  function sendResourceInfo(url, mediaType, additionalInfo = {}) {
    // 先通过URL判断媒体类型
    mediaType = mediaType || getMediaType(url);
    
    // 对于非base64的URL，尝试获取更准确的媒体类型
    if (!url.startsWith('data:')) {
      fetchResourceType(url).then(info => {
        if (info) {
          uni.postMessage({
            type: 'media-resource',
            data: {
              type: 'resource',
              url: url,
              mediaType: info.mediaType || mediaType,
              contentType: info.contentType,
              status: info.status,
              ...additionalInfo
            }
          });
        } else {
          // 如果获取失败，仍然发送原始信息
          uni.postMessage({
            type: 'media-resource',
            data: {
              type: 'resource',
              url: url,
              mediaType: mediaType,
              ...additionalInfo
            }
          });
        }
      });
    } else {
      // 对于base64直接发送
      uni.postMessage({
        type: 'media-resource',
        data: {
          type: 'resource',
          url: url,
          mediaType: mediaType,
          isBase64: true,
          ...additionalInfo
        }
      });
    }
  }

  // Hook XMLHttpRequest
  XMLHttpRequest.prototype.open = function(method, url, async, user, password) {
      this._url = url;
      return originalOpen.apply(this, arguments);
  };

  XMLHttpRequest.prototype.send = function(body) {
      const self = this;
      const mediaType = getMediaType(this._url);
      
      this.addEventListener('load', function() {
          try {
              const contentType = self.getResponseHeader('content-type');
              const response = typeof self.response === 'object' ? 
                  JSON.stringify(self.response) : self.response;
              uni.postMessage({
                  type: 'media-response-data',
                  data: {
                      type: 'response',
                      url: self._url,
                      mediaType: contentType ? 
                        (contentType.includes('image') ? 'image' : 
                         contentType.includes('video') ? 'video' : 
                         contentType.includes('audio') ? 'audio' : mediaType) 
                        : mediaType,
                      status: self.status,
                      contentType,
                      response: contentType && contentType.includes('json') ? response : '' // 限制响应体大小
                  }
              });
          } catch(e) { /* 安全处理 */ }
      });
      return originalSend.apply(this, arguments);
  };

  // Hook Fetch API
  window.fetch = function(...args) {
      const url = args[0] instanceof Request ? args[0].url : args[0];
      const mediaType = getMediaType(url);
      
      return originalFetch.apply(this, args).then(async response => {
          const cloneRes = response.clone();
          const contentType = cloneRes.headers.get('content-type');
          
          try {
              const responseData = contentType?.includes('json') ? 
                  await cloneRes.json() : 
                  await cloneRes.text();
              
              uni.postMessage({
                  type: 'media-response-data',
                  data: {
                      type: 'response',
                      url: response.url,
                      mediaType: contentType ? 
                        (contentType.includes('image') ? 'image' : 
                         contentType.includes('video') ? 'video' : 
                         contentType.includes('audio') ? 'audio' : mediaType) 
                        : mediaType,
                      status: response.status,
                      contentType,
                      response: contentType && contentType.includes('json') ?  
                          JSON.stringify(responseData) : ''
                  }
              });
          } catch(e) {}
          
          return response;
      });
  };

  // 监听 <video>、<audio> 和 <img> 元素
  function observeMediaElements() {
      document.querySelectorAll('video, audio, img').forEach(el => {
          // 监听 src 变化
          new MutationObserver(() => {
              if (el.src) {
                sendResourceInfo(el.src, el.tagName.toLowerCase() === 'img' ? 'image' : 
                                         el.tagName.toLowerCase() === 'video' ? 'video' : 'audio');
              }
          }).observe(el, { attributes: true, attributeFilter: ['src'] });

          // 监听 <source> 变化
          el.querySelectorAll('source').forEach(source => {
            console.log("source====>",source.src);
              new MutationObserver(() => {
                  if (source.src) {
                    const parentTag = source.parentElement.tagName.toLowerCase();
                    sendResourceInfo(source.src, parentTag === 'video' ? 'video' : 
                                               parentTag === 'audio' ? 'audio' : 'unknown');
                  }
              }).observe(source, { attributes: true, attributeFilter: ['src'] });
          });

          // 直接读取已有的 src
          if (el.src) {
            sendResourceInfo(el.src, el.tagName.toLowerCase() === 'img' ? 'image' : 
                                     el.tagName.toLowerCase() === 'video' ? 'video' : 'audio');
          }
      });
  }

  // 初始运行一次
  observeMediaElements();
  
  // 监听 DOM 变化，捕获动态添加的 <video>、<audio>、<img> 和 <source> 标签
  new MutationObserver(mutations => {
    let shouldObserve = false;
    
    mutations.forEach(mutation => {
      if (mutation.addedNodes.length) {
        shouldObserve = true;
      }
    });
    
    if (shouldObserve) {
      observeMediaElements();
    }
  }).observe(document.body, { childList: true, subtree: true });

  console.log('Media request logger initialized.');
  // 获取当前页面url
  const currentUrl = window.location.href;
  // 发送页面信息
  uni.postMessage({
    type: 'media-url',
    data: {
      type: 'getUrl',
      url: currentUrl
    }
  });
})();