import React, {useState, useEffect} from 'react'
import { useNavigate} from "react-router-dom"
import DropDownMenu from "../Components/DropDownMenu";
import AxiosService from '../AxiosService';

import {
    BrowserRouter as Router,
    Routes, Route, Link
  } from "react-router-dom"

import MenuBarSearch from '../Components/MenuBarSearch';
import NotificationComponent from '../Components/NotificationComponent';

const Notifications = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [offers, setOffers] = useState([])
    const navigate = useNavigate()

    // const [convos, setConversations] = useState([])

    useEffect(() => {   
        AxiosService.validateToken()
        .then(response => {
            console.log(response)
            if(response == 'success'){
                setLoggedIn(true)
            // navigate("/")
            } else {
                navigate('/login')
            }
            AxiosService.getOffersToMe().then(response => {
                console.log(response)
                let arr = response.data
                
                arr = arr.filter(x => x.status == "Pending")
                console.log(arr)
                

                setOffers(arr)
            })

      })

    }, [])
    
    const handleUserClicked = (event) => {
        console.log("clicked on user icon")
        navigate("/userview")
    }

    const denyOffer = (id) => {
        AxiosService.offerStatus(id, "Denied").then(response => console.log(response))
        console.log("deny")
    }
    const approveOffer = (id) => {
        AxiosService.offerStatus(id, "Approved").then(response => console.log(response))
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
                        <h1>Your notifications </h1>
                    </div>
                </section>
                <section className="notificationPagemainContent">
                    {offers.map(x => <NotificationComponent senderName={x.offerMadeBy.username} dateFrom={x.startDate} dateTo={x.endDate} itemName={x.item.name} id={x.id} itemId={x.item.id} denyFn={denyOffer} approveFn={approveOffer}></NotificationComponent>)}
                </section>
            </div>
        )
    
}

export default Notifications
