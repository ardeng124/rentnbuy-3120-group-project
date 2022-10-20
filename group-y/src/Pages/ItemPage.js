import React, { useEffect, useState } from "react";
import {useNavigate,useParams, useLocation} from "react-router-dom"
import AxiosService from "../AxiosService";
import DropDownMenu from '../Components/DropDownMenu'
import MenuBarSearch from "../Components/MenuBarSearch";



const ItemPage = () => {
    const navigate = useNavigate()

    const [loggedIn, setLoggedIn] = useState(false)
    const initialState = {start: '', end: ''}
    const [formInfo, setFormInfo] = useState(initialState)
    const [reqStatus, setReqStatus] = useState("")

    const [itemAuthor, setAuthor] = useState([])
    const id = useParams().id
    const [itemDetails, setItemDetails] = useState({creatorId: "", price: "", rating: "", description: "", location: "",isAvailable:true, rentPrice:""})
    useEffect(() => {
        AxiosService.validateToken()
        .then(response => {
            if(response == 'success'){
                setLoggedIn(true)
            // navigate("/")
            }
      })
      //Get Item Details
      AxiosService.getItemDetails(id).then(response => {
        console.log(response.data.items[0])
        let arr = response.data.items[0]
        arr.price = "$"+( arr.price/100)
        setAuthor(response.data.usrObj)
        setItemDetails(response.data.items[0])
    }) 
    }, [])

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

    return (
        <div className="ItemPage">
        <section className="loginheader">
        <div className='MasterHeader'>
        <DropDownMenu isLoggedIn = {loggedIn}></DropDownMenu>

            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/categories"> Categories </a> </li>
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
            <img className='itemImg' src= "https://i.stack.imgur.com/mwFzF.png"/>
            <div className='itemInfoBox'> 
                <h2>{itemDetails.name}</h2>
        
                <h4>Price: {itemDetails.price}</h4>
                {/* todo: make this navigate to a user */}
                <h4 onClick={() => (navigate(`/userview/${itemAuthor.id}`))}> Author: {itemAuthor.username}</h4>
                <h4>Price to rent: {itemDetails.rentPrice} </h4>
                <h4>Rating - calculate average rating: {itemDetails.rating}</h4>
                <p>Description: {itemDetails.description}</p>
                <p>Features: </p>
                <p>Location: {itemDetails.location}</p>
                {itemDetails.isAvailable && <div> 
                    <form onSubmit={rentItem} className = "formContainer">
                
                <label htmlFor="start">Rent Period: </label>
                <li> From</li><input className="input1" type="date" id="start" name="start" min={new Date().toLocaleDateString('en-ca')} onChange={updateField} required/>
                <li>To</li><input className="input1" type="date" id="start" name="end" min={formInfo.start} onChange={updateField} required/>

            </form>
                    </div>}
                {itemDetails.isAvailable ?  <button className="appBtn" type='submit' onClick={rentItem}>Rent</button> : <button disabled className="btnReplacment">Unavailable</button>}
                <p>{reqStatus}</p>
            </div>
        </div>
        </div>
        </section>
        </div>
        )
}

export default ItemPage