import { combineReducers } from 'redux'
import authReducer from './ auth/auth.reducer'
import alertReducer from './alert/alert.reducer'


export default combineReducers({
  alert: alertReducer,
  auth: authReducer
})