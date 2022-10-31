//Imports
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import DropDownMenu from "../Components/DropDownMenu";
import AxiosService from "../AxiosService"
import MenuBarSearch from "../Components/MenuBarSearch";


const AccountDetails = () => {

    //Logged in Status of the user is stored
    const [loggedIn, setLoggedIn] = useState(false)

    //Defined Navigate Functionality
    const navigate = useNavigate()
    
    //Details of the user is stored
    const [userDetails, setUserDetails] = useState({
        _id: "",
        status: "",
        emailAddress: "",
        location: "",
        profilePhoto:"https://i.stack.imgur.com/mwFzF.png"
    })

    //
    const [currentStatus, setStatus] = useState("")
    
    //Stores any uploaded images that will be used to update any current image
    const [imgUpdated, setImgUpdated] = useState(false)

    //Temporary URL
    const[tempUrl, setTempUrl] = useState("https://i.stack.imgur.com/mwFzF.png")
    
    //When the page is rendered the user token is validated
    useEffect(() => {
        AxiosService.validateToken()
           .then(response => {
             if(response.status == 'success'){
                setLoggedIn(true)
             } else {
                navigate("/")
             }
           })
    }, [])
    
    //User Details is pulled from the backend with this Axios Request
    const getUserDetails = () => {
        AxiosService.getUserDetails()
        .then(response => {          
            setUserDetails(response.data)
            if(!response.data.profilePhoto || response.data.profilePhoto == "" ) {
                setTempUrl("https://i.stack.imgur.com/mwFzF.png")
            } else {
                setTempUrl(response.data.profilePhoto)
            }
        })
    }

    //Run when the page is rendered, getting all the user details.
    useEffect( () => {
        getUserDetails()     
    }, []);
    
    //Form Handler to prevent default actions on events
    const formHandler = (event) => {
        event.preventDefault()
    }

    //Update field is called when the user makes changes to any inputs
    //in the account details form
    const updateField = (event) => {
        // Ensures the correct attribute is changed when the user is making inputs
        const name = event.target.attributes.name.value
        if (name === "Email") {
            setUserDetails({ ...userDetails, emailAddress: event.target.value })
        } else if (name === "Address") {
            setUserDetails({ ...userDetails, location: event.target.value })
        } else if (name === "img") {
            setImgUpdated(true)
            setUserDetails({...userDetails, profilePhoto: event.target.files[0]})
            setTempUrl(URL.createObjectURL(event.target.files[0]))
        }
    }

    //Allows the user to edit their account details
    const editAccountDetails = () => {
        AxiosService.editUserDetails(userDetails)
        .then(response => {
            setStatus("Successfully updated details")
            window.alert("Successfully updated details")
        })
        if(imgUpdated) {
            AxiosService.uploadImagetoUser(userDetails.profilePhoto, userDetails._id)
        }
    }

    //Acknowledges when an image is clicked on to trigger other events
    const imgClicked = (event) => {
        document.getElementById('file').click()
    }
    return (
        <div className="AccountDetailsPage">
            <section className="loginheader">
                <div className="MasterHeader">
                    <DropDownMenu isLoggedIn = {loggedIn}></DropDownMenu>
                    <ul>
                        <li> <a href="/">Home</a> </li>
                        <li> <a href="/categories"> Categories </a> </li>
                        <li> <a href="/addlisting"> Add Listing </a> </li>
                        <li> <a href="/search"> Search </a> </li>
                        <li> <MenuBarSearch></MenuBarSearch> </li>
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
                        {/* <button
                            className="editUsrIconBtn"
                            onClick={() => imgClicked()}
                        /> */}
                        {/* {userDetails.profilePhoto? <img className="editUsrIconBtn"  onClick={() => imgClicked()} src={userDetails.profilePhoto}/> : <img className='editUsrIconBtn'  onClick={() => imgClicked()} src= {tempUrl}/>} */}
                        <img className="editUsrIconBtn"  onClick={() => imgClicked()} src={tempUrl}/>
                        <input className ="hideMe" id="file" accept="image/jpeg,image/png" onChange={updateField} name="img" type="file" />

                        <fieldset className="passChangeFieldSet">
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
