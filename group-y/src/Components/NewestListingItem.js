import React from 'react'

function NewestListingItem(props) {
    const { itemName } = props
    const { itemImg } = props
    const { itemDesc } = props  
    const { itemPrice } = props  

    let modifiedDesc = ""
    if (typeof itemDesc !== "undefined") {
        modifiedDesc = itemDesc.substring(0, 55) + "..."
    }
    let modifiedPrice = ""
    if (typeof itemPrice !== "undefined") {
        modifiedPrice = "$"+itemPrice
    }

  return (
      <div className="newestListingItem">
          <div>
              <div className="NLRimagePlaceholder"></div>
              <p>
                  <em>{modifiedPrice}</em>
              </p>
          </div>
          <div className="leftNLR">
              <h3>{itemName}</h3>
              <p>{modifiedDesc}</p>
          </div>
      </div>
  )
}

export default NewestListingItem