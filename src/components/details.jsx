

import React, {  useState } from 'react'
import { useLocation } from 'react-router-dom'
import '../Cardetail.css'
import Navbar from '../pages/Navbar'
import Booking from './Booking'

export default function Details() {
  
     const location = useLocation()
     const {car} = location.state
     const[showbooking,setshowbooking] = useState(false)
     if (!car) return <p>Loading...</p>;
      
  return (
      <>  
         <Navbar/> 
             <div className='container7 '>
                <div className="card7">
                    <div className="row">
                        <div className="col-md-4">
                            <img src={car.veh_master.image||''} alt={car.model||''} className="card-img-top7" />
                        </div>
                        <br />
                        <div className="col-md-4">
                            <h2 className="card-title7">{car.veh_master.model}</h2>
                            <p className="card-text7">Type : {car.veh_master.type}</p>
                            <p className="card-text7">Capacity (Seats) : {car.veh_master.capacity_seats}</p>
                            <p className="card-text7">Capacity (Tons) : {car.veh_master.capacity_tons} </p>
                        </div>
                        <div className="col-md-4">
                            <p className="card-text7">Ac_charges : ${car.ac_charges}/km</p>
                            <p className="card-text7">PUC status : {car.ispuc ? "Yes" : "No"}</p>
                            <p className="card-text7">Insurance : {car.isinsurance ? "Yes" : "No"}</p>
                            <button className="btn-success" onClick={()=>setshowbooking(true)}>Book Now</button>
                        </div>
                    </div>
                </div>
            </div> 


    {showbooking && (
        <Booking
        vehicleid={car.veh_master.id} 
        close ={()=>setshowbooking(false)}
        />
      )}
        
      </>
  )
}
