import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext.tsx';

const ProtectedRoutes = () => {
  const {loggedIn, temp} = useContext(AuthContext);
  const isAuthenticated = loggedIn || temp?.email;
  console.log('ppp', isAuthenticated, 're', loggedIn);

  return (
    <>
    {isAuthenticated  ? <Outlet />: <Navigate to='/?signin=true'/>}
    </>
  )
}

export default ProtectedRoutes;