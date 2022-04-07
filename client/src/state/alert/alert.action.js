import { v4 as uuidv4 } from 'uuid';
// command + { 向左缩进
// command +  } 向右缩进
const id = uuidv4()
export const setAlert = (msg, alertType) => ({
  type: 'SET_ALERT',
  data: { id, msg, alertType }
})

export const removeAlert = () => ({
  type: 'REMOVE_ALERT',
  data: id
})

