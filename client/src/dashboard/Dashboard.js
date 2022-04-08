import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProfile } from '../state/profile/profile.action'

const Dashboard = () => {
  const { auth, profile } = useSelector((state)=> ({
    auth: state.auth,
    profile: state.profile
  }))
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getProfile())
  },[])
  return(
    <>
      Dashboard
    </>
  )
}

export default Dashboard