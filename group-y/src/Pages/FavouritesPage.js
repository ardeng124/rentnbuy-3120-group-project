//Imports
import React, {useState, useEffect} from 'react'
import { useNavigate} from "react-router-dom"
import DropDownMenu from "../Components/DropDownMenu";
import AxiosService from '../AxiosService';
import MenuBarSearch from '../Components/MenuBarSearch';
import SearchResultItem from '../Components/SearchResultItem';

const FavouritesPage = () => {
    //Tracks Loggedin Status
    const [loggedIn, setLoggedIn] = useState(false)
    
    //Stores User Details
    const [userDetails, setUserDetails] = useState([])

    //Defining Navigate Function
    const navigate = useNavigate()

    //When the page is rendered, the user token is validated and if
    //a user is logged in their details are pulled
    useEffect(() => {   
        AxiosService.validateToken()
        .then(response => {
            if(response.status == 'success'){
                setLoggedIn(true)
            } else {
                navigate('/login')
            }
        })
        AxiosService.getUserDetails()
        .then(response => {          
            let arr = response.data.favourites
            arr.forEach(element => {
                element.description = element.description.substring(0, 250) + "..."
                element.price = "$".concat((element.price/100))
            });
          setUserDetails(arr)
        })
    }, [])

    /**
     * removes item from favourites
    **/
    const itemRemove= (id) => {
        AxiosService.modifyFavourite(id,"delete").then(response=> {
            if(response.status == "error"){
                window.alert("error removing favourite")
            } else {
            setUserDetails(response.data.favs)
            }
        })
    }
    
  return (
    <div className='favouritesPage'>
        <section className="loginheader">
            <div className="MasterHeader">
                <DropDownMenu isLoggedIn = {loggedIn}></DropDownMenu>
                <ul>
                    <li> <a href="/"> Home </a> </li>
                    <li> <a href="/categories"> Categories </a> </li>
                    <li> <a href="/addlisting"> Add Listing </a> </li>
                    <li> <a href="/search"> Search </a> </li>
                    <li> <MenuBarSearch></MenuBarSearch> </li>
                </ul>
                <h1>Your Favourites</h1>
            </div>
        </section>
        <section className='favouritesPageMainContent'>
            {userDetails.map(x => (
            <div className='FavItemDiv'>
                <SearchResultItem img={x.itemPhotoUrl} name={x.name} id={x.id} description={x.description} price = {x.price} category = {x.category} isAvailable={x.isAvailable}></SearchResultItem> 
                <div className='favPageButtonContainer'>
                <button onClick={() => itemRemove(x.id)} className='appBtnNotifDeny'>Remove</button>
                </div>
            </div>))}
        </section>
    </div>
  )
}

export default FavouritesPage