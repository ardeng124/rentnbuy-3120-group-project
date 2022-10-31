//Imports
import React, {useState, useEffect} from 'react'
import { useNavigate} from "react-router-dom"
import DropDownMenu from "../Components/DropDownMenu";
import AxiosService from '../AxiosService';
import MenuBarSearch from '../Components/MenuBarSearch';
import NotificationComponent from '../Components/NotificationComponent';

/**
 * Notifcations page:
 * Displays all rent requests made to items the user owns
 */
const Notifications = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [offers, setOffers] = useState([])
    const navigate = useNavigate()

    //When the page is rendered, the users token is validated and all 
    //of the offers linked to the user will be pulled
    useEffect(() => {   
        AxiosService.validateToken()
        .then(response => {
            if(response.status == 'success'){
                setLoggedIn(true)
            // navigate("/")
            } else {
                navigate('/login')
            }
            AxiosService.getOffersToMe().then(response => {
                let arr = response.data
                arr = arr.filter(x => x.status == "Pending")                
                setOffers(arr)
            })
      })
    }, [])
    
    //Function to deny a offer
    //Makes an Axios request to update the offer status
    const denyOffer = (id) => {
        AxiosService.offerStatus(id, "Denied").then(response => console.log(response))
    }

    //Function to approve a offer
    //Makes an Axios request to update the offer status
    const approveOffer = (id) => {
        AxiosService.offerStatus(id, "Approved").then(response => console.log(response))
    }
        
    return (
        <div className="NotificationPage">
            <section className="loginheader">
                <div className="MasterHeader">
                    <DropDownMenu isLoggedIn = {loggedIn}></DropDownMenu>
                    <ul>
                        <li> <a href="/"> Home </a> </li>
                        <li> <a href="/categories"> Categories </a> </li>
                        <li> <a href="/addlisting">Add Listing </a> </li>
                        <li> <a href="/search"> Search </a></li>
                        <li> <MenuBarSearch></MenuBarSearch> </li>
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
