import React, { Fragment, useEffect } from 'react'
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Alert from './components/layout/Alert'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import { loadUser } from './state/auth/auth.action'
import { useDispatch } from 'react-redux'

// using git via vs code
// source control
// + => commit => push
// add new note
const App = () => {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(loadUser())
    // only run once
  },[])

  return(
    <Router>
    <Fragment>
      <Navbar />
      <Routes>
        <Route path='/' element={<Landing />}></Route>
      </Routes>
      <section className='container'>
      <Alert/>
        <Routes>
          <Route path='/register' element={<Register />}/>
          <Route path='/login' element={<Login />}/>
        </Routes>
      </section>
    </Fragment>
    </Router>
  )
}

export default App;
