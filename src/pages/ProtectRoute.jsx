


import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export default function ProtectRoute({element}) {

    const token =  useSelector(state=>state.login.token)
    const role =   useSelector(state=>state.login.role)
  
    if(!(token && role)){
        return <Navigate to="/Login"replace />;
    }

  return element
}

