//Imports
import React, { useState } from "react";
import Stack from '@mui/material/Stack';

//Need A button that says register to go to a register page
//instead of the initial login page
const SignInForm = ({updateFn}) => {

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
            <form onSubmit={formHandler}>
                <fieldset>
                    <legend> Personal details</legend>
                    <input className="input" type="text" placeholder="Full name" name="fullname" onChange={updateField} required/>
                    <input className="input" type="email" placeholder="Email" name="email" onChange={updateField} required/>
                </fieldset>

                <input className="input" type="text" placeholder="Enter Username" name="username" onChange={updateField} required/>
                <input className="input" type="password" placeholder="Enter Password" name="password" onChange={updateField} required/>
                <input className="input" type="password" placeholder="Repeat Password" name="repeatPassword" onChange={updateField} required/>
                
                {/* Age */}
                <label for="start">Birthday: </label>

                <input type="date" id="start" name="trip-start"
                min="1901-01-01" max="2022-12-31"/>


                {/* Gender */}
                {/* <fieldset>
                    <div>
                        <input type="checkbox" id="male" name="gender" value="Male" />
                        <label for="male">Male</label>
                    </div>
                    <div>
                        <input type="checkbox" id="female" name="gender" value="Female" />
                        <label for="female">Female</label>
                    </div>
                    <div>
                    <label className="label" htmlFor="otherGender"> Other: </label>
                    <input className="input" type="text" placeholder="Enter Gender" name="otherGender" onChange={updateField} required/>
                    </div>
                </fieldset> */}

                {/* Phone Number - Not working as intended */}
                {/* <label for="phone">Phone Number:</label>

                <input type="tel" id="phone" name="phone"
                pattern="[0-9]{4}-[0-9]{3}-[0-9]{3}"
                placeholder="Enter Phone Number"
                required/>

                <small>Format: 1234-567-890 </small> */}

                {/* Address */}
                {/* <div class="form-group">
                    <input type="street" 
                        class="form-control" 
                        id="autocomplete" 
                        pattern="[A-Za-z]"
                        placeholder="Street"/>
        
                    
                    <input type="city" 
                        class="form-control" 
                        id="inputCity" 
                        placeholder="City"/>
                    
                    <input type="state" 
                        class="form-control" 
                        id="inputState" 
                        placeholder="State"/>
                    
                    <input type="zip" 
                        class="form-control" 
                        id="inputZip" 
                        placeholder="Zip"/>
                    
                    <input type="county" 
                        class="form-control" 
                        id="inputCounty" 
                        placeholder="County"/>
                    
                    <input type="country" 
                        class="form-control" 
                        id="inputCountry" 
                        placeholder="Country"/>
                    </div> */}


                <p> By creating an account you agree to our Terms & Privacy. </p>
                <Stack spacing={2} alignItems="center">
                    <button className="appBtn" type="submit" variant="contained">Signup</button>
                </Stack>
            </form>
        </div>
    )
}

export default SignInForm