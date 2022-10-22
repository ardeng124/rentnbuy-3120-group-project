import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import AxiosService from "../AxiosService"

/**
 * DropDownMenu: Contains the user icon: A button which takes the user to their profile, and a dropdown menu which contains various user related links 
 */
const DropDownMenu = (props) => {
    const {isLoggedIn} = props
    const navigate = useNavigate()
    const [profilePhoto, setProfilePhoto] = useState("")
    const handleUserClicked = (event) => {
        console.log("clicked on user icon")
        navigate("/userview")
    }
    //TODO: do something with the future axios file here
     const handleLogOut = (event) => {
        AxiosService.logOut()
            navigate("/")
            window.location.reload(false);
     }
     const getUserProfilePhoto = () => {
        AxiosService.getUserDetails()
         .then(response => {          
           console.log("GET response", response)
           console.log("Response Data Is: ", response.data)
           setProfilePhoto(response.data.profilePhoto)
         })
     }
     useEffect( () => {
        getUserProfilePhoto()     
      }, []);
     const handleLogInClicked = (event) => {
        console.log("clicked on user icon")
        navigate("/login")
    }

     if (isLoggedIn) {
         return (
             <div className='dropDownMaster'>
                <li className="userNamedisplay"> {localStorage.getItem("username")} </li>
                 <li className='usrAccLi'> <button className='usrAcctn' onClick={handleUserClicked}>
                 <img className="profilePhoto" src={profilePhoto}/>
                    </button></li>
                 <div className="dropdownMenu">
                     <li className='dropDownLi'><a className='dropDownA' href='/settings'>Settings</a></li>
                     <li className='dropDownLi'><a className='dropDownA' href='/userdetails'>Edit details</a></li>
                     <li className='dropDownLi'><a className='dropDownA' href='/favourites'>Favourites</a></li>
                     <li className='dropDownLi'><a className='dropDownA' href='/notifications'>Notifications</a></li>
                     <li className='dropDownLi'><a className='dropDownA' href='/offers'>Your offers</a></li>
                     <li className='dropDownLi'><button className="logOutBtn" onClick={(handleLogOut)}>Log out</button></li>
     
                 </div>
             </div>
         )

     } else {
        return(
        <div className='dropDownMaster'>
                 <li className='usrAccLi'> <button className='usrAccBtn2' onClick={handleLogInClicked}></button></li>
             </div>
     )}
}

export default DropDownMenu