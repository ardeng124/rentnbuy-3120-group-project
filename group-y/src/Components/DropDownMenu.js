// Could use to refactor all this code.... But it is throwing an error in console 
//if we can fix this error this can be used...

import { useNavigate } from "react-router-dom"

function DropDownMenu() {

    const navigate = useNavigate()
    const handleUserClicked = (event) => {
        console.log("clicked on user icon")
        navigate("/userview")
    }

    return (
        <div className='dropDownMaster'>
            <li className='usrAccLi'> <button className='usrAccBtn' onClick={handleUserClicked}></button></li>
            <div className="dropdownMenu">
                <li className='dropDownLi'><a className='dropDownA' href='/userview'>Profile</a></li>
                <li className='dropDownLi'><a className='dropDownA' href='/settings'>Settings</a></li>
                <li className='dropDownLi'><a className='dropDownA' href='/userdetails'>Edit details</a></li>
                <li className='dropDownLi'><a className='dropDownA' href='/favourites'>Favourites</a></li>
            </div>
        </div>
    )
}

export default DropDownMenu