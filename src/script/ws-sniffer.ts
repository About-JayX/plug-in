;(function () {
  const OriginalWebSocket = window.WebSocket

  async function extractJsonFromData(
    data: string | AllowSharedBufferSource | undefined
  ) {
    let text = ''

    if (data instanceof ArrayBuffer) {
      text = new TextDecoder('utf-8').decode(data)
    } else if (data instanceof Blob) {
      const arrayBuffer = await data.arrayBuffer()
      text = new TextDecoder('utf-8').decode(arrayBuffer)
    } else {
      console.warn('❓ Unknown data type:', data)
      return null
    }

    // 找到第一个 { 或 [
    const firstBrace = text.indexOf('{')
    const firstBracket = text.indexOf('[')

    let firstJsonCharIndex = -1
    if (firstBrace === -1 && firstBracket === -1) {
      console.warn('❓ 找不到 { 或 [，不是 JSON 格式')
      return null
    } else if (firstBrace === -1) {
      firstJsonCharIndex = firstBracket
    } else if (firstBracket === -1) {
      firstJsonCharIndex = firstBrace
    } else {
      firstJsonCharIndex = Math.min(firstBrace, firstBracket)
    }

    const jsonPart = text.slice(firstJsonCharIndex)

    try {
      return JSON.parse(jsonPart)
    } catch (e) {
      console.error('❌ JSON 解析失败:', e, jsonPart)
      return null
    }
  }

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
