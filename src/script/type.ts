export interface Token extends SimpleToken {
  mint: string
  name: string
  symbol: string
  description: string
  image_uri: string
  metadata_uri: string
  twitter: string | null
  telegram: string | null
  bonding_curve: string
  associated_bonding_curve: string
  creator: string
  created_timestamp: number
  raydium_pool: string | null
  complete: boolean
  virtual_sol_reserves: number
  virtual_token_reserves: number
  hidden: string | null
  total_supply: number
  website: string
  show_name: boolean
  last_trade_timestamp: number | null
  king_of_the_hill_timestamp: number | null
  market_cap: number
  nsfw: boolean
  market_id: string | null
  inverted: boolean | null
  real_sol_reserves: number
  real_token_reserves: number
  livestream_ban_expiry: number
  last_reply: number | null
  reply_count: number
  is_banned: boolean
  is_currently_live: boolean
  initialized: boolean
  video_uri: string | null
  updated_at: number | null
  pump_swap_pool: string | null
  ath_market_cap: number | null
  ath_market_cap_timestamp: number | null
  banner_uri: string | null
  hide_banner: boolean
  usd_market_cap: number
}

export interface SimpleToken {
  mint: string
  symbol: string
  name: string
  creator: string
  createdAt: number
  twitter: string | null
  website: string
  telegram: string | null
  description: string
}
