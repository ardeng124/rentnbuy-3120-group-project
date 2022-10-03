//Imports
import React, { useState } from "react";

//Need A button that says register to go to a register page
//instead of the initial login page
const LogInForm = ({updateFn}) => {

    const initialState = {username: '', password: ''}

    const [formInfo, setFormInfo] = useState(initialState)

    const updateField = (event) => {
        // which input element is this
        const name = event.target.attributes.name.value
        if (name === "username") {
            setFormInfo({...formInfo, username: event.target.value})
        } else if (name === "password") {
            setFormInfo({...formInfo, password: event.target.value})
        }
    }

    const formHandler = (event) => {
        event.preventDefault()
        console.log("Form submitted: ", formInfo)
        updateFn(formInfo)
        // setFormInfo(initialState)
    }

    return (
        <div className ="formContainer">
            <form className="border" onSubmit={formHandler}>
                <input className="input" type="text" placeholder="Username" name="username" onChange={updateField} required/>
                <input className="input" type="password" placeholder="Password" name="password" onChange={updateField} required/>
                    <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default LogInForm