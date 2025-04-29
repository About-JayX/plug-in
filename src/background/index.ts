import { SimpleToken, Token } from '../script/type'
import { createAtToken } from './createAtToken'
;(() => {
  const tokens: SimpleToken[] = []
  chrome.runtime.onConnect.addListener(port => {
    switch (port.name) {
      case 'CREATED_AT_TOKEN':
        port.onMessage.addListener(message => {
          const token: Token = message.payload.data
          createAtToken(token, tokens)
          console.log(tokens, '记录状态')
        })

        break
    }
  })
})()
