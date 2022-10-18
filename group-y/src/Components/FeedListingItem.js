import React from 'react'

function FeedListingItem(props) {
    const { itemName } = props
    const {itemToRent} = props
    const { itemDesc } = props  

    const { ClickFunc } = props  
    const { isAvailable } = props  


        return (
          <section className='overallListingItemFeed'>
            <div className="newestListingItemFeed" onClick={ClickFunc} >
                <div>
                    <div className="NLRimagePlaceholder"></div>

                </div>
                <div className="leftNLR">
                    <h3>{itemName}</h3>
                    <p>Wants to rent <b>{itemToRent}</b></p>
                </div>
            </div>
            </section>
        )

    
}

export default FeedListingItem