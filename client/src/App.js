import React, { Fragment, useEffect } from 'react'
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'

const App = () => {
  return(
    <Router>
    <Fragment>
      <Navbar />
      <Routes>
        <Route path='/' element={<Landing />}></Route>
      </Routes>
      <section className='container'>
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
