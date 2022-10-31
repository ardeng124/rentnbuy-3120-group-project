//Imports
import React, {useState, useEffect} from 'react'
import {useNavigate,useParams, useLocation} from "react-router-dom"
import DropDownMenu from "../Components/DropDownMenu";
import AxiosService from '../AxiosService';
import MenuBarSearch from '../Components/MenuBarSearch';
import ModifyListingForm from '../Components/ModifyListingForm';

/**
 * Modifyitem: contains a form that allows a user to edit items the have created
 */
const ModifyItem = () => {
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

    //Allows functions to navigate to different web pages 
    const navigate = useNavigate()

    //When the page is rendered the token is validated and all the items
    //are pulled that are linked to the user
    useEffect(() => {
        AxiosService.validateToken()
        .then(response => {
            if(response.status == 'success'){
                setLoggedIn(true)
            } else {
                navigate("/")
            }
            AxiosService.getItemDetails(id)
            .then(response2 => {
                setItemDetails(response2.data.items[0])
                if(response.id !== response2.data.items[0].creatorId) {
                    navigate("/item/"+id)
                }
            }) 
        })
    }, [])

    //Function to allow a user to edit a listing
    const editListing = (Listing) => {
        const file = Listing.img
        const listingToUpload = delete Listing.img
        AxiosService.editListing(Listing, itemDetails.id).then(response => {
            if(file) {
                AxiosService.uploadImageToListing(file,itemDetails.id).then(response => {
                })
            }
            navigate("/item/"+itemDetails.id)
        })
    }

    //Function to allow a user to delete a listing
    const deleteListing = () => {
        AxiosService.deleteListing(itemDetails.id).then(response => {
            if(response == "error") {
                window.alert("error deleting item")
            } else {
                window.alert("Successfully deleted listing")
                navigate("/")
            }
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
                        <li> <a href="/search"> Search </a></li>
                        <li> <MenuBarSearch></MenuBarSearch> </li>
                    </ul>
                    <h1>Modify your listing</h1>
                </div>
            </section>
            <section className='ModListingMain'>
                    <ModifyListingForm updateFn={editListing} deleteFn = {deleteListing} inData={itemDetails}></ModifyListingForm>
            </section>
        </div>
    )
}

export default ModifyItem

