import React from 'react'

function FeedListingItemOwn(props) {
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
                    <h3> Your reqeust to {itemName}</h3>
                    <p>for <b>{itemToRent}</b> is <i>{status}</i></p>
                </div>
            </div>
            </section>
        )

    
}

export default FeedListingItemOwn