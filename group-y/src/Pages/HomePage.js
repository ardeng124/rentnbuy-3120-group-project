import React, {useState, useEffect} from 'react'
import { useNavigate} from "react-router-dom"
import DropDownMenu from "../Components/DropDownMenu";

import {
    BrowserRouter as Router,
    Routes, Route, Link
  } from "react-router-dom"
import NewestListingItem from '../Components/NewestListingItem';
  var loggedIn = true
  var token = localStorage.getItem('token') // Used to display the logout button if signed in if (token){" "}
//UNCOMMENT THIS
  // if (token) { 
//     loggedIn = true
// } else {
//     loggedIn = false
// }
const HomePage = () => {
    const navigate = useNavigate()

    // const [convos, setConversations] = useState([])

    const [error, setError] = useState(false)

    const handleUserClicked = (event) => {
        console.log("clicked on user icon")
        navigate("/userview")
    }
    
        return (
            <div className="HomePage">
                <section className="loginheader">
                    <div className="MasterHeader">
                        {loggedIn && <DropDownMenu></DropDownMenu>}

                        <ul>
                            <li>
                                <a href="/login">Login</a>
                            </li>
                            <li>
                                <a className="active" href="/">
                                    Home
                                </a>
                            </li>
                        </ul>
                        {loggedIn && (
                            <h1>Welcome {localStorage.getItem("username")}</h1>
                        )}
                        {!loggedIn && <h1>Welcome to RentNBuy</h1>}
                    </div>
                </section>
                <section className="homepageMainContent">
                    {loggedIn && (
                        <div className="homePageContainer">
                            <h3> Your Feed</h3>
                        </div>
                    )}
                    <div className="homePageContainer">
                        <h3> Newest Listings</h3>
                        <div className="itemContainer">
                           
                        </div>
                    </div>
                </section>
            </div>
        )
    
}

export default HomePage
