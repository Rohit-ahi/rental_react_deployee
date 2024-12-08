


import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../tablev.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faTrash  } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../pages/Navbar'
import { useNavigate } from 'react-router-dom'
import { clearToken } from '../redux/createslice'
import { toast,ToastContainer } from 'react-toastify'

export default function Vehiclelistadmin() {
      
       const apiurl = process.env.REACT_APP_API_URL
       const tok = useSelector(state=>state.login.token)
       const[vehicle,setvehicle] = useState([])
       
       const dispatch = useDispatch()
       const navigate = useNavigate()

       useEffect(() => {
        
            try {
                    fetch(`${apiurl}/auth/admin/vehiclelist`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${tok}`
                    },
                }).then(res=>res.json()).then(data=> {
                    if (data.status === false && data.msg === 'Invalid or Expire Token') {
                        if (!localStorage.getItem('token')) {
                            return;
                          }
                            alert('Your session has expired. You will be logged out')
                            dispatch(clearToken())
                            navigate('/')
                      }else{
                        setvehicle(data) 
                    }
                   
                })
    
            } catch (error) {
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
                  }); 
            }
        
    }, [tok,dispatch,navigate,apiurl]); 
    
      const handleclick = (vid)=> {
             try {     
                    const result = window.confirm('Are you sure you want to delete this item?');
                    if(result){
                      fetch(`${apiurl}/auth/admin/vehicledel/${vid}` ,{
                          method:'DELETE',
                          headers : {
                                  "Content-Type" : "application/json",
                                  'Authorization':  `Bearer ${tok}` 
                          }
                      }).then(res=>res.json()).then(data=> {
                            if(data.status) {
                                setvehicle(vehicle.filter(ob=>ob.id !== vid))
                            }else {
                               if (data.status === false && data.msg === 'Invalid or Expire Token') {
                                    if (!localStorage.getItem('token')) {
                                        return;
                                      }
                                        alert('Your session has expired. You will be logged out')
                                        dispatch(clearToken())
                                        navigate('/')
                               }else {
                                    const msg = <strong>{data.msg}</strong>
                                    toast.error(msg, {
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
                         })
                   }
               } catch (error) {
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
                  }); 
               }   
            }
  return (
    <>     
            <Navbar/>
            <br />
            <div className='table-responsive'>
            <table border="1" cellPadding="10" cellSpacing="0" className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Registration Number</th>
                        <th>PUC Status</th>
                        <th>Insurance</th>
                        <th>Fuel Type</th>
                        <th>Price per Km</th>
                        <th>AC Charges</th>
                        <th>User Name</th>
                        <th>Vehicle Model</th>
                        <th>Vehicle Type</th>
                        <th>Vehicle Image</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {vehicle.map((vehicle, index) => (
                        <tr key={index}>
                            <td>{vehicle.id}</td>
                            <td>{vehicle.reg_number}</td>
                            <td>{vehicle.ispuc ? "Yes" : "No"}</td>
                            <td>{vehicle.isinsurance ? "Yes" : "No"}</td>
                            <td>{vehicle.fuel_type}</td>
                            <td>{vehicle.price_km}</td>
                            <td>{vehicle.ac_charges}</td>
                            <td>{vehicle.user ? vehicle.user.name : "N/A"}</td>
                            <td>{vehicle.veh_master.model}</td>
                            <td>{vehicle.veh_master.type}</td>
                            <td>
                                <img src={vehicle.veh_master.image} alt={vehicle.veh_master.model} width="100" className='img2' />
                            </td>
                            <td>
                                <b onClick={()=>handleclick(vehicle.id)} style={{cursor:'pointer'}}> <FontAwesomeIcon icon={faTrash } style={{color: "#e40707",fontSize:'19px'}} />  </b>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
          <ToastContainer/>  
    </>
  )
}
