//Imports
import React, { useEffect, useState } from "react";
import ReviewForm from "./ReviewForm.js";
import Review from "./Review.js";

import AxiosService from "../AxiosService";
/**
 * 
 * ChatWindow: displays all reviews for an item and includes a form if the user is logged in to add their own
 */
const ChatWindow = (props) => {
    const {id, reviewIn, isOwner, loggedIn, inCurrentUser} = props
    const [reviews, setReview] = useState([])
    useEffect(() => {
        setReview(reviewIn)
    }, [reviewIn])
    const createNewReview = (formInfo) => {
        const dataToPost = {
            stars:formInfo.stars,
            text:formInfo.text,
            itemId: id
        }
        AxiosService.postReview(dataToPost)
        .then(response => {
            setReview([...reviews,response.data])
        })
    }
  const removeItem = (Inid) => {
    let arr = reviews.filter(x => x.id!== Inid)
    AxiosService.removeComment(arr,id,Inid).then(response => {
      setReview(response.data.reviews)
    })
  }
  return (
    <div className="reviewWindow">

      <h3>Reviews</h3>
      
      {reviews.map(R => <Review key={R.id} creator={R.creator} stars={R.stars}
        text={R.text} timestamp={R.timestamp} reviewId={R.id} currentUser={inCurrentUser} deleteReview = {removeItem}/>)}  

      {loggedIn && <ReviewForm updateFn={createNewReview} IsOwner = {isOwner}/>}
    </div>
  )
}

export default ChatWindow