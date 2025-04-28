const script = document.createElement('script')
script.src = chrome.runtime.getURL('script/ws-sniffer.js')
console.log('load_')

script.onload = function () {
  console.log('onload script_')
  ;(this as HTMLScriptElement).remove()
}
;(document.head || document.documentElement).appendChild(script)
