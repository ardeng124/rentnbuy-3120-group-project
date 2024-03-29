import React, {useState, useEffect} from 'react'
import { useNavigate} from "react-router-dom"
import DropDownMenu from "../Components/DropDownMenu";
import AxiosService from '../AxiosService';
import NewestListingItem from '../Components/NewestListingItem';
import MenuBarSearch from '../Components/MenuBarSearch';
import FeedListingItem from '../Components/FeedListingItem';
import FeedListingItemOwn from '../Components/FeedListingItemOwn';

const HomePage = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    const navigate = useNavigate()

    // const [convos, setConversations] = useState([])

    const [error, setError] = useState(false)
    const [offers, setOffers] = useState([])
    const [yourOffers, setYourOffers] = useState([])

    const [newListings, setListings] = useState([])
    useEffect(() => {   
        AxiosService.validateToken()
        .then(response => {
            if(response.status == 'success'){
                setLoggedIn(true)
            }
      })
        AxiosService.getItems().then(response => {
            let arr = response
            arr = arr.slice(-9)
            arr = arr.reverse()
            setListings(arr)
        })
        AxiosService.getOffersToMe().then(response => {
            let arr = response.data
            arr = arr.slice(-4)
            setOffers(arr)
        })
        AxiosService.getOffersByMe().then(response => {
            let arr = response.data
            arr = arr.slice(-4)
            setYourOffers(arr)
        })
    }, [])
    
    const handleUserClicked = (event) => {
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
                                <a href="/addlisting">
                                    Add Listing
                                </a>
                            </li>
                            <li> <a href="/search"> Search </a></li>
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
                            <div className="itemContainer">
                            {offers.map(x=> 
                                <FeedListingItem
                                    itemName={x.offerMadeBy.username}
                                    itemToRent={x.item.name}
                                    itemPrice={x.rentPrice}
                                    ClickFunc = {() => navigate("/notifications")}
                                    status ={x.status}
                                    img={x.item.itemPhotoUrl}
                                ></FeedListingItem>)}
                                {yourOffers && yourOffers.map(x=><FeedListingItemOwn
                                    itemName={x.offerMadeTo.username}
                                    itemToRent={x.item.name}
                                    itemPrice={x.rentPrice}
                                    ClickFunc = {() => navigate("/offers")}
                                    status ={x.status}
                                    img={x.item.itemPhotoUrl}
                                ></FeedListingItemOwn>)}
                        </div>
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
                                    isAvailable={x.isAvailable}
                                    ClickFunc = {() => itemClicked(x.id)}
                                    img = {x.itemPhotoUrl}

                                ></NewestListingItem>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        )
    
}

export default HomePage
