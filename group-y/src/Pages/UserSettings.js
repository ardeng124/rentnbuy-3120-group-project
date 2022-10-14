import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import DropDownMenu from "../Components/DropDownMenu";
import AxiosService from "../AxiosService"
import MenuBarSearch from "../Components/MenuBarSearch.js";

// var loggedIn = false;
const UserSettings = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    useEffect(() => {
        AxiosService.validateToken()
           .then(response => {
             console.log(response)
             if(response == 'success'){
                setLoggedIn(true)
             } else {
                navigate("/")
             }
           })
       }, [])
    const navigate = useNavigate()
    const [formInfo, setFormInfo] = useState({username: '', password: ''})

    
    const formHandler = (event) => {
        event.preventDefault()
        console.log("Form submitted: ", formInfo)
        // setFormInfo(initialState)
    }


    const updateField = (event) => {
        // which input element is this
        const name = event.target.attributes.name.value
        if (name === "username") {
            setFormInfo({...formInfo, username: event.target.value})
        } else if (name === "password") {
            setFormInfo({...formInfo, password: event.target.value})
        }
    }

    return (
        <div className="UserSettingsPage">
            <section className="loginheader">
                <div className="MasterHeader">

                <DropDownMenu isLoggedIn = {loggedIn}></DropDownMenu>

                <ul>
                    <li> <a href="/">Home</a> </li>
                    <li><a href="/categories"> Categories </a> </li>
                    <li>
                    <MenuBarSearch></MenuBarSearch>
                </li>

                </ul>
              </div>
              <h1>User Settings</h1>

              {/* <div className="miniNavBar">
                  <ul>
                      <li> <a href="/userview">Profile</a> </li>
                      <li> <a className="active" href="/settings"> Settings</a> </li>
                      <li> <a href="/userdetails">Details</a> </li>
                  </ul>
              </div> */}
          </section>
          <section className="loginBox">
              <div className="formContainer">
                <br></br>
                  <form className="border" onSubmit={formHandler}>
                      <input
                          type="checkbox"
                          id="profanityFilter"
                          name="profanityFilter"
                          value="profanityFilter"
                      />
                    <label for="profanityFilter"> Filter profanity?</label>


                      {/* TODO: state updates on input change here */}
                      <fieldset className="passChangeFieldSet">
                      <legend>Password change</legend>
                          <input
                              className="input"
                              type="password"
                              placeholder="Old password"
                              name="oldPass"
                              
                          />
                          <input
                              className="input"
                              type="password"
                              placeholder="New password"
                              name="oldPass"
                        
                          />
                          <input
                              className="input"
                              type="password"
                              placeholder="New password retype"
                              name="oldPass"
                              
                          />
                      </fieldset>

                      <button className="appBtn" type="submit">
                          Save changes
                      </button>
                  </form>
              </div>
          </section>
      </div>
  )
}

export default UserSettings