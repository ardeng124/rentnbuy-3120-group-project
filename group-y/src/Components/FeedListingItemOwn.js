import React from 'react'

/**
 * FeedListingItemOwn: Used on homepage to display details from rent requests the current user has made
 */
function FeedListingItemOwn(props) {
    const { itemName } = props
    const {itemToRent} = props
    const { ClickFunc } = props  
    const {status} = props
    const {img} = props
    console.log(img)
        return (
          <section className='overallListingItemFeed'>
            <div className="newestListingItemFeed" onClick={ClickFunc} >
                <div>
                    {img ? <img className="NLRimagePlaceholder" src={img}/> : <img className='NLRimagePlaceholder' src= "https://i.stack.imgur.com/mwFzF.png"/>}
                </div>
                <div className="leftNLR">
                    <h3> Your offer to {itemName}</h3>
                    <p>for <b>{itemToRent}</b> is <i>{status}</i></p>
                </div>
            </div>
            </section>
        )

    
}

export default FeedListingItemOwn