import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css';  // 或 './styles.css'，取决于你的项目结构

createRoot(document.getElementById('root')).render(
    <App />
)
