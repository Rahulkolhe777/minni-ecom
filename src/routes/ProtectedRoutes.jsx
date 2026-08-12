import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router'
import { Auth } from '../context/AuthContext'

const ProtectedRoutes = () => {
  const{ loggedInUser } = useContext(Auth)

  console.log("protected user:",loggedInUser)
  if (!loggedInUser){
    return <Navigate to={"/"}/>;
  }
  return <Outlet />
}

export default ProtectedRoutes
