import ExcelJS from 'exceljs'
import { ExcelConfig } from '../config/excel_config'
import { saveAs } from 'file-saver'
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

export const exportTokensToExcel = async (tokens: any[]) => {
  const workbook = new ExcelJS.Workbook()
  const worksheet = workbook.addWorksheet('Tokens')
  // 设置列定义
  // 表头行：映射 ExcelConfig
  const headers = Object.entries(ExcelConfig).map(([key, header]) => ({
    key,
    header,
    width:
      key === 'mint' || key === 'creator'
        ? 48
        : key === 'twitter' || key === 'telegram' || key === 'website'
        ? 65
        : 25,
    style: {
      alignment: { vertical: 'middle' as const, horizontal: 'center' as const },
      font: { bold: true },
    },
  }))

  worksheet.columns = headers
  // 添加数据
  tokens.forEach(token => {
    const row = worksheet.addRow(token)
    // 行高（可适当调整）
    row.height = 24
    // 禁止换行、超出隐藏（通过 alignment）
    row.eachCell(cell => {
      cell.alignment = {
        vertical: 'middle',
        horizontal: 'left',
        wrapText: true,
      }
    })

    const socialCount = [token.twitter, token.website, token.telegram].filter(
      Boolean
    ).length
    let fillColor = null
    if (socialCount === 3) fillColor = 'FF9999' // 红色
    else if (socialCount === 2) fillColor = 'FFFF99' // 黄色

    if (fillColor) {
      row.eachCell({ includeEmpty: true }, function (cell) {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: fillColor },
        }
      })
    }
  })
  const buffer = await workbook.xlsx.writeBuffer()
  saveAs(new Blob([buffer]), 'tokens.xlsx')
}
