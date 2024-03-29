//Imports
import React, { useState } from "react";

/**
 * LogInForm: Contains a form that has inputs for the user to log in. On submit runs {updateFn}
 */
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
        updateFn(formInfo)
        // setFormInfo(initialState)
    }

    return (
        <div className ="formContainer">
            <form className="border" onSubmit={formHandler}>
                <input className="input" type="text" placeholder="Username" name="username" onChange={updateField} required/>
                <input className="input" type="password" placeholder="Password" name="password" onChange={updateField} required/>
                    <button className="appBtn" type="submit">Login</button>
            </form>
        </div>
    )
}

export default LogInForm