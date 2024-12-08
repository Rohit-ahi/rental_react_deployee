
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../Booking.css'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { clearToken } from '../redux/createslice'
import { useNavigate } from 'react-router-dom'
import { Modal,Button } from 'react-bootstrap' 



export default function Booking({vehicleid,close}) {

         const apiurl = process.env.REACT_APP_API_URL
         const tok = useSelector(state=>state.login.token)
         const dispatch = useDispatch()
         const navigate = useNavigate()
         const bookdata = {
                             start_date: '',
                             pick_location: '',
                             drop_location: '',
                             days: '',
                          }
        const[bookingdata,setbookingdata] = useState({...bookdata})

        const hendledata = (e)=> {
              setbookingdata({
                    ...bookingdata ,
                    [e.target.name] : e.target.value
              })  
         }
        const senddata = {
            vmaster: vehicleid,
            start_date : bookingdata.start_date,
            pick_location : bookingdata.pick_location,
            drop_location : bookingdata.drop_location,
            days : bookingdata.days ,        
         }
         
        const handleBookingSubmit = (e)=> {
              e.preventDefault()
              fetch(`${apiurl}/auth/customer/vehicle-booking`, {
                    method:'POST',
                    headers : {
                        'Content-Type' : 'application/json' ,
                         'Authorization' : `Bearer ${tok}`
                    },
                    body : JSON.stringify(senddata)
              }) 
              .then(res=> res.json()).then(data=> { 
                       if(data.status) {
                         toast.success(<strong>{data.msg}</strong>, {
                              position: 'top-center',
                              autoClose: 3000, 
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
                         setbookingdata({...bookdata}) 
                      }else {
                          if(data.status===false && data.msg ==='Invalid or Expire Token') {
                               if(!localStorage.getItem('token')){
                                  return
                               }
                               toast.error(<strong>{'Your session has expired. You will be logged out'}</strong>, {
                                position: 'top-center',
                                autoClose: 4000, 
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
                              setTimeout(()=>{
                                  dispatch(clearToken())
                                  navigate('/') 
                              },4000)
                          }else{
                            toast.error(<strong>{data.msg}</strong>, {
                              position: 'top-center',
                              autoClose: 4000, 
                              hideProgressBar: true,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                            });
                          }
                      }
              })
              .catch(()=>{
                toast.error(<strong>{"something went wrong. please try again later"}</strong>, {
                  position: 'top-center',
                  autoClose: 4000, 
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
              }) 
          }

  return(
     <>
    
      <Modal show={true} onHide={close} centered>
           <Modal.Header closeButton>
              <Modal.Title className='modal-title-custom'>Booking</Modal.Title>
           </Modal.Header>
           <Modal.Body>
        
          <form onSubmit={handleBookingSubmit} >
            <div className="mb-3">
              <label htmlFor="start_date" className="form-label">Start Date</label>
              <input
                type="date"
                className='form-control'
                id="start_date"
                name="start_date"
                value={bookingdata.start_date}
                onChange={hendledata}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="pick_location" className="form-label">Pick-up Location</label>
              <input
                type="text"
                className="form-control"
                id="pick_location"
                name="pick_location"
                value={bookingdata.pick_location}
                onChange={hendledata}
                placeholder="Enter pick-up location"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="drop_location" className="form-label">Drop Location</label>
              <input
                type="text"
                className="form-control"
                id="drop_location"
                name="drop_location"
                value={bookingdata.drop_location}
                onChange={hendledata}
                placeholder="Enter drop location"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="days" className="form-label">Number of Days</label>
              <input
                type="number"
                className="form-control"
                id="days"
                name="days"
                value={bookingdata.days}
                onChange={hendledata}
                min={1}
                placeholder="Enter number of days"
                required
              />
            </div>

         
            <div>
              <Button type="submit" className="btnbooking12 btn-block" >Submit Booking</Button>
            </div>
          
             
          </form>
        
           </Modal.Body>
      </Modal>

    <ToastContainer />

     </>
  )
}



