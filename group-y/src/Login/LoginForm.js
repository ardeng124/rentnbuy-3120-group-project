import React, {useState} from 'react'

const UnitForm = ({updateFn}) => {

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
        <div className="loginFormBox">
        <form onSubmit={formHandler}>
	    <div className="signup">
		<h2 className="form-title" id="signup"> Sign up</h2>
		<div className="form-holder">
            <label htmlFor="username">Input New Username: </label>
            <input name="username" className="input" onChange={updateField} autoComplete="off" required/>
		</div>
		<button className="submit-btn" type="submit" value = "Sign Up">Sign up</button>
	</div>
    </form>
    </div>
    )
}

export default UnitForm