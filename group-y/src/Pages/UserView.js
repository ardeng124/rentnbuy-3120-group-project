import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import FriendItemProfile from "../Components/FriendItemProfile";
import DropDownMenu from "../Components/DropDownMenu";

const UserView = () => {
    
    const dummyInterests = ['Houses','Electronics','Random Categeory']
    const dummyFriends = ["Arden", "Anubhav", "Raffi","Nicholas"]

    return (
        <div className="UserViewPage">
            <section className="loginheader">
                <div className="MasterHeader">

                <DropDownMenu></DropDownMenu>

                  <ul>
                      <li> <a href="/">Home</a> </li>

                  </ul>
              </div>
              <h1>Your Profile</h1>
            </section>
            <section className="ProfileBox">
                <div className="ProfileColLarge">
                    <div className ="ProfileIconLarge"> </div>
                    <li className="ProfileName">Name</li>
                    <li className="ProfileName">Username</li>
                    <li> Email</li>
                    <li> Address</li>
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