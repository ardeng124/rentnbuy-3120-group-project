import React from 'react'

/**
 * NewestListingItem: Used on homepage to show the latest listings
 * Style differs depending on whether the listing is available or not
 */
function NewestListingItem(props) {
    const { itemName } = props
    const { itemDesc } = props  
    const { itemPrice } = props  
    const { ClickFunc } = props  
    const { isAvailable } = props  
    const { img } = props  


    let modifiedDesc = ""
    if (typeof itemDesc !== "undefined") {
        modifiedDesc = itemDesc.substring(0, 55) + "..."
    }
    let modifiedPrice = ""
    if (typeof itemPrice !== "undefined") {
        modifiedPrice = "$"+(itemPrice/100)
    }
    let modifiedName = itemName
    if(itemName.length > 30) {
        modifiedName = itemDesc.substring(0, 30) + "..."

    }

    if(!isAvailable) {
        return(
            <section className='overallListingItem'>
            <div className="newestListingItemDisabled" onClick={ClickFunc} >
                <div>
                    {/* <div className="NLRimagePlaceholder"></div> */}
                    {img ? <img className="NLRimagePlaceholder" src={img}/> : <img className='NLRimagePlaceholder' src= "https://i.stack.imgur.com/mwFzF.png"/>}

                    <p>
                        <em>{modifiedPrice}</em>
                    </p>
                    <b className = 'unavText'>Unavailable</b>
                </div>
                <div className="leftNLR">
                    <h3>{modifiedName}</h3>
                    <p>{modifiedDesc}</p>

                </div>
            </div>
            </section>
        )
    } else{
        return (
          <section className='overallListingItem'>
            <div className="newestListingItem" onClick={ClickFunc} >
                <div>
                {img ? <img className="NLRimagePlaceholder" src={img}/> : <img className='NLRimagePlaceholder' src= "https://i.stack.imgur.com/mwFzF.png"/>}
                    <p>
                        <em>{modifiedPrice}</em>
                    </p>
                </div>
                <div className="leftNLR">
                    <h3>{modifiedName}</h3>
                    <p>{modifiedDesc}</p>
                </div>
            </div>
            </section>
        )

    }
}

export default NewestListingItem