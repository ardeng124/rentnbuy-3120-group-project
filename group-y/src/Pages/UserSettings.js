import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import DropDownMenu from "../Components/DropDownMenu";
import AxiosService from "../AxiosService"
import MenuBarSearch from "../Components/MenuBarSearch.js";

// var loggedIn = false;
const UserSettings = () => {

    const initialState = {
        username: localStorage.getItem('username'), 
        oldPassword: '', 
        newPassword: '', 
        repeatNewPassword: ''
    }

    const [passwordInfo, setPasswordInfo] = useState(initialState)

    const [currentStatus, setStatus] = useState("")

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

    
    const formHandler = (event) => {
        event.preventDefault()
        // console.log("Form submitted: ", passwordInfo)
        
    }



        const changePassword = () => {
            if (passwordInfo.newPassword === passwordInfo.repeatNewPassword) {
                console.log("Form submitted: ", passwordInfo)
                AxiosService.changeUserPassword(passwordInfo)
                .then(response => {
                    console.log("Edit Response", response)
                    setStatus("Successfully updated Password")
                    window.alert("Successfully updated Password")
                })
                .catch((e) => {
                    console.log("e", e)
                    if(e.response.status === 401) {
                        setStatus("Your Original Password is Incorrect")
                    }
                })

            } else {
                //Error Message
                setStatus("The new passwords do not match, try again!")
            }
        }


    const updateField = (event) => {
        // which input element is this
        const name = event.target.attributes.name.value
        if (name === "oldPass") {
            setPasswordInfo({...passwordInfo, oldPassword: event.target.value})
        } else if (name === "newPass") {
            setPasswordInfo({...passwordInfo, newPassword: event.target.value})
        } else if (name === "newPassCheck") {
            setPasswordInfo({...passwordInfo, repeatNewPassword: event.target.value})
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
                    <li><a href="/addlisting">Add Listing </a></li>
                    <li> <a href="/search"> Search </a></li>
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
                    <label htmlFor="profanityFilter"> Filter profanity?</label>


                      {/* TODO: state updates on input change here */}
                      <fieldset className="passChangeFieldSet">
                      <legend>Password change</legend>
                          <input
                              className="input"
                              type="password"
                              placeholder="Old password"
                              name="oldPass"
                              onChange={updateField}
                              
                          />
                          <input
                              className="input"
                              type="password"
                              placeholder="New password"
                              name="newPass"
                              onChange={updateField}
                        
                          />
                          <input
                              className="input"
                              type="password"
                              placeholder="New password retype"
                              name="newPassCheck"
                              onChange={updateField}
                              
                          />
                      </fieldset>

                      <button className="appBtn" onClick={(changePassword)} type="submit">
                          Save changes
                      </button>
                      <p className="statusEdits">{currentStatus}</p>
                  </form>
              </div>
          </section>
      </div>
  )
}

export default UserSettings