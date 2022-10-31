import React, { useEffect, useState } from "react";
import {useNavigate,useParams, useLocation} from "react-router-dom"
import AxiosService from "../AxiosService";
import DropDownMenu from '../Components/DropDownMenu'
import MenuBarSearch from "../Components/MenuBarSearch";
import ChatWindow from "../Components/ReviewWindows.js"
import Rating from '@mui/material/Rating';

import StarIcon from '@mui/icons-material/Star';


const ItemPage = () => {
    const navigate = useNavigate()

    const [loggedIn, setLoggedIn] = useState(false)
    const [isFavourited, setFavourited] = useState(false)

    const initialState = {start: '', end: ''}
    const [formInfo, setFormInfo] = useState(initialState)
    const [reqStatus, setReqStatus] = useState("")
    const [userDetails, setUserDetails] = useState("")

    const [itemAuthor, setAuthor] = useState([])
    const id = useParams().id
    const [itemDetails, setItemDetails] = useState({
        creatorId: "",
        price: "", 
        rating: "", 
        description: "", 
        location: "",
        isAvailable:true, 
        rentPrice:"",
        reviews:[]
    })

    useEffect(() => {
        AxiosService.validateToken()
        .then(response => {
            if(response.status == 'success'){
                setLoggedIn(true)
                setUserDetails(response)
            // navigate("/")
            }
      })
      //Get Item Details
      
      AxiosService.getItemDetails(id).then(response => {
        let arr = response.data.items[0]
        arr.price = "$"+( arr.price/100)
        arr.rentPrice = "$"+( arr.rentPrice/100)

        setAuthor(response.data.usrObj)
        if(response.data.isFavourited != undefined) {
            setFavourited(true)
        }
        setItemDetails(response.data.items[0])
    }) 
}, [])

    const calculateAverageRating = () => {
        let avgRating = 0 
        let sum = 0
        let len = 0
        itemDetails.reviews.forEach(x => {
            if(x.stars) {
                len ++
                sum += x.stars
            }
        })
        avgRating = sum/len
        if(!avgRating) {
            avgRating = ""
        }
        return avgRating
    }
    const rentItem = (event) => {
        event.preventDefault()
        const rentRequest = {
            "startDate":formInfo.start,
            "endDate":formInfo.end,
            itemId:id
        }
        AxiosService.rentAnItem(rentRequest).then(response => {

            if(response.status == 201) {
                setReqStatus("Successfully sent request")
            } 
            if(response=="error"){
                window.alert("Please enter both a start and end date")
            }
              
        })
    }

    const updateField = (event) => {
        // which input element is this
        const name = event.target.attributes.name.value
        if (name === "start") {
            setFormInfo({...formInfo, start: event.target.value})
        } else if (name === "end") {
            setFormInfo({...formInfo, end: event.target.value})
        }

    }

    const addFavourite = (id) => {
        AxiosService.modifyFavourite(id,"add").then(response=> {
            if(response.status == "error"){
                window.alert("error adding favourite")
            } else {
            setFavourited(true)
            }
        })
    }

    const removeFavourite = (id) => {
        AxiosService.modifyFavourite(id,"delete").then(response=> {
            if(response.status == "error"){
                window.alert("error adding favourite")
            } else {
            setFavourited(false)
            }
        })
    }

        

    return (
        <div className="ItemPage">
        <section className="loginheader">
        <div className='MasterHeader'>
        <DropDownMenu isLoggedIn = {loggedIn}></DropDownMenu>

            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/categories"> Categories </a> </li>
                <li><a href="/addlisting">Add Listing </a></li>
                <li> <a href="/search"> Search </a></li>
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
        {itemDetails.itemPhotoUrl ? <img className="itemImg" src={itemDetails.itemPhotoUrl}/> : <img className='itemImg' src= "https://i.stack.imgur.com/mwFzF.png"/>
}

            <div className='itemInfoBox'> 
            { userDetails.id === itemDetails.creatorId &&  <button className="appBtnEdit" onClick={() => navigate("/editItem/"+itemDetails.id)}>Modify Listing</button>}
                <h2>{itemDetails.name}</h2>
                <section className="group1">
                <h4 className="categoryTitle" onClick = {() => navigate(`/categories/${itemDetails.categoryId}`)}>Category: {itemDetails.categoryId}</h4>
                <h4> Author: {itemAuthor.username}</h4>
                {/* <h4 onClick={() => (navigate(`/userview/${itemAuthor.id}`))}> Author: {itemAuthor.username}</h4> */}
                </section>
                <section className="group2">

                <h4>Price: {itemDetails.price}</h4>

                {/* todo: make this navigate to a user */}
                <h4>Price to rent: {itemDetails.rentPrice} </h4> 
                </section>
                {calculateAverageRating() && <h4>Average rating - 
                 <Rating name="text-feedback" value={calculateAverageRating()} readOnly label="Rating" precision={0.25} size="large" 
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />} /> {calculateAverageRating()} </h4>}
                <p>Description: {itemDetails.description}</p>
                <p>Location: {itemDetails.location}</p>
                {loggedIn ? <div>
                {isFavourited ? <button onClick={() => removeFavourite(itemDetails.id)} className="appBtnFavRemove">Remove Favourite</button> : <button className="appBtnFav" onClick={() => addFavourite(itemDetails.id)}>Favourite</button>}
                    </div> : <h5> Log in or create an account to rent</h5>}


            {( userDetails.id != itemAuthor.id) && <div> 
                        
                {itemDetails.isAvailable && <div>
                    {loggedIn && <section className="rentFunctions"> 
                    {loggedIn && <form onSubmit={rentItem} className = "formContainer">
                        <label htmlFor="start">Rent Period: </label>
                        <div className="flexContainerForm">
                            
                        <fieldset>
                        <li> From</li>
                        <input className="input1" type="date" id="start" name="start" min={new Date().toLocaleDateString('en-ca')} onChange={updateField} required/>

                        </fieldset>
                        <fieldset>
                        <li>To</li>
                        <input className="input1" type="date" id="start" name="end" min={formInfo.start} onChange={updateField} required/>
                        </fieldset>
                        </div>
                    </form>}

                {loggedIn && <div>
                {itemDetails.isAvailable ?  <button className="appBtn" type='submit' onClick={rentItem}>Rent</button> : <button disabled className="btnReplacment">Unavailable</button>}
                     </div>}
                    </section>} </div>}
                <p>{reqStatus}</p>
                        </div>}
                    {!itemDetails.isAvailable &&  <button disabled className="btnReplacment">Unavailable</button>}
            {/* { userDetails.id == itemAuthor.id && <p className="availabilityDisplay"> Currently Available: {itemDetails.isAvailable.toString()}</p>} */}
            </div>
        </div>

        <ChatWindow inCurrentUser = {localStorage.getItem("username")} loggedIn = {loggedIn} isOwner ={ userDetails.id == itemAuthor.id} id = {itemDetails.id} reviewIn={itemDetails.reviews}></ChatWindow>

        </div>
        </section>
        </div>
        )
}

export default ItemPage