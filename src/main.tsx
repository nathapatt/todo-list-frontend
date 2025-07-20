import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ConfigProvider } from 'antd' // 👉 import ConfigProvider
import './index.css'
import 'antd/dist/reset.css'

import Navbar from "@/components/Navbar"
import Home from '@/Home'
import CreatorPage from '@/pages/Creator' // 👈 import creator page

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/creator" element={<CreatorPage />} />
        </Routes>
      </Router>
    </ConfigProvider>
  </StrictMode>,
)
