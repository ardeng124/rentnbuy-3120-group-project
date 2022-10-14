import React, { useEffect, useState } from "react";
import {useNavigate,useParams, useLocation} from "react-router-dom"
import AxiosService from "../AxiosService";
import DropDownMenu from '../Components/DropDownMenu'
import MenuBarSearch from "../Components/MenuBarSearch";


const ItemPage = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    const id = useParams().id
    console.log(id)
    useEffect(() => {   
        AxiosService.validateToken()
        .then(response => {
            console.log(response)
            if(response == 'success'){
                setLoggedIn(true)
            // navigate("/")
            }
      })
    })
    return (
        <div className="ItemPage">
        <section className="loginheader">
        <div className='MasterHeader'>
        <DropDownMenu isLoggedIn = {loggedIn}></DropDownMenu>

            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/categories"> Categories </a> </li>
                <li>
                    <MenuBarSearch></MenuBarSearch>
                </li>
            </ul>
            </div>
            <h1>Welcome to RentNBuy</h1>
        </section>
        <section className="itemPageMainContent">
        <div className='itemPageContainer'>
        <div className='topPageFlex'>
            <img className='itemImg' src= "https://i.stack.imgur.com/mwFzF.png"/>
            <div className='itemInfoBox'> 
                <h2>Title</h2>
        
                <h4>Price:</h4>
                <h4>Price to rent:</h4>
                <h4>Rating - calculate average rating</h4>
                <p>Description</p>
                <p>Features
               
                </p>
                <button className="appBtn">Rent</button>
            </div>
        </div>
        </div>
        </section>
        </div>
        )
}

export default ItemPage