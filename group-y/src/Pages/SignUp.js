import React, {useState} from 'react'
import LoginForm from '../Login/LoginForm'
import axios from 'axios'

const SignUp = () => {

    const [users, setUser] = useState([]);
    
    const [username, setName] = useState('');

    const [SignIn, setSignIn] = useState(false);
  
    const [Taken, setTaken] = useState(false);
    
      const addUser = (newUser) => {
    
        axios.post("http://localhost:8102/auth/register", newUser)
        .then(response => {
          console.log("POST response", response)
          setUser([...users, response.data])
          console.log("Unique user token:", response.data.token)
  
           if (response.data.status === "success") {
            setSignIn(true)
            setTaken(false)
            localStorage.setItem('token', response.data.token)
            setName(response.data.username)
          } else if(response.data.status === "username taken") {
            setTaken(true)
            setSignIn(false)
          } 
        }) 
      }
      
  return (
    <div className="App">
      <div className="loginResponse">
      {SignIn && username + ' is currently logged in'} 
      {Taken && 'Invalid Username'} 
      </div> 
    <header className="App-header">
      <LoginForm updateFn={addUser}/>
    </header>
    </div>
    )
}

export default SignUp