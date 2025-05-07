import { ObservableArray } from '../proxy'
import { SimpleToken, Token } from '../script/type'
import { createAtToken } from './createAtToken'
;(() => {
  let popupProt: chrome.runtime.Port | null = null
  const tokens: SimpleToken[] = ObservableArray(data => {
    popupProt?.postMessage({
      type: 'UPDATE_TOKENS',
      payload: {
        data,
      },
    })
  })

  chrome.runtime.onConnect.addListener(port => {
    switch (port.name) {
      case 'CREATED_AT_TOKEN':
        port.onMessage.addListener(message => {
          const token: Token = message.payload.data
          createAtToken(token, tokens)
        })
        break
      case 'FOUR_MEME_TOKEN':
        port.onMessage.addListener(message => {
          console.log(message.payload.data, 'four meme')
        })
        break

      case 'POPUP_PORT':
        popupProt = port
        break
    }
  })
  chrome.runtime.onMessage.addListener(message => {
    switch (message.type) {
      case 'REQUEST_TOKENS':
        console.log('请求数据')

        popupProt?.postMessage({
          type: 'UPDATE_TOKENS',
          payload: { data: tokens },
        })
        break
      case 'CHECK_DATA': {
        const x = tokens[0].twitter
        if (!x) return
        fetch(x)
          .then(response => response.text())
          .then(data => console.log(data, 'data_'))
          .catch(err => console.log(err, 'err_'))
        break
      }

      default:
        break
    }
  })
})()
