import { v4 as uuidv4 } from 'uuid';

const id = uuidv4()
export const setAlert = (msg, alertType) => ({
  type: 'SET_ALERT',
  data: {id, msg, alertType}
})

export const removeAlert = () => ({
  type:'REMOVE_ALERT',
  data: id
})

