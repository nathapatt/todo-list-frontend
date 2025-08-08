import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from '@/components/Navbar'
import Home from '@/Home'
import CreatorPage from '@/pages/Creator'
import LoginPage from '@/components/Auth/LoginPage'
import RegisterPage from '@/components/Auth/RegisterPage'
import InstructorPage from '@/pages/Instructor'

export default function AppRoutes() {
  const location = useLocation()
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register'

  return (
    <>
      {!isAuthPage && <Navbar />}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/creator" element={<CreatorPage />} />
        <Route path="/instructor" element={<InstructorPage />} />
      </Routes>
    </>
  )
}
