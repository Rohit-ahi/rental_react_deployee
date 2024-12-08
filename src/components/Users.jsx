

import React from 'react'
import { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../tablev.css'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faTrash  } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../pages/Navbar'
import { clearToken } from '../redux/createslice'
import { useNavigate } from 'react-router-dom'

export default function Users() {
 
  const apiurl = process.env.REACT_APP_API_URL
  const tok = useSelector(state=>state.login.token)
  const[user,setuser] = useState([])
  
  const dispatch = useDispatch()
  const navigate = useNavigate()

    useEffect(() => {
   
       try {

            fetch(`${apiurl}/auth/admin/userlist`, {
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
                         setuser(data)
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


        const handleclick = (uid)=> {

                try {
                        const result = window.confirm('Are you sure you want to delete this item?');
                        if(result)  {
                        fetch(`${apiurl}/auth/admin/userdel/${uid}`,{
                            method : 'DELETE',
                            headers : {
                                 'Content-Type': 'application/json',
                                 'Authorization': `Bearer ${tok}`
                            }
                        }).then(res=>res.json()).then(data=> {
                            if(data.status) {
                                    setuser(user.filter(ob=>ob.id!==uid))    
                            }else{
                                if (data.status === false && data.msg === 'Invalid or Expire Token') {
                                    if (!localStorage.getItem('token')) {
                                        return;
                                      }
                                     alert('Your session has expired. You will be logged out')
                                     dispatch(clearToken())
                                     navigate('/')
                                }else{
                                     toast.error(<strong>{data.msg}</strong>, {
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
                                      })
                                    }
                                 } 
                             })
                         }
                } catch (error) {
                    toast.error( <strong>{'Something went wrong , please try again'}</strong> , {
                        position: 'top-center',
                        autoClose: 5000, 
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                      });      
                }
               }

     return (
        <>
             <body >
                    <Navbar/>
                    <br />
                 <div className="table-responsive">
                <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }} className='table' >
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Delete</th>   
                    </tr>
                </thead>
                <tbody>
                    {user.map((user,index) => { 
                    return(
                        <tr key={user.id}>
                            <td>{index+1}</td>
                            <td>{user.name}</td>
                            <td>{user.phone}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>{user.status ? 'Active' : 'Inactive'}</td>
                            <td>
                                <b onClick={()=>handleclick(user.id)} style={{cursor:'pointer'}}> <FontAwesomeIcon icon={faTrash } style={{color: "#e40707",fontSize:'21px'}} /> </b>
                            </td>
                        </tr>
                    )
                 })}
                     
                </tbody>
            </table>
            </div> 

            </body> 
            <ToastContainer />  
     </>
  )
}
