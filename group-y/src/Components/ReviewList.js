import React from 'react';
import Review from './Review.js'

const ReviewList = ({review}) => {

  //Maps all the different attributes of the chat as needed
  return (
    <div>
      <ul>
        {review.map(R => <Review key={R.id} creator={R.creator} 
        text={R.text} timestamp={R.timestamp} conversationId={R.conversation} 
        messageId={R.id}/>)}  
      </ul> 
    </div>
  )
}

export default ReviewList