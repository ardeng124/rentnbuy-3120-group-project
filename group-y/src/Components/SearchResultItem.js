import React from 'react'
import { useNavigate} from "react-router-dom"

/**
 * SearchResultItem: Used on the search page to wrap each search result
 */
const SearchResultItem = (props) => {
    const {name,price,description,category,id,isAvailable,img} = props

    const itemClicked = (id) => {
        navigate(`/item/${id}`)
    }
    const navigate = useNavigate()

    if(isAvailable){
        return (
            
            <div className='SearchResultContainer' >
                <div className='animationParent'>
            
                    <div className='searchResultItem'onClick={() => itemClicked(id)}>
                    {img ? <img className="searchImage" src={img}/> : <img className='searchImage' src= "https://i.stack.imgur.com/mwFzF.png"/>}

                    <div className='rightContainer'>
                        <li className='TopLineSearch'><span className='leftAlignItemSearchTitle'>{name}</span> <span className='rightAlignItemSearch'> {category}</span></li>

                        <li className='BottomLineSearch'> <span className='descSearchItem'>{description} </span><span className='rightAlignItemSearch'>{price}</span></li>
                    </div>
                </div>

            
                </div>
            </div>
        )
} else {
    return (
    <div className='SearchResultContainer' >
        <div className='disabledItemParent'>
        
            <div className='searchResultItemDisabled'onClick={() => itemClicked(id)}>
            {img ? <img className="searchImage" src={img}/> : <img className='searchImage' src= "https://i.stack.imgur.com/mwFzF.png"/>}
            <div className='rightContainer'>
                <li className='TopLineSearch'><span className='leftAlignItemSearchTitle'>{name}</span> Unavailable<span className='rightAlignItemSearch'> {category}</span></li>

                <li className='BottomLineSearch'> <span className='descSearchItem'>{description} </span><span className='rightAlignItemSearch'>{price}</span></li>
            </div>
         </div>

       
        </div>
    </div>
    )
}
}

export default SearchResultItem