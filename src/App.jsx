
import Cars from "./pages/Cars";
import Home from "./pages/Home";
import Contact from './pages/Contact'
import Whychoose from "./pages/Why_choose";
import {Routes , Route} from 'react-router-dom'
import Login from "./components/Login";
import CustReg from "./components/CustReg";
import SpReg from "./components/SpReg";
import Users from "./components/Users";
import Vehicles from "./components/Vehicles";
import Vehiclelist from "./components/Vehicle_list";
import Vehiclemaster from "./components/Vehiclemaster";
import Vehiclelistadmin from "./components/Vehiclelistadmin";
import Vmasterlist from "./components/Vmasterlist";
import Vcustomerlist from "./components/Vcustomerlist";
import Details from "./components/details";
import BookingHistory from "./components/BookingHistory";
import NotFoundPage from "./pages/Not_Foundpage";

import ProtectRoute from "./pages/ProtectRoute";



export default function App(){

       return <>

             
              <Routes>
                       <Route path='/' element = { <Home/>  }/>
                       <Route path='/Cars' element = { <Cars/>  }/> 
                       <Route path='/Contact' element = { <Contact/>  }/>    
                       <Route path='/Why_choose' element = { <Whychoose/>  }/>
                       <Route path='/Login' element = { <Login/>  }/>
                       <Route path='/CustReg' element = { <CustReg/>  }/>
                       <Route path='/SpReg' element = { <SpReg/>  }/>

                       <Route path='/Users' element = { <ProtectRoute element={<Users/>}/>} />
                       <Route path='/Vehicles' element = {<ProtectRoute element={<Vehicles/>}/>  }/>
                       <Route path='/Vehicle_list' element = {<ProtectRoute element={ <Vehiclelist/>}/>}/>
                       <Route path='/Vehiclemaster' element = {<ProtectRoute element={<Vehiclemaster/>}/> }/>
                       <Route path='/Vehiclelistadmin' element = {<ProtectRoute element={<Vehiclelistadmin/>}/> }/>
                       <Route path='/Vmasterlist' element = { <ProtectRoute element={<Vmasterlist/>}/> }/>
                       <Route path='/Vcustomerlist' element = { <ProtectRoute element={<Vcustomerlist/>}/>}/>
                       <Route path='/details' element = { <ProtectRoute element={<Details/>}/> }/>
                       <Route path='/BookingHistory' element = {<ProtectRoute element={<BookingHistory/>}/> }/>

                        {/* Fallback Route */}
                        <Route path="*" element={<NotFoundPage />} />

             </Routes> 
       </>
} 