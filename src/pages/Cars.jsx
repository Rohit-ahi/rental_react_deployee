
import Navbar from "./Navbar";

export default function Cars(){

        return <>
        
  
   
       <Navbar/> 
       <br />      
<div  classNameName="car">
   <div className="container">
      <div className="row">
         <div className="col-md-12">
            <div className="titlepage">
               <h2 style={{color:'black'}}>VARIETY OF CARS </h2>
               <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna</span>
            </div>
         </div>
      </div>
      <div className="row">
         <div className="col-md-4 padding_leri">
            <div className="car_box">
               <figure><img src="images/car_img1.png" alt="#"/></figure>
               <h3>Hundai</h3>
            </div>
         </div>
         <div className="col-md-4 padding_leri">
            <div className="car_box">
               <figure><img src="images/car_img2.png" alt="#"/></figure>
               <h3>audi</h3>
            </div>
         </div>
         <div className="col-md-4 padding_leri">
            <div className="car_box">
               <figure><img src="images/car_img3.png" alt="#"/></figure>
               <h3>Bmw x5</h3>
            </div>
         </div>
      </div>
   </div>
</div><br />


<footer> 
<div>
<section className="change red_bg" style={{padding:'20px 0',textAlign:'center',color:'#ffffff'}}>
  <div className="container">
    <div className="row align-items-center">
      <div className="col-xl-9 col-lg-9 col-12">
        <div className="change_content">
          <h2 style={{fontSize:"24px",fontWeight:'bold'}}>Drive Into the Future, Join Rento Today!</h2>
          <h5 style={{color: 'black' ,marginTop:'10px',fontSize:'16.39px'}}>
            Experience hassle-free vehicle rentals with Rento. Whether for business, travel, or adventure, 
            we provide you with the convenience and reliability you deserve. Start your journey with us and 
            make every mile memorable.
          </h5>
        </div>
      </div>
    </div>
  </div>
</section>

    

      <div className="copyright">
         <div className="container">
            <div className="row">
               <div className="col-md-12 ">
                  <p>© 2019 All Rights Reserved. Design by Rento</p>
               </div>
            </div>
         </div>
      </div> 

       </div>
   </footer>  



    </>
}