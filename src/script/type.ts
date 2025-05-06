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
  createdAt: string
  twitter: string | null
  website: string
  telegram: string | null
  description: string
}
export enum Chain {
  bsc,
  solana
}

export interface UnifiedToken {
  name: string
  symbol: string
  description: string
  logo: string
  twitter: string | null
  website: string
  telegram: string | null
  createdAt: string
  address: string
  chain: Chain
  dex: string
}

export interface FourMemeBase {
  address: string;
  image: string;
  name: string
  shortName: string
  status: string
  createDate: number;
}

export interface FourMemeToken extends FourMemeBase {
  id: number;
  address: string;
  image: string;
  name: string;
  shortName: string;
  symbol: string;
  descr: string;
  webUrl: string | null;
  telegramUrl: string| null;
  twitterUrl: string| null;
  totalAmount: string;
  saleAmount: string;
  b0: string;
  t0: string;
  launchTime: number;
  minBuy: string;
  maxBuy: string;
  userId: number;
  userAddress: string;
  userName: string;
  userAvatar: string;
  status: "PUBLISH" | string; // You might want to define a more specific enum if you know the possible values
  showStatus: "SHOW" | string; // Same as above
  tokenPrice: {
    price: string;
    maxPrice: string;
    increase: string;
    amount: string;
    marketCap: string;
    trading: string;
    dayIncrease: string;
    dayTrading: string;
    raisedAmount: string;
    progress: string;
    liquidity: string;
    tradingUsd: string;
    tamount: string;
    bamount: string;
  };
  oscarStatus: "Hide" | string; // Same as above
  progressTag: boolean;
  ctoTag: boolean;
  version: "V3" | string; // Same as above
  clickFunCheck: boolean;
  reserveAmount: string;
  raisedAmount: string;
  networkCode: "BSC" | string; // Same as above
  label: "Meme" | string; // Same as above
  createDate: number;
  isRush: boolean;
  dexType: "PANCAKE_SWAP" | string; // Same as above
}
