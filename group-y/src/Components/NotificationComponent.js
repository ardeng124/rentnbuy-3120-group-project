import React from 'react'

const NotificationComponent = (props) => {
const {senderName, dateFrom,dateTo, itemName, id, itemId, denyFn, approveFn} = props

let dateTrimStart = dateFrom.slice(0,-14)
let dateTrimEnd = dateTo.slice(0,-14)

  return (
    <div className='NotificationItem'>
        <li>User <br></br> <b>{senderName}</b></li>
        <li>From <br></br> <b>{dateTrimStart}</b></li>
        <li>To <br></br><b>{dateTrimEnd}</b></li>
        <li>Item <br></br> <b>{itemName}</b></li>
        <div>
        <button className='appBtnNotif' onClick={() => approveFn(id)}>Approve</button>
        <button className='appBtnNotifDeny' onClick={() => denyFn(id)}>Deny</button>

        </div>
    </div>
  )
}

export default NotificationComponent