import { createRoot } from 'react-dom/client';

console.log('Popup script loaded');

const popupElement = document.getElementById('popup');
if (popupElement) {
  console.log('Popup element found');
  createRoot(popupElement).render(
    <div>
      <h1>Hello popup!</h1>
    </div>
  );
} else {
  console.error('Popup element not found');
}
