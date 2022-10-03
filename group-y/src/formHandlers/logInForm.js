//Imports
import React, { useState } from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

//Need A button that says register to go to a register page
//instead of the initial login page
const logInForm = ({updateFn}) => {

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
                <label className="label" htmlFor="username">Username</label>
                <input className="input" type="text" placeholder="Enter your username" name="username" onChange={updateField} required/>
                <label className="label" htmlFor="password">Password</label>
                <input className="input" type="password" placeholder="Enter your password" name="password" onChange={updateField} required/>
                <Stack spacing={2} alignItems="center">
                    <Button type="submit" variant="contained">Login</Button>
                </Stack>
            </form>
        </div>
    )
}

export default logInForm