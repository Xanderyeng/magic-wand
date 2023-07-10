 React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import App from './AppV1.jsx'
import './index.css'
//import Wand from './WandV2.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
   {* <Wand /> *}
    
  </React.StrictMode>,
)
