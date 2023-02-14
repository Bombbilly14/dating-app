import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

function PrivateRoute({ user }) {
    
    
  return (
    user !== null  ? <Outlet /> : <Navigate to='/signin' />
  )
}

export default PrivateRoute