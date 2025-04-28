import { extractJsonFromData } from './utils'
;(() => {
  const OriginalWebSocket = window.WebSocket

  function CustomWebSocket(
    url: string | URL,
    protocols: string | string[] | undefined
  ) {
    const ws = protocols
      ? new OriginalWebSocket(url, protocols)
      : new OriginalWebSocket(url)

    ws.addEventListener('message', async event => {
      const json = await extractJsonFromData(event.data)
      if (json) {
        console.log('✅ 成功解析成对象:', json)
      }
    })

    const originalSend = ws.send
    ws.send = function (data) {
      return originalSend.call(this, data)
    }

    return ws
  }

  CustomWebSocket.prototype = OriginalWebSocket.prototype

  window.WebSocket = CustomWebSocket as unknown as typeof window.WebSocket
})()
