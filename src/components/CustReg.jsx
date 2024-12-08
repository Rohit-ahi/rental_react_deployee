
import React, { useState } from 'react'
import '../custReg.css'
import {Link} from 'react-router-dom'
import Navbar from '../pages/Navbar'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function CustReg() {
    const apiurl = process.env.REACT_APP_API_URL
    const [custdata,setcustdata] = useState({})
    const[error,seterror] = useState([])

    const data = (e)=>{
        const {name,value} = e.target
        setcustdata({
            ...custdata,
            [name] : value
        })
    }
   
    const custreg = async(e)=>{           
        e.preventDefault()
        
        if(custdata.phone) {
            const ph = custdata.phone
            if(ph.length !== 10) {
               return toast.error(<strong>{'Mobile Number must be 10 digit'}</strong>,{
                   position:'top-center',
                   autoClose:'4000',
                   hideProgressBar:true,
                   closeOnClick:true,
                   pauseOnHover: true,
                   draggable: true,
                   progress:undefined
               })
            }
        }
        seterror([])
       try {
        
            const result = await fetch(`${apiurl}/rental/cust_reg` , {
                 method : 'POST' ,
                 headers : {
                      'Content-Type' : 'application/json'
                 },
                 body : JSON.stringify(custdata)       
            })
           const resdata = await result.json()
           if(resdata.status) {
                toast.success( <strong>{resdata.msg}</strong> , {
                    position: 'top-center',
                    autoClose: 5000, 
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    style: {
                        backgroundColor: '#d4edda',  
                        borderRadius: '8px',
                        border: '1px solid #c3e6cb',
                        letterSpacing:'1.5px' 
                      }
                  });
           }else {
            toast.error(<strong>{resdata.msg}</strong>, {
                position: 'top-center',
                autoClose: 5000, 
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                style: {
                    backgroundColor: '#d4edda',  
                    borderRadius: '8px',
                    border: '1px solid #c3e6cb',
                    letterSpacing:'1.5px' 
                  }
              });
           }
         } catch (error) {
            toast.error(<strong>{"Something went wrong. please try again later"}</strong>, {
                position: 'top-center',
                autoClose: 5000, 
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                style: {
                    backgroundColor: '#d4edda',  
                    borderRadius: '8px',
                    border: '1px solid #c3e6cb',
                    letterSpacing:'1.5px' 
                  }
              });   
                
        }
        e.target.reset()
    }
        
  return (
      <>

    <body className='bodyreg'>
       <Navbar/>

    <div className="form-wrapper wrapperreg" >
        <h2 className='h2reg'>Customer Register</h2>
        <form onSubmit={custreg}>
            <div className="form-control formcontrolreg">
                <input type="text" id="name" placeholder='Name'  name='name' onChange={data} required  />
            </div>
            <div className="form-control formcontrolreg">
                <input type="number" id="num" placeholder='Phone Number' name='phone' onChange={data} required />
            </div>
            <div className="form-control formcontrolreg">
                <input type="email" id="mail" placeholder='Email' name='email' onChange={data}  required />
            </div>
            
            <div className="buttoncontainerreg">
                <button type="submit" className='btreg'>REGISTER</button>
            </div>
            <br />
            {error.map((err,index)=>{
               return <li key={index} style={{ color: "red" }}>
                {err}
               </li>
            })}
            <div className="formhelpreg">
                <div className="remember-me">
                    <Link to="/SpReg"  className='sp'>SP REGISTER</Link>
                </div>
                
            </div>
            <div className='divreg0'>
                <p style={{color:'black'}} className='preg0'>Already registered? <Link to="/login"><b className='breg'>Log in Now</b></Link></p>
            </div>
        </form>
    </div>
</body>

<ToastContainer />
      </>
  )
}
