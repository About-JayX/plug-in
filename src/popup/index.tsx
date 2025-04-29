import { createRoot } from 'react-dom/client'
import App from './App'

const popupElement = document.getElementById('popup')
if (popupElement) {
  console.log('Popup element found')
  createRoot(popupElement).render(<App />)
} else {
  console.error('Popup element not found')
}
