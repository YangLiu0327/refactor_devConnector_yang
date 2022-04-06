import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='navbar bg-dark'>
      <Link to='/'>
        <i className='fas fa-code'>
          DevConnector</i>
      </Link>
      <Link to='/profile'>Developers</Link>
      <Link to='/register'>Register</Link>
      <Link to='/login'>Login</Link>
    </nav>
  )
}
export default Navbar