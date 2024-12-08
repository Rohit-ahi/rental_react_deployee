

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../pages/Navbar';
import { clearToken } from '../redux/createslice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


export default function BookingHistory() {

  const apiurl = process.env.REACT_APP_API_URL
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = useSelector((state) => state.login.token);

  const [history,setHistory] = useState([])
    useEffect(() => {
         fetch(`${apiurl}/auth/customer/booking-history`, {
            method: 'GET',
            headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${token}`, 
            },
         }).then((res) => res.json()).then((data) => {
               if(data.status===false && data.msg==='Invalid or Expire Token') {
                    if(!localStorage.getItem('token')){
                         return
                    }
                    toast.error(<strong>{'something went wrong. please try again later'}</strong>,{
                      position:'top-center',
                      autoClose:5000,
                      hideProgressBar:true,
                      closeOnClick: true,
                      pauseOnHover:true,
                      draggable:true,
                      progress :undefined,
                      style:{
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
                    setTimeout(() => {
                        dispatch(clearToken())
                        navigate('/')
                    },5000);
               }else{
                    if(data.length>0) {
                       const bookdata = data.reverse()
                       setHistory(bookdata); 
                    }   
               }
         })
         .catch(() =>{
              toast.error(<strong>{'something went wrong. please try again later'}</strong>,{
                  position:'top-center',
                  autoClose:5000,
                  hideProgressBar:true,
                  closeOnClick: true,
                  pauseOnHover:true,
                  draggable:true,
                  progress :undefined,
                  style:{
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
         });
   }, [token,dispatch,navigate,apiurl]);

  return (
    <>  

  <body>
  <Navbar />
  <div className="container mt-5">
    <h3 className="text-center" style={{ color: 'black',fontSize:'24px' }}>Your Booking History</h3>
    <div className="row justify-content-center">
      <div className="col-lg-10 col-md-12">

        {history.length === 0 ? (
            <div className="no-bookings" style={{ textAlign: 'center', padding: '50px', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0px 4px 8px rgba(0,0,0,0.1)' }}>
            <img 
              src="\images\booking_img.webp" 
              alt="No Bookings Yet" 
              style={{ width: '150px', marginBottom: '20px' }} 
            />
            <h3 style={{ color: '#333', fontWeight: 'bold' }}>No Bookings Found</h3>
            <p style={{ color: '#666', fontSize: '16px', margin: '10px 0 20px' }}>
              It looks like you haven’t made any bookings yet. Explore our services to make your first booking now!
            </p>
            <button 
              onClick={() => navigate('/Vcustomerlist')} 
              className="btn btn-primary" 
              style={{ padding: '10px 20px', fontSize: '16px', borderRadius: '5px' }}
            >
              Explore Services
            </button>
          </div>
          
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead className="thead-dark">
                <tr>
                  <th>Booking ID</th>
                  <th>Vehicle Deatails</th>
                  <th>Start Date</th>
                  <th>Pick-up Location</th>
                  <th>Drop Location</th>
                  <th>Days</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {history.map((booking) => (
                  <tr key={booking.id}>
                    <td>{booking.id}</td>
                    <td>{booking.vm.model}</td>
                    <td>{new Date(booking.start_date).toISOString().split('T')[0]}</td>
                    <td>{booking.pick_location}</td>
                    <td>{booking.drop_location}</td>
                    <td>{booking.days}</td>
                    <td>
                      <span
                        className={`badge ${
                          booking.status ? 'badge-success' : 'badge-warning'
                        }`}
                      >
                        {booking.status ? 'Completed' : 'Pending'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  </div>
</body>


    </>
  );
}
