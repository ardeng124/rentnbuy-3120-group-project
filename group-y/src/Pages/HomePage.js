import React, {useState, useEffect} from 'react'

import {
    BrowserRouter as Router,
    Routes, Route, Link
  } from "react-router-dom"

const Conversations = () => {

    // const [convos, setConversations] = useState([])

    const [error, setError] = useState(false)

    // const addNewConvo = (data) => {

    //     axios.post("http://localhost:8102/api/conversations", data, ProfileToken)
    //     .then(response => {
    //         axios.get("http://localhost:8102/api/conversations", ProfileToken)
    //         .then((response) => {
    //             setConversations(response.data.conversations)
    //         })
    //     })
    //   }

    // const fetchConvos = () => {
    // axios.get("http://localhost:8102/api/conversations", ProfileToken)
    // .then((response) => {
    //     console.log("GET response: ", response)
    //     setConversations(response.data.conversations)
    //     console.log("GET Conversations: ", response.data.conversations)
    // }) 
    // .catch((error) => {
    //     console.log("401 Error, Not Authorized!")
    //     setError(true)
    //     })
    // }
    
    // useEffect(() => {
    //     fetchConvos()
    //     console.log("Fetching Convos")
    // },[])
    
    
        return (
            
        <div className='HomePage'> 
            <div className='MasterHeader'>
                <ul>
                    <li><a href="/login">Login</a></li>
                    <li><a class="active" href="/">Home</a></li>
                </ul>
        </div>          
            {/* <ConversationForm updateFn={addNewConvo}/>
            <h4> Conversations Listed Below: </h4>
            <div className='allConvos'>
            {convos.map(({ creator, id, messages, title }) => (
            <li className='convoList' key={id}>
            <p>Forum Title: <Link to="/messages">{title}</Link></p>
            <p>Messages: {messages}</p>
            <p>Author: {creator}</p>
            <p>ID: {id}</p>       
            </li>
      ))} 
      </div>       */}
      <h3>This is the homepage</h3>
      </div>
    )
    
}

export default Conversations