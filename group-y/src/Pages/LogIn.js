import LoginForm from "../Components/LogInForm.js";
import React, { useEffect, useState } from "react";
import axios, { Axios } from 'axios'
import { useNavigate } from "react-router-dom";
import authProfile from "../authProfile.js";
import Stack from '@mui/material/Stack';
import AxiosService from "../AxiosService"

//Tracking Logged in status
//Could add a if check -> which checks for a token
//if token exists say user is still logged in with 
//the tokens authorization. unless they logout.
let logInTracker = false;

const Login = () => {

  //Sets current location of the user to the page they are on
  localStorage.setItem('location', window.location.pathname)

  //Defining Navigate functionality
  const navigate = useNavigate()

  //Go to Conversations Page if logged in already
  const token = document.cookie.substring(6)

  //If the token does not exist, set logInTracker to False
  if (!token) {
    logInTracker = false;
  } else {
    logInTracker = true;
  }

  let location = localStorage.getItem('location');

  //Goes straight to / if logged in (if token exists)
  useEffect(() => {
  //  AxiosService.validateToken()
  //     .then(response => {
  //       console.log(response)
  //       if(response == 'success'){
  //         logInTracker= true
  //         navigate("/")
  //       }
  //     })

   
    if (token) {
      logInTracker = true;
      console.log("Token Exists!", logInTracker)
      if (location !== "/") {
        //Do Nothing
      } else if(!logInTracker) {
        navigate("/");
      }
    }
  }, [])

  //Error Message State Variable
  const [errorMessages, setErrorMessages] = useState({});

  //Create new User Function
  const createNewUser = (newUser) => {

    axios.post("http://localhost:8102/auth/login", newUser, authProfile())
    .then(response => {          
      console.log("POST response", response)
      if (response.data.status === "user does not exist") {
        setErrorMessages({name: "uname", message: "Your Username or password is incorrect!"})
      } else {
        console.log("A User has logged in!")
        logInTracker = true;
        setErrorMessages({name: "uname", message: ""})
        var expires = new Date(Date.now() + 86400 * 1000).toUTCString()
        document.cookie = `token=${response.data.token}; SameSite=Lax` + expires + ";path=/;"
        localStorage.setItem("username", response.data.username)
        // localStorage.setItem('token', response.data.token)
        navigate("/")
      }
    })
  }

  //User can log out 
  const logOut = () => {
    AxiosService.logOut()
    
  }

  //Error message created
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
    <div className="error">{errorMessages.message}</div>
  );

  //Navigate to signin Page
  const signIn = () => {
    navigate("/register")
  }

 return (
    <div className="LoginPage">
      <section className="loginheader">
      <div className='MasterHeader'>
        <ul>
            <li><a class="active" href="/login">Login</a></li>
            <li><a  href="/">Home</a></li>
        </ul>
        </div>
      <h1>Welcome to RentNBuy</h1>
      </section>
      <section className="loginBox">
      <h2 className="loginpageHeading">Login</h2>
      {logInTracker ? <div>{localStorage.getItem('username')} has successfully logged in!</div> : <LoginForm updateFn={createNewUser}/>}
      {logInTracker && <Stack spacing={2} alignItems="center"> <button onClick={(logOut)} variant="contained">Logout</button> </Stack>}     
      {renderErrorMessage("uname")}
      {logInTracker ? console.log("User Logged In") : <p className="largeText"> Or sign up if you do not have an account.</p>}
      {logInTracker ? console.log("User Logged In") : <Stack spacing={2} alignItems="center">
        <button className="appBtn" onClick={(signIn)} variant="contained">Signup</button>

      </Stack>}
      </section>
    </div>
 );  
}

export default Login