import React from 'react'

function NewestListingItem(props) {
    const { itemName } = props
    const { itemImg } = props
    const { itemDesc } = props  
    const modifiedDesc = itemDesc.substring(0, 40) + "..."

  return (
      <div className="newestListingItem">
          <div>
              <div className="NLRimagePlaceholder"></div>
          </div>
          <div className="leftNLR">
              <h3>{itemName}</h3>
              <p>{modifiedDesc}</p>
          </div>
      </div>
  )
}

export default NewestListingItem