import React from 'react'

const OfferComponent = (props) => {
const {senderName, dateFrom,dateTo, itemName, Status} = props
let dateTrimStart = dateFrom.slice(0,-14)
let dateTrimEnd = dateTo.slice(0,-14)

  return (
    <div className='OfferItem'>
        <li>Made To <br></br> <b>{senderName}</b></li>
        <li>From <br></br> <b>{dateTrimStart}</b></li>
        <li>To <br></br><b>{dateTrimEnd}</b></li>
        <li>Item <br></br> <b>{itemName}</b></li>
        <li>Status <br></br> <b>{Status}</b></li>

        <div>
    
        </div>
    </div>
  )
}

export default OfferComponent