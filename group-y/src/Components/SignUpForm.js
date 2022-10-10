//Imports
import React, { useState } from "react";
import Stack from '@mui/material/Stack';

//Need A button that says register to go to a register page
//instead of the initial login page
const SignUpForm = ({updateFn}) => {

    const initialState = {
        firstName: '',
        lastName: '',
        emailAddress: '',
        phoneNumber: '',
        username: '', 
        password: '',
        repeatPassword: '',
        birthday: '',
        age: '',
        gender: '',
        location: ''
    }

    const [formInfo, setFormInfo] = useState(initialState)

    // const [locationformInfo, setLocationFormInfo] = useState(location)

    const updateField = (event) => {
        //Assign Input Elements to each attributes 
        const name = event.target.attributes.name.value
        if (name === "username") {
            setFormInfo({...formInfo, username: event.target.value})
        } else if (name === "password") {
            setFormInfo({...formInfo, password: event.target.value})
        } else if (name === "repeatPassword") {
            setFormInfo({...formInfo, repeatPassword: event.target.value})
        } else if (name === "birthday") {
            //Entered Birth Date
            setFormInfo({...formInfo, birthday: event.target.value})
            
            //Age of User
            const str = event.target.value
            const age = new Date().getFullYear() - str.substring(0, 4)
            setFormInfo({...formInfo, age: age})
        } else if (name === "firstName") {
            setFormInfo({...formInfo, firstName: event.target.value})
        } else if (name === "lastName") {
            setFormInfo({...formInfo, lastName: event.target.value})
        } else if (name === "emailAddress") {
            setFormInfo({...formInfo, emailAddress: event.target.value})
        } else if (name === "phoneNumber") {
            setFormInfo({...formInfo, phoneNumber: event.target.value})
        } else if (name === "gender") {
            setFormInfo({...formInfo, gender: event.target.value})
        } else if (name === "address") {
            setFormInfo({...formInfo, location: event.target.value})
        }
    }

    const formHandler = (event) => {
        console.log("password", formInfo.password != formInfo.repeatPassword)
        event.preventDefault()
        if (formInfo.password === formInfo.repeatPassword) {
            console.log("Form submitted: ", formInfo)
            updateFn(formInfo)
            // setFormInfo(initialState)
        } else {
            //Error Message
            console.log("Insert Error Handling Messages")
        }
    }

    return (
        <div className ="formContainer">
            <form onSubmit={formHandler}>
                <fieldset>
                    <legend> Personal details</legend>
                    <input className="input" type="text" placeholder="First name" name="firstName" onChange={updateField} required/>
                    <input className="input" type="text" placeholder="Last name" name="lastName" onChange={updateField} required/>
                    <input className="input" type="email" placeholder="Email" name="emailAddress" onChange={updateField} required/>
                    <input className="input" type="tel" placeholder="Phone Number" name="phoneNumber" onChange={updateField} required/>
                </fieldset>

                <input className="input" type="text" placeholder="Enter Username" name="username" onChange={updateField} required/>
                <input className="input" type="password" placeholder="Enter Password" name="password" onChange={updateField} required/>
                <input className="input" type="password" placeholder="Repeat Password" name="repeatPassword" onChange={updateField} required/>
                
                {/* Age */}
                <label htmlFor="start">Birthday: </label>
                <input className="input1" type="date" id="start" name="birthday" min="1901-01-01" max="2022-12-31" onChange={updateField} required/>
                 <br></br>
                {/* Gender */}
                <label htmlFor="start">Gender: </label>
                <select className = "input1" name="gender" placeholder="Type to search" onChange={updateField} required>
                    <option disabled={true} value="">--Choose a option--</option>
                    <option value="Other">Other</option>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                </select>

                {/* Address */}
                <input className="input" type="text" placeholder="Address" name="address" onChange={updateField} required/>


                <p> By creating an account you agree to our Terms & Privacy. </p>
                <Stack spacing={2} alignItems="center">
                    <button className="appBtn" type="submit" variant="contained">Signup</button>
                </Stack>
            </form>
        </div>
    )
}

export default SignUpForm