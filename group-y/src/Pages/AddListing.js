//Imports
import React, {useState, useEffect} from 'react'
import {useNavigate} from "react-router-dom"
import DropDownMenu from "../Components/DropDownMenu";
import AxiosService from '../AxiosService';
import MenuBarSearch from '../Components/MenuBarSearch';
import AddListingForm from '../Components/AddListingForm';

const AddListing = () => {

    //Status of a logged in user is stored
    const [loggedIn, setLoggedIn] = useState(false)

    //Defining the Navigiation Functionality
    const navigate = useNavigate()

    //When the page is rendered the user token is validated
    useEffect(() => {   
        AxiosService.validateToken()
        .then(response => {
            if(response.status == 'success'){
                setLoggedIn(true)
            } else {
                navigate('/login')
            }
      })
    }, [])

    //Function that is used by the user to create a listing
    const createListing = (Listing) => {
        const file = Listing.img
        const listingToUpload = delete Listing.img
        AxiosService.createListing(Listing).then(response => {
            const id = response.data.id
            if(file) {
                AxiosService.uploadImageToListing(file,id).then(response2 => {
                })
            }
            navigate('/item/'+response.data.id)
        })
    }
    
    return (
        <div className='AddListingPage'>
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

