import React, { useContext } from 'react'
import { useNavigate } from 'react-router'
import { Auth } from '../context/AuthContext'
import { toast } from "react-toastify";

const MainLayout = () => {
  const navigate = useNavigate()
  const { setLoggedInUser } = useContext(Auth)

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser")
    setLoggedInUser(null)
    toast.warn("loggedout sucess ")
    navigate("/")
  }

  return (
    <div>
      <button
      onClick={handleLogout}
      className='btn btn primary'>logout</button>
    </div>
  )
}

export default MainLayout
