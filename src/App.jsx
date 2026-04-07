import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Overview from './pages/overview/Overview'
import Purchase from './pages/purchase/Purchase'
import Cart from './pages/purchase/Cart'
import Orders from './pages/orders/Orders'
import Pharmacies from './pages/pharmacies/Pharmacies'
import Reports from './pages/reports/Reports'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/auth/login" replace />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/purchase" element={<Purchase />} />
        <Route path="/purchase/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/pharmacies" element={<Pharmacies />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </BrowserRouter>
  )
}
