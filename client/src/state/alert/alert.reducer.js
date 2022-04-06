const initialState = []

// action need to contain two things: type and data
// sometimes no data, only have type
const alertReducer = (state=initialState, action) => {
  switch(action.type){
    case 'SET_ALERT':
      return [...state, action.data]
    case 'REMOVE_ALERT': 
      // console.log(action, 'remove alert')
      return state.filter(alert => alert.id !== action.data)
    default:
      return state
  }
}

export default alertReducer