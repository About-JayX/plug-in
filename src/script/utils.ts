export const extractJsonFromData = async (
  data: string | AllowSharedBufferSource | undefined
) => {
  let text = ''

  if (data instanceof ArrayBuffer) {
    text = new TextDecoder('utf-8').decode(data)
  } else if (data instanceof Blob) {
    const arrayBuffer = await data.arrayBuffer()
    text = new TextDecoder('utf-8').decode(arrayBuffer)
  } else if (typeof data === 'string') {
    text = data
    return null
  } else {
    console.warn('❓ Unknown data type:', data)
    return null
  }

  // 找到第一个 { 或 [
  const firstBrace = text.indexOf('{')
  const firstBracket = text.indexOf('[')

  let firstJsonCharIndex = -1
  if (firstBrace === -1 && firstBracket === -1) {
    console.warn(text, '❓ 找不到 { 或 [，不是 JSON 格式')
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
