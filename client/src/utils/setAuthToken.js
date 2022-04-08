import axios from 'axios'

// store jwt in local storage
const setAuthToken = token => {
  if(token){
    axios.defaults.headers.common['x-auth-token'] = token
  }else{
    delete axios.defaults.headers.common['x-auth=token']
  }
}

export default setAuthToken