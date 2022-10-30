//Imports
import React, { useState } from "react";
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';

const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

const ReviewForm = ({updateFn, IsOwner}) => {

    let initialState = {text: "", stars: 0}

    //Hover Rating
    const [value, setValue] = React.useState(null);
    const [hover, setHover] = React.useState(-1);

    const [review, setReview] = useState(initialState)

    const updateField = (event) => {
        const text = event.target.attributes.name.value
        if (text === "text") {
            setReview({...review, text: event.target.value})
        } else if (text === "stars") {
            setReview({...review, stars: event.target.value})
        }
    }

    //Form Handler for Chats
    const formHandler = (event) => {
        event.preventDefault()
        document.reviewform.reset()

        updateFn(review)
    }

    return (
        <div className ="ReviewformContainer">
            <form onSubmit={formHandler} className = "reviewForm" name='reviewform'>
                <textarea rows={40} cols={100} type="text" placeholder="Leave a comment or review" name="text" onChange={updateField} value={review.text} required/>

                {!IsOwner && <Box className = "starContainer" onChange={updateField} sx={{width: 200, display: 'flex', alignItems: 'center',}}>
                    <Rating name="stars" value={value} precision={0.5}
                        getLabelText={getLabelText}
                        onChange={(event, newValue) => {
                        setValue(newValue);
                        }}
                        onChangeActive={(event, newHover) => {
                        setHover(newHover);
                        }}
                        size="large"
                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                    />
                    {value !== null && (
                        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
                    )}
                </Box>}

                <button className="appBtn" type="submit">Send</button>
            </form>
        </div>
    )
}

export default ReviewForm