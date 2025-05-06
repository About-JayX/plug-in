import {checkFourMemeTokenArray, extractJson} from "./utils";
(function () {
  const originalOpen = XMLHttpRequest.prototype.open
  const originalSend = XMLHttpRequest.prototype.send

  XMLHttpRequest.prototype.open = function (method: string, url: string | URL) {
    // 自定义属性保存请求地址
    (this as any)._url = url; // 保存可能修改后的 URL
    return originalOpen.call(this, method, url, true)
  }

  XMLHttpRequest.prototype.send = function (body?: Document | XMLHttpRequestBodyInit) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const xhr = this
    const originalOnload = xhr.onload

    xhr.onload = function (event) {
      try {
        const contentType = xhr.getResponseHeader('Content-Type')
        console.log('🎯 XHR 请求地址:', (xhr as any)._url,)
        switch (contentType!.split(';')[0]) {
          case "application/json": {
            const data = extractJson(xhr.responseText)
            let response = data;
            if (data) {
              if ('data' in data) {
                response = data.data;
              }
            }
            // console.log('Response :', checkFourMemeTokenArray(response))
            const fourMeme = checkFourMemeTokenArray(response);
            if (fourMeme) {
              // console.log('📦 Four Meme response:', fourMeme)
              for (const meme of fourMeme) {
                if (meme.webUrl || meme.twitterUrl || meme.telegramUrl) {
                  window.postMessage({type: 'FOUR_MEME_TOKEN', data: meme})
                }
              }
            }
            break
          }
          default:
            break
        }
      } catch (e) {
        console.warn('❌ 日志打印异常:', e)
      }

      if (typeof originalOnload === 'function') {
        originalOnload.call(xhr, event)
      }
    }

    return originalSend.apply(this, [body])
  }
})()
