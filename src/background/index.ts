import { SimpleToken, Token } from '../script/type'
;(() => {
  const tokens: SimpleToken[] = []
  chrome.runtime.onConnect.addListener(port => {
    switch (port.name) {
      case 'CREATED_AT_TOKEN':
        port.onMessage.addListener(message => {

          const token: Token = message.payload.data

          const simpleToken = {
            mint: token.mint,
            symbol: token.symbol,
            name: token.name,
            creator: token.creator,
            createdAt: token.created_timestamp,
            twitter: token.twitter,
            website: token.website,
            telegram: token.telegram,
            description: token.description,
          }
          const index = tokens.findIndex(item => item.mint === simpleToken.mint)
          if (index === -1) {
            tokens.push(simpleToken)
          } else {
            tokens[index] = simpleToken
          }
          console.log(tokens, 'tokens_')
        })
        break
    }
  })
})()
