//Imports
import React, {useState, useEffect} from 'react'
import DropDownMenu from "../Components/DropDownMenu";
import AxiosService from '../AxiosService';
import SearchResultItem from '../Components/SearchResultItem';

/**
 * Search: Works by getting all items from database and then filtering what is shown to the user based on input 
 *
 */
const Search = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [itemsArr, setItemsArr] = useState([])
    const [searchVal, setSearchVal] = useState("")

     const filterItems = (items, query) => {
        if (!query) {
          return [] 
        }
        return itemsArr.filter((items) => {
          const itemName = items.name.toString().toLowerCase()

          return itemName.includes(query.toLowerCase()) 
        }) 
      }
    const filteredItems = filterItems(itemsArr, searchVal);

    useEffect(() => {   
        AxiosService.validateToken()
        .then(response => {
            if(response.status == 'success'){
                setLoggedIn(true)
            }
      })
        AxiosService.getItems().then(response => {
            let arr = response
            arr.forEach(element => {
                element.description = element.description.substring(0, 250) + "..."
                element.price = "$".concat((element.price/100))
            });
            setItemsArr(arr)
        })
    }, [])
    
    const handleSubmit = (event) => {
        event.preventDefault()
    }
    
    return (
        <div className="SearchPage">
            <section className="loginheader">
                <div className="MasterHeader">
                    <DropDownMenu isLoggedIn = {loggedIn}></DropDownMenu>
                    <ul>
                        <li> <a href="/"> Home </a> </li>
                        <li> <a href="/categories"> Categories </a> </li>
                        <li> <a href="/addlisting">Add Listing </a> </li>
                        <li> <a className="active" href="/search"> Search </a> </li>
                    </ul>
                </div>
            </section>
            <section className='mainSearchContent'>
                <div className='searchBoxContainer'>
                    <form  className = 'searchFormObject' onSubmit={handleSubmit}>
                        <input
                            type="text"
                            id="header-search"
                            placeholder="Search for an item"
                            className="searchFormInput"
                            value = {searchVal} onChange={(e) => {setSearchVal(e.target.value)}}
                        />
                    </form>
                    {filteredItems.map(x => (<SearchResultItem img={x.itemPhotoUrl} name={x.name} id={x.id} description={x.description} price = {x.price} category = {x.categoryId} isAvailable={x.isAvailable}></SearchResultItem>))}
                </div>
            </section>
        </div>
    )
}

export default Search