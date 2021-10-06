import React, { useState } from 'react'
import validator from 'validator';
import Head from 'next/head'
import axios from "axios";


export default function Home() {
const [email, setEmail] = useState('');
const [isError, setIsError] = useState('');
const [isExists, setIsExists] = useState(false);
const [isSuccess, setIsSuccess] = useState(false);

const inputChangeHandler = (e)=>{
   e.preventDefault()
   setIsError('')
   setEmail(e.target.value)
}
const formOnSubmit = (e)=>{
   e.preventDefault()   
   setIsExists(false)
   setIsSuccess(false)
   setIsError('')
   if (!validator.isEmail(email)) {
      setIsError('Please enter valid email')
   }
   else
   {
      const newSubscribe = {
         email
      };
      axios.post('https://api.notificationservice.nigeriastack.com/api/v1/subscriber/', newSubscribe)
      .then(response => {
         if(response.data.message==='The email has already subscribed')
         {
            setIsExists(true)
            setIsError('')
            setEmail('')
         }
         else
         {
            setIsSuccess(true)
            setIsError('')
            setEmail('')
         }
      } )
      .catch(error => {
         setIsError('Sorry something went wrong, try again!')
         setEmail('')
      });
      
   }
}
return (
<div>
   <Head>
      <title>Wydspread</title>
      <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png"/>
      <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png"/>
      <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png"/>
      <link rel="manifest" href="/images/site.webmanifest">
      </link>
   </Head>
   <div className="main_banner w-100 float-left position-relative px-lg-4 px-md-4 px-sm-4 px-3 pe-lg-4 pe-md-4">
      <div className="girl_img d-lg-none d-md-block d-sm-none d-none position-absolute"><img src="images/girl-img.png"/></div>
      <div className="container-fluid">
         <div className="d-flex justify-content-between mb-2 ps-xl-5 mt-lg-0 mt-md-3 mb-lg-2 mb-md-2 mb-5 px-lg-1">
            <div className="logo ps-lg-3"><a href="#"><img src="images/logo.png"/></a></div>
            <button type="button" className="btn text-white rounded-pill px-4 me-lg-2 mt-lg-1">Register <span className="arr_icon">&nbsp;</span>
            </button>
         </div>
         <div className="row d-flex justify-content-between align-items-center text-lg-start text-center ps-xl-5 mb-lg-5">
            <div className="col-xl-6 col-lg-7 col-xs-12">
               <div className="mb-3 my-lg-2 my-md-5 ps-xl-4 pt-xl-4">
                  <h2 className="mb-3 mt-lg-3 pt-lg-2 ps-lg-1">Build and scale<br/>
                     <span className="text-white">your online presence <br/>with zero effort</span>
                  </h2>
                  <p className="mb-3 ps-lg-1 mt-3 pt-1">Introducing you own dedicated AI outreach platform that <br/>will allow you to manage/scale your online presence.</p>
                  <h4 className="text-white mb-3 ps-lg-1 pt-1 px-lg-0 px-md-0 px-sm-0 px-4">No need of a SEO specialist or a <br/>marketing manager.</h4>
                  <p className="ps-lg-1 mt-3 pt-1">Join for free early access</p>
                     {isSuccess ? (
                        <div className="signup_form position-relative d-flex flex-column justify-content-lg-start justify-content-center mt-3 mt-lg-3 mt-md-2 pt-1">
                        <button type="submit" className=" signup_button2 btn2 rounded-pill border-0 py-3 mb-3">Thanks for subscribing for early access!</button>
                        </div> 
                     ) : (
                        <div className="signup_form position-relative d-flex flex-column justify-content-lg-start justify-content-center mt-3 mt-lg-3 mt-md-2 pt-1">
                           <form onSubmit={formOnSubmit}>
                           <div className="d-flex flex-lg-row flex-column mb-3 ">
                           
                              <input type="email"
                              placeholder="Enter your email"
                              value={email}
                              className="text-white rounded-pill me-lg-2 mb-lg-0 mb-mb-2 mb-3 px-4 py-3 bg-transparent"
                              onChange = {inputChangeHandler}/>
                              
                              <div className="signup_button rounded-pill border-0 py-3 mt-md-1 mt-lg-0">
                              <button type="submit" class="bg-transparent border-0 text-white">
                                 Early Access <span className="arr_icon">&nbsp;</span>                     
                              </button>       
                              </div>  
                                                   
                           </div>
                           </form>  
                        </div>   
                     )}
                     
                                         
                     <div className="w-100 btn-msg-sec d-flex justify-content-md-start justify-content-sm-center">
                        <p
                        className={isExists ? 'text-success text-start' : 'd-none text-success text-start'}
                        >
                           <svg class="svg-icon bg-success rounded-pill p-1" viewBox="0 0 20 20">
                              <path fill="none" d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"></path>
                           </svg>
                           <span className="ps-md-3 ps-sm-2">You have already subscribed for early access!</span>
                        </p>
                        
                        <p
                        className={isError ? 'text-danger text-start' : 'd-none text-danger text-start'}
                        >
                           <svg className="svg-icon bg-danger rounded-pill p-1" viewBox="0 0 20 20">
                              <path fill="none" d="M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z"></path>
                           </svg>
                           <span className="ps-md3 ps-sm-2">{isError}</span>
                        </p>
                     </div>
                  </div>
               
            </div>
            <div className="col-xl-6 col-lg-5 col-xs-12">
               <img className="w-100 pe-lg-5 md-0 d-lg-block d-md-none d-sm-block" src="images/main_img.png"/>
            </div>
         </div>
         
         <hr/>

         <div className="footer pt-4 pb-lg-2 pb-md-2 pb-0 ps-xl-5 pt-lg-2 pt-md-5 mt-lg-0 mt-md-5">
           
            <p className="mb-0 text-center text-lg-start ps-xl-4">
               All Rights Reserved 2021® &nbsp; &nbsp;| 
               <a href="#" className="ps-2 text-white text-decoration-none">
                  <svg class="svg-icon" viewBox="0 0 20 20"> 
                     <path fill="none" d="M18.258,3.266c-0.693,0.405-1.46,0.698-2.277,0.857c-0.653-0.686-1.586-1.115-2.618-1.115c-1.98,0-3.586,1.581-3.586,3.53c0,0.276,0.031,0.545,0.092,0.805C6.888,7.195,4.245,5.79,2.476,3.654C2.167,4.176,1.99,4.781,1.99,5.429c0,1.224,0.633,2.305,1.596,2.938C2.999,8.349,2.445,8.19,1.961,7.925C1.96,7.94,1.96,7.954,1.96,7.97c0,1.71,1.237,3.138,2.877,3.462c-0.301,0.08-0.617,0.123-0.945,0.123c-0.23,0-0.456-0.021-0.674-0.062c0.456,1.402,1.781,2.422,3.35,2.451c-1.228,0.947-2.773,1.512-4.454,1.512c-0.291,0-0.575-0.016-0.855-0.049c1.588,1,3.473,1.586,5.498,1.586c6.598,0,10.205-5.379,10.205-10.045c0-0.153-0.003-0.305-0.01-0.456c0.7-0.499,1.308-1.12,1.789-1.827c-0.644,0.28-1.334,0.469-2.06,0.555C17.422,4.782,17.99,4.091,18.258,3.266"></path>
                  </svg>
                  <span className="ps-2">Follow at Twitter For updates</span>
               </a>
            </p>
         </div>
      </div>
   </div>
</div>
)
}

