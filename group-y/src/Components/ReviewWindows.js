//Imports
import React, { useEffect, useState } from "react";
import ReviewForm from "./ReviewForm.js";
import Review from "./Review.js";

import AxiosService from "../AxiosService";

const ChatWindow = (props) => {
    const {id, reviewIn} = props
    console.log(reviewIn)
    const [reviews, setReview] = useState([])

    //Interval to refresh the ReviewWindow every 60000ms 
    // useEffect(() => {
    //     AxiosService.getReviewsPerItem()
    //     .then(response => {
    //         console.log(response.data)
    //         setReview(response.data.reviews) 
    //     })
    //     const ReviewListInterval = setInterval(() => {
    //         AxiosService.getReviewsPerItem()
    //         .then(response => {
    //             console.log(response.data)
    //             setReview(response.data.reviews) 
    //         })
    //     }, 60000); // will run this request every 1 min
    
    //     return () => clearInterval(ReviewListInterval);
    // }, [])
   
    useEffect(() => {
        setReview(reviewIn)
        console.log("REVIEWS"+reviewIn)
    }, [reviewIn])
    const createNewReview = (formInfo) => {
        const dataToPost = {
            stars:formInfo.stars,
            text:formInfo.text,
            itemId: id
        }
        AxiosService.postReview(dataToPost)
        .then(response => {
            console.log("Post Review", response)

            AxiosService.getReviewsPerItem()
            .then(response => {
                console.log(response.data)
                setReview(response.data.reviews) 
            })
        })
    }

  return (
    <div className="reviewWindow">

      <h3>Reviews</h3>
      
      {reviews.map(R => <Review key={R.id} creator={R.creator} stars={R.stars}
        text={R.text} timestamp={R.timestamp} reviewId={R.id}/>)}  

      <ReviewForm updateFn={createNewReview}/>
    </div>
  )
}

export default ChatWindow