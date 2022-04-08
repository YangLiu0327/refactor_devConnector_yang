import { combineReducers } from 'redux'
import authReducer from './auth/auth.reducer'
import alertReducer from './alert/alert.reducer'
import profileReduer from './profile/profile.reducer'

export default combineReducers({
  alert: alertReducer,
  auth: authReducer,
  profile: profileReduer 
})