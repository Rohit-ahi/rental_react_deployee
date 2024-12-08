

import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faTrash  } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../pages/Navbar'

import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { clearToken } from '../redux/createslice'


export default function Vehiclelist() {
      
      const apiurl = process.env.REACT_APP_API_URL
       const tok = useSelector(state=>state.login.token)
       const[vehicle,setvehicle] = useState([])
       const dispatch = useDispatch()
       const navigate = useNavigate()

       useEffect(() => {

            try {
                    fetch(`${apiurl}/auth/sp/vehiclelist`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${tok}`
                    },
                    }).then(res=>res.json()).then(data=>{
                        if (data.status === false && data.msg === 'Invalid or Expire Token') {
                            if (!localStorage.getItem('token')) {
                                return;
                              }
                             alert('Your session has expired. You will be logged out')
                             dispatch(clearToken())
                             navigate('/')
                        }else{
                          if(data.length >0){
                            setvehicle(data)
                          }
                          
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

       }, [tok,navigate,dispatch,apiurl]); 

        const handleclick = (vid)=> {
                try {
                    const result = window.confirm('Are you sure you want to delete this item?');
                    if(result){
                      fetch(`${apiurl}/auth/sp/vehicledel/${vid}` ,{
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
                               }else{
                                toast.error(data.msg, {
                                    position: 'top-center',
                                    autoClose: 8000, 
                                    hideProgressBar: true,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                  });
                               } 
                            }
                        })
                    }
                } catch (error) {
                    toast.error( <strong>{'Something went wrong. please try again later'}</strong>, {
                        position: 'top-center',
                        autoClose: 8000, 
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                      });
                    }    
                }
           const vehicle_add ={
            backgroundColor: '#142014',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '4px',
            fontSize: '15px',
            cursor: 'pointer',
            fontWeight: 'bold',
            letterSpacing: '1.5px',
           }
  return (
    <>
            <Navbar/>
            
            {vehicle.length === 0 ? (
            <div className="no-bookings" style={{ textAlign: 'center', padding: '50px', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0px 4px 8px rgba(0,0,0,0.1)' }}>
            <img 
              src="\images\booking_img.webp" 
              alt="No Bookings Yet" 
              style={{ width: '150px', marginBottom: '20px' }} 
            />
            <h3 style={{ color: '#333', fontWeight: 'bold' }}>No Vehicle Add</h3>
            <p style={{ color: '#666', fontSize: '16px', margin: '10px 0 20px' }}>
              It looks like you haven’t made any vehicle add yet. Explore our services to make your first vehicle add now!
            </p>
            <button 
              onClick={() => navigate('/Vehicles')} 
              className="btn btn-primary" 
              style={{ padding: '10px 20px', fontSize: '16px', borderRadius: '5px' }}
            >
              Add vehicle
            </button>
          </div>
          
        ):
        <> ( 
            <br />
            <div style={{marginLeft:'30px',marginTop:'10px'}}>
                <Link to="/Vehicles" style={vehicle_add}> Add </Link>
            </div> 

            <div className='table-responsive'>
            <table border="1" cellPadding="10" cellSpacing="0" className='table mt-3' >
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Registration Number</th>
                        <th>PUC Status</th>
                        <th>Insurance</th>
                        <th>Fuel Type</th>
                        <th>Price per Km</th>
                        <th>AC Charges</th>
                        <th>Vehicle Model</th>
                        <th>Vehicle Type</th>
                        <th>Vehicle Image</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {vehicle.map((vehicle, index) => {
                    //   const veh = vmaster.find(v => v.id === vehicle.veh_master.id);
                    //   const vmid = veh ? veh.id : null;
                    return(
                        <tr key={index}>
                            <td>{vehicle.id}</td>
                            <td>{vehicle.reg_number}</td>
                            <td>{vehicle.ispuc ? "Yes" : "No"}</td>
                            <td>{vehicle.isinsurance ? "Yes" : "No"}</td>
                            <td>{vehicle.fuel_type}</td>
                            <td>{vehicle.price_km}</td>
                            <td>{vehicle.ac_charges}</td>
                            <td>{vehicle.veh_master.model}</td>
                            <td>{vehicle.veh_master.type}</td>
                            <td>
                                <img src={vehicle.veh_master.image} alt={vehicle.veh_master.model} width="100" className='img2' />
                            </td>
                            <td>
                                <b onClick={()=>handleclick(vehicle.id)} style={{cursor:'pointer'}}> <FontAwesomeIcon icon={faTrash } style={{color: "#e40707",fontSize:'21px'}} />  </b>
                            </td>
                        </tr>
                       )
                    
                    })}
                </tbody>  
            </table>
            </div>
        )</>

        }
            <ToastContainer />          
       </>
    )}
