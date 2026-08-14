import React, { useContext } from 'react'
import { Outlet, useNavigate } from 'react-router'
import { Auth } from '../context/AuthContext'
import { toast } from "react-toastify";
import Navbar from '../components/Navbar';

const MainLayout = () => {


  return (
    <div>
      <Navbar/>
      <Outlet/>
    </div>
  )
}

export default MainLayout
