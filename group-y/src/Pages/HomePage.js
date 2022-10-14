import React, {useState, useEffect} from 'react'
import { useNavigate} from "react-router-dom"
import DropDownMenu from "../Components/DropDownMenu";
import AxiosService from '../AxiosService';

import {
    BrowserRouter as Router,
    Routes, Route, Link
  } from "react-router-dom"
import NewestListingItem from '../Components/NewestListingItem';
import MenuBarSearch from '../Components/MenuBarSearch';

const HomePage = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    const navigate = useNavigate()

    // const [convos, setConversations] = useState([])

    const [error, setError] = useState(false)
    const [newListings, setListings] = useState([])
    useEffect(() => {   
        AxiosService.validateToken()
        .then(response => {
            console.log(response)
            if(response == 'success'){
                setLoggedIn(true)
            // navigate("/")
            }
      })
        AxiosService.getItems().then(response => {
            // console.log(response)
            let arr = response.slice(-8)
            arr = arr.reverse()
            setListings(arr)
            // console.log(response.data.items)
        })
    }, [])
    
    const handleUserClicked = (event) => {
        console.log("clicked on user icon")
        navigate("/userview")
    }
    const handleLoginButtonClicked = (event) => {
        navigate("/login")
    }

    const itemClicked = (id) => {
        navigate(`/item/${id}`)

    }
    
        return (
            <div className="HomePage">
                <section className="loginheader">
                    <div className="MasterHeader">
                        <DropDownMenu isLoggedIn = {loggedIn}></DropDownMenu>

                        <ul>
                            
                            <li>
                                <a className="active" href="/">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="/categories">
                                    Categories
                                </a>
                            </li>
                            <li>
                                <MenuBarSearch></MenuBarSearch>
                            </li>
                        </ul>
                        {loggedIn && (
                            <h1>Welcome {AxiosService.getUserName()}</h1>
                        )}
                        {!loggedIn && <h1>Welcome to RentNBuy</h1>}
                    </div>
                </section>
                <section className="homepageMainContent">
                    {!loggedIn && <p> You are browsing as a guest</p>}
                    {!loggedIn && <button className="appBtn" onClick={handleLoginButtonClicked}>Login</button>}

                    {loggedIn && (
                        <div className="homePageContainer">
                            <h3> Your Feed</h3>
                        </div>
                    )}
                    <div className="homePageContainer">
                        <h3> Newest Listings</h3>
                        <div className="itemContainer">
                            {newListings.map((x) => (
                                <NewestListingItem
                                    itemName={x.name}
                                    itemDesc={x.description}
                                    itemPrice={x.price}
                                    itemId = {x.id}
                                    ClickFunc = {() => itemClicked(x.id)}
                                ></NewestListingItem>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        )
    
}

export default HomePage
