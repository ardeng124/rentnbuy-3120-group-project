//Imports
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import FriendItemProfile from "../Components/FriendItemProfile";
import DropDownMenu from "../Components/DropDownMenu";
import AxiosService from "../AxiosService"
import MenuBarSearch from "../Components/MenuBarSearch.js";


const UserView = () => {
    //Check if the user is logged in
    const [loggedIn, setLoggedIn] = useState(false)

    //Temporary Fields
    const dummyInterests = ['Houses','Electronics','Random Categeory']
    
    //Temporary Fields
    const dummyFriends = ["Arden", "Anubhav", "Raffi", "Nicholas"]
    
    //Used to hold the user details in the front end
    const [userDetails, setUserDetails] = useState({status: "", firstname: "", lastName: "", username: "", emailAddress: "", location: ""})

    //Function to get the user details from the backend
    const getUserDetails = () => {
        AxiosService.getUserDetails()
        .then(response => {          
           setUserDetails(response.data)
        })
    }

    //Validates the user token when the page is rendered
    useEffect( () => {
        AxiosService.validateToken()
        .then(response => {
            if(response.status == 'success'){
                setLoggedIn(true)
            }
        })   
        getUserDetails()
      }, []);
 
    return (
        <div className="UserViewPage">
            <section className="loginheader">
                <div className="MasterHeader">
                    <DropDownMenu isLoggedIn = {loggedIn}></DropDownMenu>
                    <ul>
                        <li> <a href="/">Home</a> </li>
                        <li><a href="/categories"> Categories </a> </li>
                        <li><a href="/addlisting">Add Listing </a></li>
                        <li> <a href="/search"> Search </a></li>
                        <li> <MenuBarSearch></MenuBarSearch> </li>
                    </ul>
                </div>
                <h1> {userDetails.username}'s Profile</h1>
            </section>
            <section className="ProfileBox">
                <div className="ProfileColLarge">
                    {/* <div className ="ProfileIconLarge"> </div> */}
                    {userDetails.profilePhoto ? <img className="ProfileIconLarge" src={userDetails.profilePhoto}/> : <img className='ProfileIconLarge' src= "https://i.stack.imgur.com/mwFzF.png"/>}

                    <li className="ProfileName">Name: {userDetails.firstName} {userDetails.lastName} </li>
                    <li className="ProfileName">Username: {userDetails.username}</li>
                    <li> Email: {userDetails.emailAddress}</li>
                    <li> Address: {userDetails.location}</li>
                </div>
                <div className="ProfileColMin">
                    <h3>Interests</h3>
                    {dummyInterests.map(x=> <li className="ProfileInterestLi"> <a href="#">{x}</a></li>)}
                </div>
                <div className="ProfileColMin">
                    <h3>Friends</h3>
                    {dummyFriends.map(x=> <FriendItemProfile friendName={x}></FriendItemProfile>)}
                </div>
            </section>
        </div>
    )
}

export default UserView