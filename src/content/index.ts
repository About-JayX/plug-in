const script = document.createElement('script')
script.type = 'module'
script.src = chrome.runtime.getURL('script/ws-sniffer.js')
// script.onload = () => script.remove()
;(document.head || document.documentElement).appendChild(script)
