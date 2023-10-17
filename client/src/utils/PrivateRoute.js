import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

function PrivateRoute({ user }) {
    
    
  return (
    // if user is truthy then Outlet is rendered, otherwise if not truthy it sends user to sign in page
    user !== null  ? <Outlet /> : <Navigate to='/signin' />
  )
}

export default PrivateRoute