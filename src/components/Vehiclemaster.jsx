

import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../Vmadd.css'
import { useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../pages/Navbar'
import { toast,ToastContainer } from 'react-toastify'
import { clearToken } from '../redux/createslice'

export default function Vehiclemaster() {

    const apiurl = process.env.REACT_APP_API_URL
    const tok = useSelector(state=>state.login.token)
    const model = useRef()
    const value = useRef()
    const image = useRef()
    const capacity_seats = useRef()
    const capacity_tons = useRef()

    const dispatch = useDispatch()
    const navigate = useNavigate()

const handleform = async (e)=>{
  e.preventDefault()
  const vmformdata = new FormData();
  vmformdata.append('model', model.current.value);
  vmformdata.append('type', value.current.value);
  vmformdata.append('capacity_seats', capacity_seats.current.value);
  vmformdata.append('capacity_tons', capacity_tons.current.value);
  vmformdata.append('image', image.current.files[0]);

      try {
             const result = await fetch(`${apiurl}/auth/admin/save_vm`, {
                    method : 'POST',
                    headers: {
                          'Authorization':  `Bearer ${tok}`
                    },
                    body :vmformdata
               })
             const resdata = await result.json()
             if(resdata.status) {
                toast.success(<strong>{resdata.msg}</strong>, {
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
                        fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
                        lineHeight: '1.5',
                        padding: '8px',  
                        color: '#155724',  
                        fontSize: '16px',
                        letterSpacing:'1.5px'  
                    }
                });
              }else{
                   if (resdata.status === false && resdata.msg === 'Invalid or Expire Token') {
                       if (!localStorage.getItem('token')) {
                         return;
                       }
                        alert('Your session has expired. You will be logged out')
                        dispatch(clearToken())
                        navigate('/')
                  }else{
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
                            fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
                            lineHeight: '1.5',
                            padding: '8px',  
                            color: '#155724',  
                            fontSize: '16px',
                            letterSpacing:'1.5px'  
                        }
                   });
                  }   
               }
      } catch (error) {
        toast.error(<strong>{"Something Went Wrong. Please try Again"}</strong>, {
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
                fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',   
            }
       });
    }
      e.target.reset()
}

  return (
    <>
        <Navbar/>
        <br />
        <body className='bodyaddmv'>
        <section>
         <div className="wrapper"id='d1' >
         <div className="form">
             <h1 className="title">Add Vehiclemaster</h1>
             <form action="#" className="myform" onSubmit={handleform}>
                 <div className="control-from">
                     <input type="text" id="firstname" placeholder='Model' ref={model}  required/>
                 </div>

                 <div className='control-from'>
                     <select ref={value}>
                            <option value="" disabled selected hidden>Type</option>
                            <option value="Rental">Rental</option>
                            <option value="Transeport">Transport</option>
                     </select>
                 </div>

                  <div className="control-from">
                     <input type="number" id="lastname" placeholder='capacity_seats'ref={capacity_seats} required/>
                  </div>

                  <div className="control-from">
                     <input type="number" id="lastname" placeholder='capacity_tons'ref={capacity_tons} required  />
                  </div>

                  <input type="file" id="emailaddress" placeholder='image' ref={image} required style={{color:'black'}} />
                  <br /><br />
                  <div className="button">
                     <button id="register">Okay</button>
                  </div>
                  <br />
                  <div className='row'>
                        <div className='col-lg-6 col-md-6'>
                            <Link to="/Vmasterlist" style={{color:'black',fontSize:'20px',fontWeight: 'bold',letterSpacing:'0.8px'}}>View VMaster</Link>
                        </div>
                        <div className='col-lg-6 col-md-6'>     
                        </div>
                  </div>
             </form>
              </div>
        </div>
     </section>
     </body>
      <ToastContainer/>
    </>
    
  )}
