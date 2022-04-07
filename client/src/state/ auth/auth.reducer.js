// if have type file, import here
const initialState = {
  // token should be store in localStorage
  token: localStorage.getItem('token'),
  // something only login user can see
  isAuthenticated: null,
  // when get the data, setting should be false
  loading: true,
  user: null
}

const authReducer = (state = initialState, action) =>{
  switch(action.type){
    case 'USER_LOADED':
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.data
      }
    case 'REGISTER_SUCCESS':
    case 'AUTH_ERROR':
      localStorage.setItem('token', action.data.token)
      return {
        ...state,
        ...action.data,
        isAuthenticated: true,
        loading: false
      }
    case 'REGISTER_FAIL':
      localStorage.removeItem('token')
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false
      }
      default:
        return state;
  }
}

export default authReducer