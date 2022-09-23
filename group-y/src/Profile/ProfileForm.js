import React, {useState} from 'react'

const ProfileForm = ({updateFn}) => {

    const initialState = {username: ''}

    const [formInfo, setForm] = useState(initialState)
    
    const updateField = (event) => {
        const name = event.target.attributes.name.value
        console.log(name, event.target.value)
        if (name === "username") {
                setForm({...formInfo, username: event.target.value})
            }   
        }
    
    const formHandler = (event) => {
        event.preventDefault()
        console.log("Form submitted: ", formInfo)
        updateFn(formInfo)
        setForm(initialState)
    }

    return (
        <form onSubmit={formHandler}>
        <label htmlFor="username">Input New Username: </label>
            <input name="username" onChange={updateField} autoComplete="off" required/>
        <input type='submit' value = "Create User"></input>
        </form>
    )
}

export default ProfileForm