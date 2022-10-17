// Could use to refactor all this code.... But it is throwing an error in console 
//if we can fix this error this can be used...

import { useNavigate } from "react-router-dom"
import AxiosService from "../AxiosService"

const DropDownMenu = (props) => {
    const {isLoggedIn} = props
    const navigate = useNavigate()

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

     const handleLogInClicked = (event) => {
        console.log("clicked on user icon")
        navigate("/login")
    }

     if (isLoggedIn) {
         return (
             <div className='dropDownMaster'>
                 <li className='usrAccLi'> <button className='usrAccBtn' onClick={handleUserClicked}></button></li>
                 <div className="dropdownMenu">
                     <li className='dropDownLi'><a className='dropDownA' href='/settings'>Settings</a></li>
                     <li className='dropDownLi'><a className='dropDownA' href='/userdetails'>Edit details</a></li>
                     <li className='dropDownLi'><a className='dropDownA' href='/favourites'>Favourites</a></li>
                     <li className='dropDownLi'><a className='dropDownA' href='/notifications'>Notifications</a></li>
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