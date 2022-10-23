import React from 'react'

const CategoryItem = (props) => {
    const {name, isFollowing} = props
    const img = "https://i.stack.imgur.com/mwFzF.png"
  return (
    <div className='animationParent'>
    <div className='categoryItem'>
        <img className = 'searchImage' src={img}></img>
        <div className='rightContainer'>
            <h2 className='catItemP'> {name} </h2>
        </div>
        </div>
    </div>
  )
}

export default CategoryItem
