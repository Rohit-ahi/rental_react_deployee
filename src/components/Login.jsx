
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../Login.css'
import { Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { Loginuser } from './Auth'
import Navbar from '../pages/Navbar'

  export default function Login() {

         const [email , setemail] = useState('')
         const [password , setpassword] = useState('')

         const navigate = useNavigate()
         const dispatch = useDispatch()
         const loginstatus = useSelector(state=> state.login.status) // jab component pahli bar render hoga to ye intial state access karega                                                             
         const loginerror = useSelector(state=> state.login.error)
         

        const handlesubmit = (e)=>{
              e.preventDefault();   
              const userdata = {email,password}
              dispatch(Loginuser(userdata))    
            }

        useEffect(() => {
            if (loginstatus === 'succeeded') {          
              navigate('/')  
            }
          }, [loginstatus, navigate])

  return (
       <>
              
      
      
       <body translate='no'className='bd1' >
       <Navbar/>
       <section className="container2">
        <div className="login-container">
            <div className="form-container">
                  <img src="https://raw.githubusercontent.com/hicodersofficial/glassmorphism-login-form/master/assets/illustration.png" alt="illustration" className="illustration" />  
                <h1 className='opacity' >LOGIN</h1>
                <form onSubmit={handlesubmit}>
                   <input type="email" placeholder=" EMAIL" value={email} onChange={(e)=>setemail(e.target.value)}  required/>
                    <input type="password" placeholder="PASSWORD" value={password} onChange={(e)=>setpassword(e.target.value)} required />
                    <button className="opacity" type='submit'> SUBMIT </button>  
                </form>
                {loginstatus === 'failed' && <p className='register-forget opacity' style={{fontWeight:'bold' , color:'red'}}>{loginerror}</p>}

                <div className="register-forget opacity">
                     <Link to="/CustReg">REGISTER</Link>
                     <Link className="nav-link"to="/"> BACK </Link> 
                </div>
            </div>
        </div>
    </section>              
  </body>                


                  
  </>

  )}
