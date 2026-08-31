import React, { useContext } from 'react'
import { Outlet } from 'react-router'
import Navbar from '../components/Navbar'
import CartScreen from '../pages/CartScreen'
import { Auth } from '../context/Auth'

const MainLayout = () => {
  const { isCartOpen, setIsCartOpen } = useContext(Auth)

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      <Outlet />
      {isCartOpen && (
        <CartScreen onClose={() => setIsCartOpen(false)} />
      )}
    </div>
  )
}

export default MainLayout
