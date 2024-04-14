import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoutes = () => {
    const isAuthenticated = true;

  return (
    <>
    {isAuthenticated  ? <Outlet />: <Navigate to='/?signin=true'/>}
    </>
  )
}

export default ProtectedRoutes;