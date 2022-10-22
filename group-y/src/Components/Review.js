//Imports
import { useEffect, useState } from "react"

function Review ({creator, text, timestamp, reviewId, stars}) {
    
    //CSS for seperating tables
    const padding = {
        padding: 10
    }

    //The user logged in can edit and delete their messages whilst all other
    //messages are shown on the left in red
    return (
        <div>
            <p style={padding}>Creator: {creator} </p>
            <p style={padding}>Text: {text} </p>
            <p style={padding}>Time: {timestamp} </p>
            <p style={padding}>Rating: {stars} </p>
        </div>   
    );
}

export default Review