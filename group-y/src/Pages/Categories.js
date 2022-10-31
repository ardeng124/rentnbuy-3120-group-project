//Imports
import React, {useState, useEffect} from 'react'
import DropDownMenu from "../Components/DropDownMenu";
import AxiosService from '../AxiosService';
import MenuBarSearch from '../Components/MenuBarSearch';
import CategoryItem from '../Components/CategoryItem';

const Categories = () => {

    //Stores the Logged In Status of the user
    const [loggedIn, setLoggedIn] = useState(false)

    //Stores all the categories
    const [categories, setCategories] = useState([])

    //When the page is rendered, the user token is validated and
    //all the categories are pulled and stored
    useEffect(() => {   
        AxiosService.validateToken()
        .then(response => {
            if(response.status == 'success'){
                setLoggedIn(true)
            }
        })
        AxiosService.getCategories().then(response => {
            setCategories(response.data)
        })
    }, [])

    return (
        <div className='categoriesPage'>
            <section className="loginheader">
                <div className="MasterHeader">
                    <DropDownMenu isLoggedIn = {loggedIn}></DropDownMenu>
                    <ul>
                        <li> <a href="/"> Home </a> </li>
                        <li> <a className='active' href="/categories"> Categories </a> </li>
                        <li> <a href="/addlisting"> Add Listing </a> </li>
                        <li> <a href="/search"> Search </a> </li>
                        <li> <MenuBarSearch></MenuBarSearch> </li>
                    </ul>
                    <h1>Categories</h1>
                </div>
            </section>
            <section className='categoriesPageMainContent'>
                {categories.map(x => <CategoryItem name={x.name}></CategoryItem>)}
            </section>
        </div>
    )
}

export default Categories