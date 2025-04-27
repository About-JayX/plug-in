;(function () {
  const OriginalWebSocket = window.WebSocket

  function CustomWebSocket(url, protocols) {
    const ws = protocols
      ? new OriginalWebSocket(url, protocols)
      : new OriginalWebSocket(url)

    ws.addEventListener('message', event => {
      console.log('Received:', event.data)
      // 在此处理接收到的消息
    })

    const originalSend = ws.send
    ws.send = function (data) {
      console.log('Sent:', data)
      // 在此处理即将发送的消息
      return originalSend.call(this, data)
    }

    return ws
  }

  CustomWebSocket.prototype = OriginalWebSocket.prototype
  window.WebSocket = CustomWebSocket
})()
