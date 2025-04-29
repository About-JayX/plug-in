import { isValidTwitter } from '../utils'
import { Token, SimpleToken } from '../../script/type'
import dayjs from 'dayjs'

export const createAtToken = (token: Token, tokens: SimpleToken[]) => {
  if (
    !token.website &&
    (!token.twitter || !isValidTwitter(token.twitter)) &&
    !token.telegram
  )
    return

  const simpleToken = {
    mint: token.mint,
    symbol: token.symbol,
    name: token.name,
    creator: token.creator,
    createdAt: dayjs(token.created_timestamp).format('YYYY-MM-DD HH:mm:ss'),
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
}
