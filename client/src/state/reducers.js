import { combineReducers } from 'redux'
import alertReducer from './alert/alert.reducer'


export default combineReducers({
  alert: alertReducer
})