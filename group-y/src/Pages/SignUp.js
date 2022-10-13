import React, { useEffect, useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import SignUpForm from "../Components/SignUpForm.js";
import Stack from '@mui/material/Stack';
import button from '@mui/material/button';
import AxiosService from "../AxiosService"

//Tracking Logged in status
//Could add a if check -> which checks for a token
//if token exists say user is still logged in with 
//the tokens authorization. unless they logout.
let logInTracker = false;

const SignIn = () => {

  //Defining Navigate functionality
  const navigate = useNavigate()

  //Go to Conversations Page if logged in already
  const token = AxiosService.getToken()

  //If the token does not exist, set logInTracker to False
  if (!token) {
    logInTracker = false;
  } else {
    logInTracker = true;
  }

  //Goes straight to / if logged in (if token exists)
  useEffect(() => {
   AxiosService.validateToken()
      .then(response => {
        console.log(response)
        if(response == 'success'){
          logInTracker= true
          navigate("/")
        }
      })
  }, [])

  //Error Message State Variable
  const [errorMessages, setErrorMessages] = useState({});

  //Create new User Function
  const createNewUser = (newUser) => {
    AxiosService.register(newUser).then(response => {
        console.log("POST response", response)
      if (response.data.error === "username taken") {
        console.log("fail")
        setErrorMessages({name: "uname", message: "Username taken!"})
      } else {
        console.log("A User has logged in!")
        logInTracker = true;
        setErrorMessages({name: "uname", message: ""})
        navigate("/")
      }
    })
}

  //Create new User Function
//   const createNewUser = (newUser) => {

//     axios.post("http://localhost:8102/auth/register", newUser)
//     .then(response => {          
//       console.log("POST response", response)
//       if (response.data.status === "username taken") {
//         setErrorMessages({name: "uname", message: "Username already Exists!"})
//       } else {
//         console.log("new user")
//         logInTracker = true;
//         setErrorMessages({name: "uname", message: ""})
//         localStorage.setItem('user', response.data)
//         localStorage.setItem('token', response.data.token)
//         localStorage.setItem('username', response.data.username)
//         navigate("/")
//       }
//     })
//   }

  //User can log out 
  const logOut = () => {
    localStorage.clear()
    logInTracker = false
    navigate("/")
    console.log("Logging Out...")
  }

  //Navigate to login Page
  const logIn = () => {
    navigate("/login")
  }

  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
    <div className="error">{errorMessages.message}</div>
  );

 return (
<div className="LoginPage">
      <section className="loginheader">
      <div className='MasterHeader'>
        <ul>
            <li><a  href="/">Home</a></li>
            <li><a href="/categories"> Categories </a> </li>

        </ul>
        </div>
      <h1>Welcome to RentNBuy</h1>
      </section>
      <section className="loginBox">
        <h2 className="loginpageHeading">Signup</h2>
        {logInTracker ? <div>Your account '{localStorage.getItem('username')}' has successfully been registered!</div> : <SignUpForm updateFn={createNewUser}/>}
        {logInTracker && <Stack spacing={2} alignItems="center"> <button className="appBtn" onClick={(logOut)} variant="contained">Logout</button> </Stack>}     
        {logInTracker ? console.log("User Logged In") : <p className="largeText"> Or Login if you already have an account.</p>}
        {logInTracker ? console.log("User Logged In") : <Stack spacing={2} alignItems="center">
          <button className="appBtn" onClick={(logIn)} variant="contained">Login</button>
        {renderErrorMessage("uname")}
        </Stack>}
      </section>
    </div>
 );  
}

export default SignIn