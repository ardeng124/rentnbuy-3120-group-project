import React from 'react'

/**
 * FriendItemProfile: Used on profile page to display friends of the user
 */
const FriendItemProfile = (props) => {
    const {friendName} = props

    return <div className="FriendItemProfile">
        {/* image placeholder div */}
        <div className='friendListImg'></div>
        <p>{friendName}</p>
    </div>
}

export default FriendItemProfile