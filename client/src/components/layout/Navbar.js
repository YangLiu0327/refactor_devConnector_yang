import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../../state/auth/auth.action'

const Navbar = () => {
  const { auth: {isAuthenticated, loading} } = useSelector((state)=>({
    auth: state.auth,
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.loading
  }))
  const dispatch = useDispatch()
  const handleClick = () => {
    dispatch(logout())
  }
  const authLinks = (
    <ul>
      <li>
        <Link to='/profiles'>
          Developers
        </Link>
      </li>
      <li>
        <Link to='/posts'>
          Posts
        </Link>
      </li>
      <li>
        <i className='fas fa-user'></i>{' '}
        <Link to='/dashboard'>
          <span className='hide-sm'>Dashboard</span>
        </Link>
      </li>
      <li>
        <a onClick={handleClick} href='#!'>
          <i className='fas fa-sign-out-alt'></i>{' '}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to='/profiles'>
          Developers
        </Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  )

  return (
    <nav className='navbar bg-dark'>
      <Link to='/'>
        <i className='fas fa-code'>
          DevConnector</i>
      </Link>
        {!loading && (<>{isAuthenticated ? authLinks: guestLinks }</>)}
    </nav>
  )
}
export default Navbar