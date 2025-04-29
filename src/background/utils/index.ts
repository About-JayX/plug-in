export const isValidTwitter = (url: string) => {
  return /^https:\/\/(twitter\.com|x\.com)\/\w+/.test(url)
}
