import React, {useState, useEffect} from 'react'
import { useNavigate} from "react-router-dom"
import DropDownMenu from "../Components/DropDownMenu";
import AxiosService from '../AxiosService';

import {
    BrowserRouter as Router,
    Routes, Route, Link
  } from "react-router-dom"

import MenuBarSearch from '../Components/MenuBarSearch';
import OfferComponent from '../Components/OfferComponent';

const YourOffers = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [offers, setOffers] = useState([])
    const navigate = useNavigate()

    // const [convos, setConversations] = useState([])

    useEffect(() => {   
        AxiosService.validateToken()
        .then(response => {
            if(response == 'success'){
                setLoggedIn(true)
            // navigate("/")
            } else {
                navigate('/login')
            }
            AxiosService.getOffersByMe().then(response => {
                setOffers(response.data)
                console.log(response.data)
            })

      })

    }, [])
    
    const handleUserClicked = (event) => {
        console.log("clicked on user icon")
        navigate("/userview")
    }

    const denyOffer = () => {
        console.log("deny")
    }
    const approveOffer = () => {

        console.log("approve")
    }
        return (
            <div className="NotificationPage">
                <section className="loginheader">
                    <div className="MasterHeader">
                        <DropDownMenu isLoggedIn = {loggedIn}></DropDownMenu>
                        <ul>
                            
                            <li>
                                <a href="/">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="/categories">
                                    Categories
                                </a>
                            </li>
                            <li> <a href="/search"> Search </a></li>
                            <li>
                                <MenuBarSearch></MenuBarSearch>
                            </li>
                        </ul>
                        <h1>Your rent requests </h1>
                    </div>
                </section>
                <section className="notificationPagemainContent">
                    {offers.map(x => <OfferComponent senderName={x.offerMadeTo.username} dateFrom={x.startDate} dateTo={x.endDate} itemName={x.item.name} id={x.id} itemId={x.item.id} Status={x.status}></OfferComponent>)}
                </section>
            </div>
        )
    
}

export default YourOffers
