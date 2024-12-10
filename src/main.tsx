import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

console.log("Main script executing");

const root = document.getElementById('root');
if (!root) {
  console.error("Root element not found");
} else {
  console.log("Root element found, mounting app");
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}
