import React from 'react'

/**
 * FeedListingItem: Used on homepage to display details from rent requests made on items the current user has posted
 */
function FeedListingItem(props) {
    const { itemName } = props
    const {itemToRent} = props
    const { ClickFunc } = props  
    const {status} = props

        return (
          <section className='overallListingItemFeed'>
            <div className="newestListingItemFeed" onClick={ClickFunc} >
                <div>
                    <div className="NLRimagePlaceholder"></div>

                </div>
                <div className="leftNLR">
                    <h3>{itemName}</h3>
                    <p>Wants to rent <b>{itemToRent}</b></p>
                    <li><i>{status} </i></li>
                </div>
            </div>
            </section>
        )

    
}

export default FeedListingItem