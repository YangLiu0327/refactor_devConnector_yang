import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setAlert } from '../alert/alert.action'
import setAuthToken from '../utils/setAuthToken'
// if have type file, import here


// load user

export const loadUser = () => async dispatch => {
  if(localStorage.token){
    setAuthToken(localStorage.token)
  }
  try{
    const res = await axios.get('/api/auth')
    dispatch({
      type: 'USER_LOADED',
      data: res.data
    })
  }catch(err){
    dispatch({
      type: 'AUTH_ERROR'
    })
  }
}
// register user
export const register = ({name, email, password}) => async dispatch => {
  const config = {
    headers: {
      'Content-Type':'application/json'
    }
  }
  const body = JSON.stringify({name, email, password})
  try{
    const res = await axios.post('/api/users', body, config)
    dispatch({
      type: 'REGISTER_SUCCESS',
      data: res.data
    })
  }catch(err){
    const errors = err.response.data.errors
    if(errors){
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }
    dispatch({
      tyepe:'REGISETER_FAIL'
    })
  }
}

// login user
export const login = ({ email, password}) => async dispatch => {
  const config = {
    headers:{
      'Content-Type': 'application/json'
    }
  }
  const body = JSON.stringify({ email, password})
  try{
    const res = await axios.post('/api/auth', body, config)
    dispatch({
      type:'LOGIN_SUCCESS',
      data: res.data
    })
  }catch(err){
    const errors = err.response.data.errors
    if(errors){
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }
    dispatch({
      tyepe:'LOGIN_FAIL'
    })
  }
}

// logout user / clear profile
export const logout = () => ({
 type: 'LOGOUT'
})