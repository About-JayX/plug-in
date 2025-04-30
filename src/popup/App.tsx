import { useEffect, useState } from 'react'
const popupPort = chrome.runtime.connect({ name: 'POPUP_PORT' })
const App = () => {
  const [data, setData] = useState([])
  const requestData = () => {
    chrome.runtime.sendMessage({ type: 'REQUEST_TOKENS' })
  }
  useEffect(() => {
    popupPort.onMessage.addListener(message => {
      if (message.type === 'UPDATE_TOKENS') {
        setData(message.payload.data)
      }
    })
  }, [])

  return (
    <div>
      <button onClick={requestData}>请求数据</button>
      Hello popup! 已经监听到 {data.length} 条数据 {new Date().toLocaleString()}
    </div>
  )
}

export default App
