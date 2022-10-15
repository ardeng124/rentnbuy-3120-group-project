import React from 'react'
import { useNavigate} from "react-router-dom"

const SearchResultItem = (props) => {

    const {name,price,description,category,id} = props


    const img = "https://i.stack.imgur.com/mwFzF.png"

    const itemClicked = (id) => {
        navigate(`/item/${id}`)
    }
    const navigate = useNavigate()

  return (
    
    <div className='SearchResultContainer' >
        <div className='animationParent'>
        <div className='searchResultItem'onClick={() => itemClicked(id)}>
            <img className = 'searchImage' src={img}></img>
            <div className='rightContainer'>
                <li className='TopLineSearch'><span className='leftAlignItemSearchTitle'>{name}</span> <span className='rightAlignItemSearch'> {category}</span></li>

                <li className='BottomLineSearch'> <span className='descSearchItem'>{description} </span><span className='rightAlignItemSearch'>{price}</span></li>
            </div>
        </div>
        </div>
    </div>
  )
}

export default SearchResultItem