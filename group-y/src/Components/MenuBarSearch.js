import React, {useState, useEffect} from 'react'
import { useNavigate} from "react-router-dom"
import DropDownMenu from "../Components/DropDownMenu";
import AxiosService from '../AxiosService';


const MenuBarSearch = (props) => {
    const navigate = useNavigate()

    const {items} = props
    const [itemsArr, setItemsArr] = useState([])
    const [searchVal, setSearchVal] = useState("")
    const [focus, setFocus] = useState(false)
    // const filterItems = (items, query) => {
    //     if (!query) {
    //       return items 
    //     }
    //     return itemsArr.filter((items) => {
    //       const itemName = items.toString()
    //       return itemName.includes(query) 
    //     }) 
    //   }
    // const filteredItems = filterItems(itemsArr, searchVal);
    const handleSubmit = (event) => {
        event.preventDefault()
        AxiosService.searchItems(searchVal).then(response => {
            console.log(response.data.items)
            let arr = (response.data.items).slice(-10)
            setItemsArr(arr)
        })
    }
   
    const itemClicked = (id) => {
        navigate(`/item/${id}`)

    }
  return (
    <section className='menuSearchMaster'>
    <div className='MenuBarSearch'>
        <form  className = 'searchFormObject' onSubmit={handleSubmit}>
            <input
            type="text"
            id="header-search"
            placeholder="Search for an item"
            className="searchFormInput"
            onFocus={() =>setFocus(true)}
            onBlur={() =>setFocus(false)}
            value = {searchVal} onChange={(e) => {setSearchVal(e.target.value); setFocus(true)}}
            />
    </form>
  </div>
  {/* {focus && */}
    <ul className='searchResults'>
        {itemsArr.map(x=> (<li key = {x.id} className='searchResultItemMenu'> <a href=""onClick={() =>itemClicked(x.id)} className ="srcItem" >{x.name}</a></li>))}
        <li className='seeMoreBtn'><a href="/search"> See more </a></li>
    </ul>
    {/* } */}
    </section>
  )
}

export default MenuBarSearch