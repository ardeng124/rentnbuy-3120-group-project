//Imports
import React, { useEffect, useState } from "react";
import ReviewList from "./ReviewList.js";
import ReviewForm from "./ReviewForm.js";
import AxiosService from "../AxiosService";

const ChatWindow = () => {

    const [reviews, setReview] = useState([])

    //Interval to refresh the ReviewWindow every 500ms 
    useEffect(() => {
        const ReviewListInterval = setInterval(() => {
            AxiosService.getReviewsPerItem()
            .then(response => {
                console.log(response.data)
                setReview(response.data.reviews) 
            })
        }, 500);
    
        return () => clearInterval(ReviewListInterval);
    })
   
    const createNewReview = (formInfo) => {
        AxiosService.postReview(formInfo)
        .then(response => {
            console.log("Post Review", response)

            AxiosService.getReviewsPerItem()
            .then(response => {
                console.log(response.data)
                setReview(response.data.reviews) 
            })
        })
    }

    console.log("qiopdjhhqdjqd", reviews)

  return (
    <div>

      <p>Reviews</p>
      
      <ReviewList review={reviews}/>

      <ReviewForm updateFn={createNewReview}/>
    </div>
  )
}

export default ChatWindow