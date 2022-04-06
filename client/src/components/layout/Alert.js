import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeAlert } from '../../state/alert/alert.action'

const Alert = () => {
  const { alert } = useSelector((state) => ({
   alert: state.alert
  }))
 return(
   <div className='alert-wrap'>
     {alert.map((item)=> (
       <div key={item.id} className={`alert alert-${item.alertType}`}>
         {/* {item.msg} */}
         <RemoveAlert message={item.msg} />
       </div>
     ))}
   </div>
 )
}

const RemoveAlert = ({ message }) => {
  const dispatch = useDispatch()
  useEffect(()=>{
    setTimeout(()=>{
      dispatch(removeAlert())
    }, 2000)
  }, [])
  return <>{message}</>
}
 
export default Alert