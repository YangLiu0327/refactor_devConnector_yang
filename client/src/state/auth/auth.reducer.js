// if have type file, import here
const initialState = {
  // token should be store in localStorage
  token: localStorage.getItem('token'),
  // something only login user can see
  isAuthenticated: false,
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
      // login, register success  一样
    case 'REGISTER_SUCCESS':
    case 'LOGIN_SUCCESS':
    case 'AUTH_ERROR':
      // console.log(action, "======")
      localStorage.removeItem('token')
      return {
        ...state,
        ...action.data,
        isAuthenticated: true,
        loading: false
      }
    case 'REGISTER_FAIL':
    case 'LOGIN_FAIL':
    case 'LOGOUT':
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