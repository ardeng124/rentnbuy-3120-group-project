import React, {useState, useEffect} from 'react'
import {useNavigate,useParams, useLocation} from "react-router-dom"
import DropDownMenu from "../Components/DropDownMenu";
import AxiosService from '../AxiosService';

import {
    BrowserRouter as Router,
    Routes, Route, Link
  } from "react-router-dom"


import MenuBarSearch from '../Components/MenuBarSearch';
import ModifyListingForm from '../Components/ModifyListingForm';

const ModifyItem = () => {
    const [itemAuthor, setAuthor] = useState([])
    const [currentUserId, setCurrentId] = useState("")
    const id = useParams().id
    const [itemDetails, setItemDetails] = useState({
        creatorId: "",
        price: "", 
        rating: "", 
        rentPrice:"",
        description: "", 
        location: "",
        isAvailable:true, 
        rentPrice:"",
        reviews:[]
    })

    const [loggedIn, setLoggedIn] = useState(false)
    const navigate = useNavigate()

    // const [convos, setConversations] = useState([])

    useEffect(() => {
        AxiosService.validateToken()
        .then(response => {
            if(response.status == 'success'){
                setLoggedIn(true)
                setCurrentId(response.id)
            // navigate("/")
            } else {
                navigate("/")
            }
            AxiosService.getItemDetails(id).then(response2 => {
              setAuthor(response2.data.usrObj)
              setItemDetails(response2.data.items[0])
              if(response.id !== response2.data.usrObj.id) {

                navigate("/item/"+id)
            }
          }) 
      })
    

    }, [])
    
    const handleUserClicked = (event) => {
        navigate("/userview")
    }

    const editListing = (Listing) => {
        const file = Listing.img
        const listingToUpload = delete Listing.img
        AxiosService.editListing(Listing, itemDetails.id).then(response => {
            if(file) {
                AxiosService.uploadImageToListing(file,itemDetails.id).then(response => {
                    console.log(response)
                })
            }
            navigate("/item/"+itemDetails.id)
        })
    }
    const deleteListing = () => {
        AxiosService.deleteListing(itemDetails.id).then(response => {
            window.alert("Successfully deleted listing")
            navigate("/")
        })
    }
    
  return (
    <div className='AddListingPage'>
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
                        <h1>Modify your listing</h1>
                    </div>
                </section>
            <section className='ModListingMain'>
                 <ModifyListingForm updateFn={editListing} deleteFn = {deleteListing}></ModifyListingForm>
            </section>
    </div>
  )
}

export default ModifyItem

