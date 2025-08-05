import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from "react-router-dom"
import { ConfigProvider } from 'antd'
import './index.css'
import 'antd/dist/reset.css'

import AppRoutes from './AppRoutes'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider>
      <Router>
        <AppRoutes />
      </Router>
    </ConfigProvider>
  </StrictMode>
)
