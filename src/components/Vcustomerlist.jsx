


import React from 'react'
import { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../pages/Navbar'
import '../Carlist.css'
import { clearToken } from '../redux/createslice'
import { toast,ToastContainer } from 'react-toastify'

export default function Vcustomerlist() {

     const apiurl = process.env.REACT_APP_API_URL
     const tok = useSelector(state=>state.login.token)
     const[cars,setCars] = useState([])
     const dispatch = useDispatch()
     const navigate = useNavigate()

     
    
    useEffect(() => {
         try {
                 fetch(`${apiurl}/auth/customer/vm_list`, {
                 method: 'GET',
                 headers: {
                     'Content-Type': 'application/json',
                     'Authorization': `Bearer ${tok}`
                    },
                }).then(res=>res.json()).then(data=>  {
                   if(data.status === false && data.msg==="Invalid or Expire Token") {
                        if(! localStorage.getItem('token')){
                            return
                        }
                        toast.error(<strong>{'Your session has expired. You will be logged out'}</strong>,{
                            position:'top-center',
                            autoClose:5000,
                            hideProgressBar :true,
                            closeOnClick:true,
                            pauseOnHover:true,
                            draggable:true ,
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
                         })
                         setTimeout(()=>{
                            dispatch(clearToken())
                            navigate('/')
                         },5000)
                   }else {
                      if(data.length>0){
                           setCars(data)
                         }
                         
                      }
                      
                   }    
                )
           } catch (error) {
                
                toast.error(<strong>{'something went wrong. please try again later'}</strong>,{
                   position:'top-center',
                   autoClose:5000,
                   hideProgressBar : true,
                   closeOnClick:true,
                   pauseOnHover:true,
                   draggable:true ,
                   progress: undefined,
                   style: {
                    backgroundColor: '#d4edda',  
                    borderRadius: '8px',
                    border: '1px solid #c3e6cb',
                    letterSpacing:'1.5px' 
                  }
                })
            }
 }, [tok,navigate,dispatch,apiurl]);


  return (
     <>
            <body className='bodycar'>  
            <Navbar/>
            <div className="container1 my-5">
            <h2 className="mb-4">Available Cars</h2>
            <div className="row">
                {cars.map(car =>(
                    <div key={car.id} className="col-md-4 mb-4">
                        <div className="card">
                            <img src={car.veh_master.image} alt={car.veh_master.model} className="card-img-top" />
                            <div className="card-body">
                                <h5 className="card-title">{car.veh_master.model}</h5>
                                <p className="card-text">Price: ${car.price_km}/km</p>
                                <Link to='/details' state={{car:car}} className="btn btn-danger">View Details</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    
        </body> 
        <ToastContainer/>   
     </>
  )
}

