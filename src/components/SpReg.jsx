


import React from 'react'
import '../SpReg.css'
import { Link} from 'react-router-dom'
import { useRef } from 'react'
import Navbar from '../pages/Navbar'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function SpReg() {

    const apiurl = process.env.REACT_APP_API_URL
      const spname = useRef()
      const spphone = useRef()
      const spemail = useRef()
      const spcompany = useRef()
      const spaddress = useRef()
      const spreg = useRef()
      const spcontact = useRef()
      const spcontactp = useRef()

    const handleform = async (e)=>{
        e.preventDefault()
        const spformdata = {
               name : spname.current.value,
               phone : spphone.current.value,
               email : spemail.current.value,
               company_name : spcompany.current.value,
               contact : spcontact.current.value,
               reg_number : spreg.current.value,
               contact_person : spcontactp.current.value,
               address : spaddress.current.value
            }

            if(spformdata.phone) {
                const ph = spformdata.phone
                if(ph.length !== 10) {
                   return toast.error(<strong>{'Mobile Number must be 10 digit'}</strong>,{
                       position:'top-center',
                       autoClose:'4000',
                       hideProgressBar:true,
                       closeOnClick:true,
                       pauseOnHover: true,
                       draggable: true,
                       progress:undefined
                   })
                }
            }

        try {
               const result = await fetch(`${apiurl}/rental/sp_reg`, {
                      method : 'POST',
                      headers : {
                         'Content-Type':'application/json'
                      },
                      body : JSON.stringify(spformdata)  
                }) 
               const resdata = await result.json()
               if(resdata.status) {
                     toast.success(<strong>{resdata.msg}</strong>, {
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
                            letterSpacing:'1.5px',
                            color: '#155724',  
                            fontSize: '16px',
                            fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
                            lineHeight: '1.5',
                            padding: '8px', 
                          }
                      });
               }else {
                toast.error(<strong>{resdata.msg}</strong>, {
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
                        letterSpacing:'1.5px',
                        color: '#155724',  
                        fontSize: '16px',
                        fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
                        lineHeight: '1.5',
                        padding: '8px', 
                      }
                  });
               }
     
        } catch (error) {
            toast.error(<strong>{"Something went wrong. please try again later"}</strong>, {
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
                    letterSpacing:'1.5px',
                  }
              });
        }
        e.target.reset()
    }

  return (
    <>
    
    <body className='bodyspreg'>
    <Navbar/>
    <section>
        <div className="wrapper0" id='d1'>
            <div className="form0">
                <h1 className="title0">Service Provider Register</h1>
                <form action="#" className="myform0" onSubmit={handleform}>
                    <div className="flexrowspreg">
                        <div className="flexitemspreg">
                            <div className="control-from0">
                                <input type="text" id="firstname" placeholder='Name' ref={spname} required />
                            </div>
                        </div>
                        <div className="flexitemspreg">
                            <div className="control-from0">
                                <input type="number" id="lastname" placeholder='Phone' ref={spphone} required />
                            </div>
                        </div>
                    </div>
                    <div className="flexrowspreg">
                        <div className="flexitemspreg">
                            <div className="control-from0">
                                <input type="email" id="emailaddress" placeholder='Email' ref={spemail} required />
                            </div>
                        </div>
                        
                    </div>
                    <div className="flexrowspreg">
                        <div className="flexitemspreg">
                            <div className="control-from0">
                                <input type="text" id="companyname" placeholder='Company Name' ref={spcompany} required />
                            </div>
                        </div>
                        <div className="flexitemspreg">
                            <div className="control-from0">
                                <input type="text" id="address" placeholder='Address' ref={spaddress} required />
                            </div>
                        </div>
                    </div>
                    <div className="flexrowspreg">
                        <div className="flexitemspreg">
                            <div className="control-from0">
                                <input type="text" id="contact" placeholder='Contact' ref={spcontact} required />
                            </div>
                        </div>
                        <div className="flexitemspreg">
                            <div className="control-from0">
                                <input type="text" id="reg" placeholder='Reg Number' ref={spreg} required />
                            </div>
                        </div>
                    </div>
                    <div className="flexrowspreg">
                        <div className="flexitemspreg">
                            <div className="control-from0">
                                <input type="text" id="location" placeholder='Contact Person' ref={spcontactp} required />
                            </div>
                        </div>
                    </div><br />
                    <div className="button0">
                        <button id="register" type="submit">Register</button>
                    </div>
                    <br />
                    <div className='row'>
                        <div className='col-lg-12 col-md-6'>
                        </div>
                        <div className='col-lg-12 col-md-6'>
                            <p style={{ color: 'black' }}>Already registered? <Link to="/login" style={{ color: 'red', fontSize: '15px', fontWeight: 'bold', letterSpacing: '1px' }}>Log in Now</Link></p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </section>
</body>
<ToastContainer />  
    </>
  )
}
