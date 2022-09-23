import React, {useState} from 'react'

const ConversationForm = ({updateFn}) => {

    const initialState = {title: ''}

    const [formInfo, setForm] = useState(initialState)
    
    const updateField = (event) => {
        const name = event.target.attributes.name.value
        console.log(name, event.target.value)
        if (name === "title") {
                setForm({...formInfo, title: event.target.value})
            }   
        }
    
    const formHandler = (event) => {
        event.preventDefault()
        console.log("Form submitted: ", formInfo)
        updateFn(formInfo)
        setForm(initialState)
    }

    return (
        <div className="convoFormBox">
        <form onSubmit={formHandler}>
        <div className="form-holder">
        <label className="form-title" htmlFor="title">Input New Title: </label>
            <input name="title" className="input" onChange={updateField} autoComplete="off" required/>
        </div>
            <button className="submit-btn" type="submit" value = "Create Conversation">Create Conversation</button>

        </form>
        </div>
    )
}

export default ConversationForm