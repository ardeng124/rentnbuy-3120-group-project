import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import FriendItemProfile from "../Components/FriendItemProfile";
import DropDownMenu from "../Components/DropDownMenu";
import AxiosService from "../AxiosService"
import MenuBarSearch from "../Components/MenuBarSearch.js";


const UserView = () => {
    const [loggedIn, setLoggedIn] = useState(false)

    const dummyInterests = ['Houses','Electronics','Random Categeory']
    const dummyFriends = ["Arden", "Anubhav", "Raffi","Nicholas"]
    const [userDetails, setUserDetails] = useState({status: "", firstname: "", lastName: "", username: "", emailAddress: "", location: ""})

    const getUserDetails = () => {
        AxiosService.getUserDetails()
         .then(response => {          
           console.log("GET response", response)
           console.log("Response Data Is: ", response.data)
           setUserDetails(response.data)
         })
     }

    useEffect( () => {
        AxiosService.validateToken()
        .then(response => {
            console.log(response)
            if(response == 'success'){
                setLoggedIn(true)
            } else {
                
            }
        })   
        getUserDetails()
      }, []);
 
    console.log (userDetails)
    return (
        <div className="UserViewPage">
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
              <h1> {userDetails.username}'s Profile</h1>
            </section>
            <section className="ProfileBox">
                <div className="ProfileColLarge">
                    <div className ="ProfileIconLarge"> </div>
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