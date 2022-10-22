//Imports
import { useEffect, useState } from "react"

function Review ({creator, text, timestamp, conversationId, messageId}) {

    const [position, setPosition] = useState()

    let username = localStorage.getItem('username')
    
    //CSS for seperating tables
    const padding = {
        padding: 10
    }

    //To shift the position of the users chats
    useEffect(() => {
        if (username === creator) {
            setPosition(true)
        } else {
            setPosition(false)
        }
    }, []);

    //The user logged in can edit and delete their messages whilst all other
    //messages are shown on the left in red
    return (
        <div className="chatMessagesLeft">
            <p style={padding}>Creator: {creator} </p>
            <div className="chatMessageItemsLeft">
                <p style={padding}>Text: {text} </p>
                <p style={padding}>Time: {timestamp} </p>
            </div>
        </div>   
    );
}

export default Review