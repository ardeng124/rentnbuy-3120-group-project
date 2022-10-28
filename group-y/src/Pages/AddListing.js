import React, {useState, useEffect} from 'react'
import { useNavigate} from "react-router-dom"
import DropDownMenu from "../Components/DropDownMenu";
import AxiosService from '../AxiosService';

import {
    BrowserRouter as Router,
    Routes, Route, Link
  } from "react-router-dom"


import MenuBarSearch from '../Components/MenuBarSearch';
import AddListingForm from '../Components/AddListingForm';

const AddListing = () => {

    const [loggedIn, setLoggedIn] = useState(false)
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
      })

    }, [])
    
    const handleUserClicked = (event) => {
        navigate("/userview")
    }

    const createListing = (Listing) => {
        const file = Listing.img
        const listingToUpload = delete Listing.img
        AxiosService.createListing(Listing).then(response => {
            const id = response.data.id
            if(file) {
                AxiosService.uploadImageToListing(file,id).then(response => {
                    console.log(response)
                })
            }
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
                        <h1>Add a listing</h1>
                    </div>
                </section>
            <section className='addListingMain'>
                 <AddListingForm updateFn={createListing}></AddListingForm>
            </section>
    </div>
  )
}

export default AddListing

