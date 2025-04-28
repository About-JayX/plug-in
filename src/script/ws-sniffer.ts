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
      const data = await extractJsonFromData(event.data)
      if (data) {
        if (data.mint && !data.signature) {
          window.postMessage({ type: 'CREATED_AT_TOKEN', data })
        }
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
