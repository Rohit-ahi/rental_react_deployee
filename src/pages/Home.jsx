
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Home(){

    return  <>
   <Navbar/>          
<section className="banner_main main-layout">
   <div className="container">
      <div className="row d_flex">
         <div className="col-md-12">
             <br /><br />
            <div className="text-bg">
                
               <h1>Find best car Here For rent</h1>
               <strong>Free Multipurpose Responsive</strong>
               <span>Landing Page 2019</span>
               <p>
                 
                  <head></head>
               </p>
                <a href="/Vcustomerlist">Find Car</a> 
            </div>
         </div>
      </div>
   </div>
</section>

 <br />
<div  classNameName="car">
   <div className="container">
      <div className="row">
         <div className="col-md-12">
            <div className="titlepage">
               <h2>VARIETY OF CARS </h2>
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
   </div>


{/* 
<div id="contact" className="bestCar">
   <div className="container">
      <div className="row">
         <div className="col-md-12">
         </div>
      </div>
      <div className="row">
         <div className="col-sm-12">
            <div className="row">
               <div className="col-md-6 offset-md-6">
                    <form className="main_form">
                     <div className="titlepage">
                        <h2>Find A  Best Car For Rent</h2>
                     </div>
                      <div className="row">
                        <div className="col-md-12 ">
                           <select>
                              <option value="0">Choose car Make</option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                           </select>
                        </div> 
                         <div className="col-md-12">
                           <select>
                              <option value="0">Choose Car Type </option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                           </select>
                        </div> 
                       <div className="col-md-12">
                           <input className="contactus" placeholder="Search" type="Search" name="Search"/>                          
                        </div>
                        <div className="col-md-12">
                           <select>
                              <option value="0">Price of Rent</option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                           </select>
                        </div>  
                        <div className="col-sm-12">
                           <button className="find_btn">Find Now</button>
                        </div>
                     </div>
                  </form> 
               </div>
            </div>
         </div>
      </div>
   </div>
</div> */}


<div className="cutomer">
   <div className="container">
      <div className="row">
         <div className="col-md-12">
            <div className="titlepage">
               <h2>What is says our cutomer</h2>
            </div>
         </div>
      </div>
      <div className="row">
         <div className="col-md-12">
            <div id="myCarousel" className="carousel slide cutomer_Carousel " data-ride="carousel">
                {/* <ol className="carousel-indicators">
                  <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                  <li data-target="#myCarousel" data-slide-to="1"></li>
                  <li data-target="#myCarousel" data-slide-to="2"></li>
               </ol>  */}
               <div className="carousel-inner">
                  <div className="carousel-item active">
                     <div className="container">
                        <div className="carousel-caption ">
                           <div className="cross_img">
                              <figure><img src="images/cross_img.png" alt="#"/></figure>
                           </div>
                           <div className="our cross_layout">
                              <div className="test_box">
                                 <h4>Due markes</h4>
                                 <span>Rental</span>
                                 <p>Simplify your journeys with Rento. We provide reliable and affordable vehicle rental solutions for your travel needs. 
                                      Whether it's a business trip, a weekend getaway, or a long road adventure, Rento ensures comfort, convenience, and 
                                      excellence in every ride. Join us and experience the difference with vehicles tailored for every journey.</p>
                                 <i><img src="images/te1.png" alt="#"/></i>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="carousel-item">
                     <div className="container">
                        <div className="carousel-caption">
                           <div className="cross_img">
                              <figure><img src="images/cross_img.png" alt="#"/></figure>
                           </div>
                           <div className="our cross_layout">
                              <div className="test_box">
                                 <h4>Due markes</h4>
                                 <span>Rental</span>
                                 <p>Simplify your journeys with Rento. We provide reliable and affordable vehicle rental solutions for your travel needs. 
                                      Whether it's a business trip, a weekend getaway, or a long road adventure, Rento ensures comfort, convenience, and 
                                      excellence in every ride. Join us and experience the difference with vehicles tailored for every journey.</p>
                                 <i><img src="images/te1.png" alt="#"/></i>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="carousel-item">
                     <div className="container">
                        <div className="carousel-caption">
                           <div className="cross_img">
                              <figure><img src="images/cross_img.png" alt="#"/></figure>
                           </div>
                           <div className="our cross_layout">
                              <div className="test_box">
                                 <h4>Due markes</h4>
                                 <span>Rental</span>
                                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit ess</p>
                                 <i><img src="images/te1.png" alt="#"/></i>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <a className="carousel-control-prev" href="#myCarousel" role="button" data-slide="prev">
               <span className="carousel-control-prev-icon" aria-hidden="true"></span>
               <span className="sr-only">Previous</span>
               </a>
               <a className="carousel-control-next" href="#myCarousel" role="button" data-slide="next">
               <span className="carousel-control-next-icon" aria-hidden="true"></span>
               <span className="sr-only">Next</span>
               </a>
            </div>
         </div>
      </div>
   </div>
</div>

       <Footer/>


       </> 

} 