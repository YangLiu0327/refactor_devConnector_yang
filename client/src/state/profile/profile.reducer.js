const initialState = {
  profile: null,
  // profile listing page
  profiles: [],
  repos: [],
  loading: true,
  error: {}
}

const profileReduer = (state= initialState, action) => {
  switch(action.type){
    case 'PROFILE_REQUESTED':
      return {
        ...state,
        loading: true
      }
    case 'PROFILE_SUCCESS':
      return {
        ...state,
        profile: action.data,
        loading: false
      }
    case 'PROFILE_ERROR':
      return{
        ...state,
        error: action.data,
        loading: false
      }
    default:
      return state
  }
}
export default profileReduer