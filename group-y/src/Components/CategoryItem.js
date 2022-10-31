import React from 'react'
import {useNavigate} from "react-router-dom"

/**
 * 
 * CategoryItem: Displays category name with some padding
 */
const CategoryItem = (props) => {
    const {name, isFollowing} = props
    const img = "https://i.stack.imgur.com/mwFzF.png"
    const navigate = useNavigate()

  return (
    <div className='animationParent'>
    <div className='categoryItem' onClick={ () => navigate(`/categories/${name}`)}>
        {/* <img className = 'searchImage' src={img}></img> */}
        <div className='rightContainer'>
            <h2 className='catItemP'> {name} </h2>
        </div>
        </div>
    </div>
  )
}

export default CategoryItem
