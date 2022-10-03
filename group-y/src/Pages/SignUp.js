import React, { useEffect, useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import SignUpForm from "../formHandlers/SignUpForm.js";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

//Tracking Logged in status
//Could add a if check -> which checks for a token
//if token exists say user is still logged in with 
//the tokens authorization. unless they logout.
let logInTracker = false;

const SignIn = () => {

  //Sets current location of the user to the page they are on
  localStorage.setItem('location', window.location.pathname)

  //Defining Navigate functionality
  const navigate = useNavigate()

  //Go to Conversations Page if logged in already
  const token = localStorage.getItem('token');

  //If the token does not exist, set logInTracker to False
  if (!token) {
    logInTracker = false;
  } else {
    logInTracker = true;
  }

  let location = localStorage.getItem('location');

  //Goes straight to /conversations if logged in (if token exists)
  useEffect(() => {
    if (token) {
      logInTracker = false;
      console.log("token exists", logInTracker)
      if (location !== "/") {
        //Do Nothing
        logInTracker = true;
      } else if(!logInTracker) {
        navigate("/");
      }
    }
  })

  //Error Message State Variable
  const [errorMessages, setErrorMessages] = useState({});

  //Create new User Function
  const createNewUser = (newUnit) => {

    axios.post("http://localhost:8102/auth/register", newUnit)
    .then(response => {          
      console.log("POST response", response)
      if (response.data.status === "username taken") {
        setErrorMessages({name: "uname", message: "Username already Exists!"})
      } else {
        console.log("new user")
        logInTracker = true;
        setErrorMessages({name: "uname", message: ""})
        localStorage.setItem('user', response.data)
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('username', response.data.username)
        navigate("/")
      }
    })
  }

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
    <div className="log-sign-container">
        <h1 className="log-sign-in">Signup</h1>
        {logInTracker ? <div>Your account '{localStorage.getItem('username')}' has successfully been registered!</div> : <SignUpForm updateFn={createNewUser}/>}
        {logInTracker && <Stack spacing={2} alignItems="center"> <Button onClick={(logOut)} variant="contained">Logout</Button> </Stack>}     
        {renderErrorMessage("uname")}
        <p className="largeText"> Or Login if you already have an account.</p> 
        <Stack spacing={2} alignItems="center">
          <Button onClick={(logIn)} variant="contained">Login</Button>
      </Stack>
    </div>
 );  
}

export default SignIn