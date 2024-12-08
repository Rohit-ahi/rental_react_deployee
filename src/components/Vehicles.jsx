
import React from 'react'
import '../vehicle.css'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { useState,useEffect } from 'react';
import Navbar from '../pages/Navbar';
import { clearToken } from '../redux/createslice';
import { toast , ToastContainer } from 'react-toastify'; 

export default function Vehicles() {
    
    const apiurl = process.env.REACT_APP_API_URL
    const tok = useSelector(state=>state.login.token)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const [vehicleMasters, setVehicleMasters] = useState([]);
    const [selectedMaster, setSelectedMaster] = useState(null);
    const [formData, setFormData] = useState({
      reg_number: '',
      fuel_type: '',
      price_km: '',
      ac_charges: '',
      ispuc: true,
      isinsurance: true,
      status : true
    });

    useEffect(() => {
        fetch(`${apiurl}/auth/sp/list_vm`,{
            method:"GET",
            headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${tok}`   
            }
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.status === false && data.msg === 'Invalid or Expire Token') {
              if (!localStorage.getItem('token')) {
                  return;
                }
               alert('Your session has expired. You will be logged out')
               dispatch(clearToken())
               navigate('/')
            }else {
              setVehicleMasters(data);
            } 
          })
          .catch(() =>{
            toast.error(<strong>{'Something went wrong. Please try again later.'}</strong>, {
              position: 'top-center',
              autoClose: 8000, 
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
            }) 
          })
  }, [tok,dispatch,navigate,apiurl]);


    const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataToSend = {
          ...formData,
          master: selectedMaster, 
        };
 

        try {
                const result =  await fetch(`${apiurl}/auth/sp/vehiclesave`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${tok}`
                },
                body: JSON.stringify(dataToSend),
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
               }else {
                if (resdata.status === false && resdata.msg === 'Invalid or Expire Token') {
                  if (!localStorage.getItem('token')) {
                    return;
                  }
                   alert('Your session has expired. You will be logged out')
                   dispatch(clearToken())
                   navigate('/')
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
          toast.error(<strong>{'Something went Wrong. please try again later'}</strong>, {
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
            e.target.reset()
        };

    return (
     <>
     <Navbar/>

      <body className='bodyaddmv'>
        <section>
         <div className="wrapper"id='d1' >
         <div className="form">
             <h1 className="title">Add Vehicles</h1>
             <form action="#" className="myform" onSubmit={handleSubmit}>
                 <div className="control-from">
                     <input type="text" id="firstname" placeholder='Reg Number' name='reg_number' onChange={handleInputChange}   required/>
                 </div>

                 <div className='control-from' >
                     <select onChange={handleInputChange} name='fuel_type'>
                            <option value="" disabled selected hidden>Select fuel_type</option>
                            <option value="petrole">petrole</option>
                            <option value="diesel">diesel</option>
                     </select>
                 </div>

                  <div className="control-from">
                     <input type="number" id="lastname" placeholder='Price_km' name='price_km' onChange={handleInputChange} required/>
                  </div>

                  <div className="control-from">
                     <input type="number" id="lastname" placeholder='Ac_charges' name='ac_charges' onChange={handleInputChange} required  />
                  </div>

                  <div className='control-from' >
                     <select id="dropdown" value={selectedMaster} onChange={(e)=>setSelectedMaster(e.target.value)} >
                         <option value="" disabled selected hidden>Select VehicleMaster</option> 
                         {  
                           vehicleMasters.map((master) => (
                            <option key={master.id} value={master.id}>
                                  {master.model} 
                           </option>
                           )) 
                          }    
                     </select> 
                 </div>

                  <div className="button">
                     <button id="register">Okay</button>
                  </div>
                 <br />
                  <div className='row'>
                        <div className='col-lg-6 col-md-6'>
                            <Link to="/vehicle_list" style={{color:'black',fontSize:'20px',fontWeight: 'bold',letterSpacing:'0.8px'}}>View Vehicles</Link>
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
  )
}
