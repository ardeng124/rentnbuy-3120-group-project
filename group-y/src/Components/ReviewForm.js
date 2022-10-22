//Imports
import React, { useState } from "react";

const ReviewForm = ({updateFn, unitInfo}) => {

    let initialState = {text: unitInfo}

    const [reviewInfo, setReviewInfo] = useState(initialState)

    const updateField = (event) => {
        const text = event.target.attributes.name.value
        setReviewInfo({...reviewInfo, text: event.target.value})
    }

    //Form Handler for Chats
    const formHandler = (event) => {
        event.preventDefault()
        console.log("Form submitted: ", reviewInfo)
        updateFn(reviewInfo)
    }

    return (
        <div className ="container">
            <form onSubmit={formHandler}>
                <input type="text" placeholder="Exter a Message" name="text" onChange={updateField} value={reviewInfo.text} required/>

                <button type="submit">Send</button>
            </form>
        </div>
    )
}

export default ReviewForm