import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../state/auth/auth.action';


const Login = () => {
  const { isAuthenticated } = useSelector((state)=> ({
    isAuthenticated: state.auth.isAuthenticated
  }))
  const [formData, setFormData ] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e  => setFormData({
    ...formData, 
    [e.target.name]: e.target.value
  });
  const dispatch = useDispatch()
  const onSubmit = async e =>{
    e.preventDefault();
    // email, password from fromData
    // action 里面也要传入 email, password
    dispatch(login({email, password}))
  }
  // redirect if login in
  const navigate = useNavigate()
  if(isAuthenticated){
   navigate('/dashboard')
  }
  return (
      <section className="container">
        <h1 className="large text-primary">Sign In</h1>
        <p className="lead"><i className ="fas fa-user"></i> Sign Into Your Account</p>
        <form className="form" onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <input 
              type="email" 
              placeholder="Email Address" 
              onChange={e => onChange(e)}
              value={email}
              name="email" required/>
            <small className="form-text"
            >This site uses Gravatar so if you want a profile image, use a
              Gravatar email</small>
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={e => onChange(e)}
              minLength="6" />
          </div>
          <input type="submit" className="btn btn-primary" value="Login" />
        </form>
        <p className="my-1">
          Don't have an account?<Link to="/register">Sign Up</Link>
        </p>
      </section>
  )
}
export default Login