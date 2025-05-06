;(() => {
  const script = document.createElement('script')
  script.type = 'module'
  script.src = chrome.runtime.getURL('script/ws-sniffer.js')
  script.onload = () => script.remove()
  const http = document.createElement('script')
  http.type = 'module'
  http.src = chrome.runtime.getURL('script/http-sniffer.js')
  http.onload = http.remove

  ;(document.head || document.documentElement).appendChild(script)

  ;(document.head || document.documentElement).appendChild(http)

  const port = chrome.runtime.connect({name: 'CREATED_AT_TOKEN'})
  const four_meme_port = chrome.runtime.connect({name: "FOUR_MEME_TOKEN"})
  window.addEventListener('message', event => {
    switch (event.data.type) {
      case 'CREATED_AT_TOKEN':
        port.postMessage({type: 'CREATED_AT_TOKEN', payload: event.data})
        break
      case 'FOUR_MEME_TOKEN':
        four_meme_port.postMessage({type: "FOUR_MEME_TOKEN", payload: event.data})
        break
      default:
        break
    }
  })
})()
