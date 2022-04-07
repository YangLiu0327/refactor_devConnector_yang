import axios from 'axios'
import { setAlert } from '../alert/alert.action'
// if have type file, import here

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