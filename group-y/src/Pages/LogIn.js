//Imports
import LoginForm from "../Components/LogInForm.js";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Stack from '@mui/material/Stack';
import AxiosService from "../AxiosService"
import MenuBarSearch from "../Components/MenuBarSearch.js";

//Tracking Logged in status
let logInTracker = false;

const Login = () => {

  //Defining Navigate functionality
  const navigate = useNavigate()
  
  //Goes straight to '/' if logged in (if token exists)
  useEffect(() => {
    AxiosService.validateToken()
    .then(response => {
        if(response.status == 'success'){
          logInTracker= true
          navigate("/")
        }
    })
  }, [])

  //Error Message State Variable
  const [errorMessages, setErrorMessages] = useState({});

  //Create new User Function
  const createNewUser = (newUser) => {
    AxiosService.login(newUser).then(response => {
      if (response.data.error === "user does not exist") {
        setErrorMessages({name: "uname", message: "Your Username or password is incorrect!"})
      } else {
        console.log("A User has logged in!")
        logInTracker = true;
        setErrorMessages({name: "uname", message: ""})
        navigate("/")
      }
    })
  }

  //User can log out 
  const logOut = () => {
    AxiosService.logOut()
    
  }

  //Navigate to signin Page
  const signIn = () => {
    navigate("/register")
  }

  return (
		<div className="LoginPage">
			<section className="loginheader">
                <div className='MasterHeader'>
                    <ul>
                        <li> <a href="/">Home</a> </li>
                        <li> <a href="/categories"> Categories </a> </li>
                        <li> <a href="/addlisting">Add Listing </a> </li>
                        <li> <a href="/search"> Search </a> </li>
                        <li> <MenuBarSearch></MenuBarSearch> </li>
                    </ul>
                </div>
                <h1>Welcome to RentNBuy</h1>
			</section>
			<section className="loginBox">
				<h2 className="loginpageHeading">Login</h2>
				{logInTracker ? <div>{localStorage.getItem('username')} has successfully logged in!</div> : <LoginForm updateFn={createNewUser}/>}
				{logInTracker && <Stack spacing={2} alignItems="center"> <button onClick={(logOut)} variant="contained">Logout</button> </Stack>}     
				{logInTracker ? console.log("User Logged In") : <p className="largeText"> Or sign up if you do not have an account.</p>}
				{logInTracker ? console.log("User Logged In") : <Stack spacing={2} alignItems="center">
					<button className="appBtn" onClick={(signIn)} variant="contained">Signup</button>
				<div className="error">{errorMessages.message}</div> </Stack>}
			</section>
		</div>
    );  
}

export default Login