//Imports
import { useEffect, useState } from "react"
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import Box from '@mui/material/Box';

/**
 * Review: Review component displaying creator, text, rating
 */
const Review = ({creator, text, timestamp, reviewId, stars, currentUser, deleteReview})=> {
    let dateTrimEnd = timestamp.slice(0,-14)

    // //CSS for seperating tables
    // const labels = {
    //     0.5: 'Useless',
    //     1: 'Useless+',
    //     1.5: 'Poor',
    //     2: 'Poor+',
    //     2.5: 'Ok',
    //     3: 'Ok+',
    //     3.5: 'Good',
    //     4: 'Good+',
    //     4.5: 'Excellent',
    //     5: 'Excellent+',
    //   };
      
    //   function getLabelText(stars) {
    //     return `${stars} Star${stars !== 1 ? 's' : ''}, ${labels[stars]}`;
    //   }
    //The user logged in can edit and delete their messages whilst all other
    //messages are shown on the left in red
    return (
        <div className="reviewItemDiv"> 
        {currentUser == creator && <div>
                <button className="deleteMsg" onClick = {() => deleteReview(reviewId)}> X </button>
        </div>}
            <div className="reviewDivContainer">
                <li className="reviewCreator"> {creator} </li>
                {stars ? <Rating name="text-feedback" value={stars} readOnly label="Rating" precision={0.5} size="large" 
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />} />: <li></li> }
            </div>
            <div className="reviewDivContainer">
                <li className="reviewText">{text} </li>
                <li className="reviewTime">{dateTrimEnd} </li>
            </div>
        </div>   
    );
}

export default Review