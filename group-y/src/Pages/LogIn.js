import LoginForm from "../formHandlers/LogInForm.js";
import React, { useEffect, useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import authProfile from "../authProfile.js";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

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
      logInTracker = true;
      console.log("Token Exists!", logInTracker)
      if (location !== "/") {
        //Do Nothing
      } else if(!logInTracker) {
        navigate("/conversations");
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
        console.log("A New User has been created!")
        logInTracker = true;
        setErrorMessages({name: "uname", message: ""})
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
    <div>
      <h1 className="log-sign-in">Login</h1>
      {logInTracker ? <div>{localStorage.getItem('username')} has successfully logged in!</div> : <LoginForm updateFn={createNewUser}/>}
      {logInTracker && <Stack spacing={2} alignItems="center"> <Button onClick={(logOut)} variant="contained">Logout</Button> </Stack>}     
      {renderErrorMessage("uname")}
      {logInTracker ? console.log("User Logged In") : <p className="largeText"> Or sign up if you do not have an account.</p>}
      {logInTracker ? console.log("User Logged In") : <Stack spacing={2} alignItems="center">
        <Button onClick={(signIn)} variant="contained">Signup</Button>
      </Stack>}
    </div>
 );  
}

export default Login