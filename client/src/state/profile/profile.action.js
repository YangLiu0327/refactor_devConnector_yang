import axios from 'axios'
import { fetchProfiles } from '../../api/profile.api'
import { setAlert } from '../alert/alert.action'

// get current users profile
export const getProfile = () => async dispatch => {
  try {
    const res = await axios.get('http://localhost:5000/api/profile/me');
    dispatch({
      type: 'GET_PROFILE',
      data: res.data
    })
  } catch (err) {
    dispatch({
      type: 'PROFILE_ERROR',
      data: { msg: err.response.statusText, status: err.response.status }
    })
  } 
}

// get current users profile
// export const getProfile = () => dispatch => {
//   dispatch(getProfileRequested())
//   fetchProfiles()
//   .then(res => dispatch(getProfileSuccess(res)))
//   .catch(err=> dispatch(getProfileFailed(err)))
// }

// const getProfileRequested = () => ({
//   type:'PROFILE_REQUESTED'
// })

// const getProfileSuccess = (res) => ({
//   type: 'PROFILE_SUCCESS',
//   data: res.data
// })

// const getProfileFailed = (err) => ({
//   type:'PROFILE_ERROR',
//   data: {msg: err.response.statusText, status: err.response.status}
// })