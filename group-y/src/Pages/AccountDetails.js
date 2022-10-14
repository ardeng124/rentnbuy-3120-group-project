import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import DropDownMenu from "../Components/DropDownMenu";
import AxiosService from "../AxiosService"
import axios from "axios"
import MenuBarSearch from "../Components/MenuBarSearch";


const AccountDetails = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [userDetails, setUserDetails] = useState({_id: "", status: "", emailAddress: "", location: ""})
    const [currentStatus, setStatus] = useState("")
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
    const getUserDetails = () => {
       AxiosService.getUserDetails()
        .then(response => {          
          console.log("GET response", response)
          console.log("Response Data Is: ", response.data)
          setUserDetails(response.data)
        })
    }

    useEffect( () => {
        getUserDetails()     
      }, []);

    const navigate = useNavigate()
    const handleUserClicked = (event) => {
        console.log("clicked on user icon")
        navigate("/userview")
    }
    const formHandler = (event) => {
        event.preventDefault()
        console.log("Form submitted: ", userDetails)
        // setFormInfo(initialState)
    }

    const updateField = (event) => {
        // which input element is this
        const name = event.target.attributes.name.value
        if (name === "Email") {
            setUserDetails({ ...userDetails, emailAddress: event.target.value })
        } else if (name === "Address") {
        setUserDetails({ ...userDetails, location: event.target.value })
    }
    }

    const editAccountDetails = () => {
        AxiosService.editUserDetails(userDetails)
        .then(response => {
            console.log("Edit Response", response)
            setStatus("Successfully updated details")
            window.alert("Successfully updated details")
        })
    }
console.log(loggedIn)
    return (
        <div className="AccountDetailsPage">
            <section className="loginheader">
                <div className="MasterHeader">
                <DropDownMenu isLoggedIn = {loggedIn}></DropDownMenu>
                    <ul>
                        <li> <a href="/">Home</a> </li>
                        <li><a href="/categories"> Categories </a> </li>
                        <li> <a href="/search"> Search </a></li>
                        <li>
                                <MenuBarSearch></MenuBarSearch>
                            </li>
                    </ul>
                </div>
                <h1> {userDetails.username}'s Account Details</h1>

                {/* <div className="miniNavBar">
                    <ul>
                        <li> <a href="/userview">Profile</a> </li>
                        <li> <a href="/settings">Settings</a> </li>
                        <li> <a className="active" href="/userdetails">Details</a> </li>    
                    </ul>
                </div> */}
            </section>
            <section className="loginBox">
                <div className="formContainer">
                    <br></br>
                    <form className="border" onSubmit={formHandler}>
                        {/* TODO: state updates on input change here */}
                        <button
                            className="editUsrIconBtn"
                            onClick={() => console.log("update")}
                        />
                        <fieldset className="passChangeFieldSet">
                            {/* <input
                                className="input"
                                type="text"
                                placeholder={userDetails.username}
                                name="Username"
                                value={userDetails.username}
                                onChange={updateField}
                                disabled
                            /> */}
                            <input
                                className="input"
                                type="text"
                                placeholder={userDetails.emailAddress}
                                name="Email"
                                value={userDetails.emailAddress}
                                onChange={updateField}
                            />
                            <input
                                className="input"
                                type="text"
                                placeholder={userDetails.location}
                                name="Address"
                                value={userDetails.location}
                                onChange={updateField}
                            />
                        </fieldset>

                        <button className="appBtn" onClick={(editAccountDetails)}>
                            Update changes
                        </button>
                        <p className="statusEdits">{currentStatus}</p>
                    </form>
                </div>
            </section>
        </div>
    )
}

export default AccountDetails
