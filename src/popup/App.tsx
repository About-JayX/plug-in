import { useEffect, useRef, useState } from 'react'
import { exportTokensToExcel } from '../script/utils'
const App = () => {
  const [data, setData] = useState([])
  const port = useRef<chrome.runtime.Port | null>(null)
  const requestData = () => {
    chrome.runtime.sendMessage({ type: 'REQUEST_TOKENS' })
  }
  const exportData = () => {
    exportTokensToExcel(data)
  }
  const checkData = () => {
    chrome.runtime.sendMessage({ type: 'CHECK_DATA' })
  }
  useEffect(() => {
    port.current = chrome.runtime.connect({ name: 'POPUP_PORT' })
    console.log(port.current, 'port.current')
    port.current?.onMessage.addListener(message => {
      if (message.type === 'UPDATE_TOKENS') {
        setData(message.payload.data)
      }
    })
  }, [])

  useEffect(() => {
    console.log(data, 'data')
  }, [data])

  return (
    <div>
      <div>
        <button onClick={checkData}>检测数据是否存在</button>
        <button onClick={requestData}>请求数据</button>
        <button onClick={exportData}>导出数据</button>
        Hello popup! 已经监听到 {data.length} 条数据{' '}
        {new Date().toLocaleString()}
      </div>
      <div>
        <input type="text" />
        <button>添加</button>
      </div>
    </div>
  )
}

export default App
