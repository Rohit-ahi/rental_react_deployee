

import React from 'react'
import '../tablev.css'
import {useEffect , useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faTrash  } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../pages/Navbar'

import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


import Vmasterupdate from './Vmasterupdate'
import { clearToken } from '../redux/createslice'

export default function Vmasterlist() {

    const apiurl = process.env.REACT_APP_API_URL
    const tok = useSelector(state=>state.login.token)
    const[vmaster,setvmaster] = useState([])

    const [selectevm, setSelectevm] = useState(null); 
    const [showPopup, setShowPopup] = useState(false);

    const dispatch = useDispatch()
    const navigate = useNavigate()

   useEffect(() => {
     
         try {
                 fetch(`${apiurl}/auth/admin/list_vm`, {
                 method: 'GET',
                 headers: {
                     'Content-Type': 'application/json',
                     'Authorization': `Bearer ${tok}`
                 },
             }).then(res=>res.json()).then(data=>  {
                if (data.status === false && data.msg === 'Invalid or Expire Token') {
                    if (!localStorage.getItem('token')) {
                        return;
                      }
                        alert('Your session has expired. You will be logged out')
                         dispatch(clearToken())
                         navigate('/')
                  }else {
                    setvmaster(data)
                  } 
             } )
 
         } catch (err) {
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

   }, [tok,dispatch ,navigate,apiurl]);


    const handledelete = (vmid)=> {
     
        try {
            const result = window.confirm('Are you sure you want to delete this item?');
            if(result) {
            
                fetch(`${apiurl}/auth/admin/del_vm/${vmid}`,{
                    method:'DELETE',
                    headers: {
                        "Content-Type" : "application/json",
                        'Authorization' : `Bearer ${tok}`
                    }
               }).then(res=>res.json()).then(data=> {
                    if(data.status) {
                        setvmaster(vmaster.filter(ob=>ob.id!==vmid))
                     }else{
                        if (data.status === false && data.msg === 'Invalid or Expire Token') {
                            if (!localStorage.getItem('token')) {
                                return;
                              }
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
        }catch(err) {
            const msg = <strong>{'Something went wrong. Please try again later'}</strong>
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
                    letterSpacing:'1.5px'
                    
                  }
              }); 
        }       
            
      }
    const handleEditclick = (vm)=>{
        setSelectevm(vm)
        setShowPopup(true)
    }

        const  handleUpdate = (id,updateData)=> {
           fetch(`${apiurl}/auth/admin/update_vm/${id}`, {
              method :'PUT',
              headers : {
                   'Authorization' : `Bearer ${tok}`
              },
              body : updateData
          })
          .then(res=>res.json()).then(data=> {
                 if(data.status) {
                    let updatedVehicle = data.data
                    let img = updateData.image
                        if(img) {
                              var updatedata = {...updatedVehicle}
                         }else {

                            let {model,capacity_seats ,capacity_tons , type} = updatedVehicle
                              updatedata = { model, capacity_seats, capacity_tons, type };
                         }

                       setvmaster(vmaster.map(vm=>vm.id===id ? {...vm , ...updatedata  } : vm))
                       setShowPopup(false)
                     const msg = <strong>{data.msg}</strong>
                     toast.success(msg, {
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
                 }else {
                    toast.error(<strong>{data.msg}</strong> , {
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
            }).catch(()=>{
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
            })
   
        }
      
  return (
     <>
                  <Navbar/>
                  <br />
                  <div style={{marginLeft:'10px',marginTop:'12px' , marginBottom:'9px'}}>
                      <Link to="/Vehiclemaster" className='add123'> add </Link>
                  </div>
                 
                <div className="table-responsive">
                <table border="1" cellPadding="10" cellSpacing="0"  className="table ">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Vehicle Image</th>
                        <th>Vehicle Model</th>
                        <th>Vehicle Type</th>
                        <th>seats</th>
                        <th>tons</th>
                         <th>Op</th> 
                    </tr>
                </thead>
                <tbody>
                    {vmaster.map((vm, index) =>{
                   return  (

                        <tr key={index}>
                            <td>{vm.id}</td>
                           
                            <td>
                                <img src={vm.image} alt={vm.model} width="130" className='img2' />
                            </td>
                            <td>{vm.model}</td>
                            <td>{vm.type}</td>
                            <td>{vm.capacity_seats}</td>
                            <td>{vm.capacity_tons}</td>
                             <td>
                                      <div style={{display:'flex', gap:'5px'}}>
                                            
                                            <b onClick={()=>handledelete(vm.id)} style={{cursor:'pointer'}}> <FontAwesomeIcon icon={faTrash } style={{color: "#e40707",fontSize:'16px'}} />  </b>
                                            <b onClick={()=>handleEditclick(vm)} style={{ cursor: 'pointer' }}>   <img src="./edit_icon.png" alt="" width={20} height={18}/>  </b>
                                      </div>
                            </td> 

                        </tr>
                    )
                    
                    })}
                </tbody>

            </table> 
            </div>

            {showPopup && selectevm && (
                <Vmasterupdate
                    vm={selectevm}
                    onClose={() => setShowPopup(false)}
                    onUpdate={handleUpdate}
                />
            )}  
     <ToastContainer />  
     </>
  )
}


