import React from 'react'

const OfferComponent = (props) => {
const {senderName, dateFrom,dateTo, itemName, Status} = props
let dateTrimStart = dateFrom.slice(0,-14)
let dateTrimEnd = dateTo.slice(0,-14)

switch (Status){
    case "Approved":
        return(
            <div className='OfferItemApproved'>
                <li className='offerItemLi'>Made To <br></br> <b>{senderName}</b></li>
                <li className='offerItemLi'>From <br></br> <b>{dateTrimStart}</b></li>
                <li className='offerItemLi'>To <br></br><b>{dateTrimEnd}</b></li>
                <li className='offerItemLi'>Item <br></br> <b>{itemName}</b></li>
                <li className='offerItemLi'>Status <br></br> <b>{Status}</b></li>
        
                <div>
            
                </div>
            </div>
        )

    case "Pending":
        return (
            <div className='OfferItem'>
                <li className='offerItemLi'>Made To <br></br> <b>{senderName}</b></li>
                <li className='offerItemLi'>From <br></br> <b>{dateTrimStart}</b></li>
                <li className='offerItemLi'>To <br></br><b>{dateTrimEnd}</b></li>
                <li className='offerItemLi'>Item <br></br> <b>{itemName}</b></li>
                <li className='offerItemLi'>Status <br></br> <b>{Status}</b></li>
        
                <div>
            
                </div>
            </div>
          )

    case "Denied":
        return (
            <div className='OfferItemDenied'>
                <li className='offerItemLi'>Made To <br></br> <b>{senderName}</b></li>
                <li className='offerItemLi'>From <br></br> <b>{dateTrimStart}</b></li>
                <li className='offerItemLi'>To <br></br><b>{dateTrimEnd}</b></li>
                <li className='offerItemLi'>Item <br></br> <b>{itemName}</b></li>
                <li className='offerItemLi'>Status <br></br> <b>{Status}</b></li>
        
                <div>
            
                </div>
            </div>
          )
    break
}
  
}

export default OfferComponent