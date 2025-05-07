;(() => {
  const script = document.createElement('script')
  script.type = 'module'
  script.src = chrome.runtime.getURL('script/ws-sniffer.js')
  script.onload = () => script.remove()
  console.log(script, 'script')

  ;(document.head || document.documentElement).appendChild(script)

  const port = chrome.runtime.connect({ name: 'CREATED_AT_TOKEN' })

  window.addEventListener('message', event => {
    switch (event.data.type) {
      case 'CREATED_AT_TOKEN':
        port.postMessage({ type: 'CREATED_AT_TOKEN', payload: event.data })
        break
      default:
        break
    }
  })
})()
