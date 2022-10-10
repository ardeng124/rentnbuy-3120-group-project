import React from 'react'

const FriendItemProfile = (props) => {
    const {friendName} = props

    return <div className="FriendItemProfile">
        {/* image placeholder div */}
        <div className='friendListImg'></div>
        <p>{friendName}</p>
    </div>
}

export default FriendItemProfile