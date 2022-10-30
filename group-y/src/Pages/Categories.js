import React, {useState, useEffect} from 'react'
import { useNavigate} from "react-router-dom"
import DropDownMenu from "../Components/DropDownMenu";
import AxiosService from '../AxiosService';


import MenuBarSearch from '../Components/MenuBarSearch';
import SearchResultItem from '../Components/SearchResultItem';
import CategoryItem from '../Components/CategoryItem';
const Categories = () => {

    const [loggedIn, setLoggedIn] = useState(false)
    const [categories, setCategories] = useState([])

    const navigate = useNavigate()
    useEffect(() => {   
        AxiosService.validateToken()
        .then(response => {
            if(response.status == 'success'){
                setLoggedIn(true)
            // navigate("/")
            
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

                            <li>
                                <a href="/">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a className='active' href="/categories">
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