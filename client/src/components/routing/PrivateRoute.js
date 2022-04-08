import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ component: Component}) => {
  const { auth: {isAuthenticated}} = useSelector((state)=>({
    auth: state.auth
  }))
   if(isAuthenticated) return <Component />
   return <Navigate to='/login'/>
}

export default PrivateRoute