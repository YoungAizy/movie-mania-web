import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { isLoggedIn } from '../myhooks/useAuth.ts'

const PublicRoutes = () => {
  const isAuthenticated = isLoggedIn();
  console.log('heyu', isAuthenticated)

  return (
    <>
    {isAuthenticated  ? <Navigate to='/home'/>:<Outlet />}
    </>
  )
}

export default PublicRoutes;