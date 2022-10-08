import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import DropDownMenu from "../Components/DropDownMenu";

function AccountDetails() {
    const [formInfo, setFormInfo] = useState({ username: "", password: "" })

    const navigate = useNavigate()
    const handleUserClicked = (event) => {
        console.log("clicked on user icon")
        navigate("/userview")
    }
    const formHandler = (event) => {
        event.preventDefault()
        console.log("Form submitted: ", formInfo)
        // setFormInfo(initialState)
    }

    const updateField = (event) => {
        // which input element is this
        const name = event.target.attributes.name.value
        if (name === "username") {
            setFormInfo({ ...formInfo, username: event.target.value })
        } else if (name === "password") {
            setFormInfo({ ...formInfo, password: event.target.value })
        }
    }
    return (
        <div className="AccountDetailsPage">
            <section className="loginheader">
                <div className="MasterHeader">
                    <DropDownMenu></DropDownMenu>
                    <ul>
                        <li> <a href="/">Home</a> </li>
                    </ul>
                </div>
                <h1>Account Details</h1>

                {/* <div className="miniNavBar">
                    <ul>
                        <li> <a href="/userview">Profile</a> </li>
                        <li> <a href="/settings">Settings</a> </li>
                        <li> <a className="active" href="/userdetails">Details</a> </li>    
                    </ul>
                </div> */}
            </section>
            <section className="loginBox">
                <div className="formContainer">
                    <br></br>
                    <form className="border" onSubmit={formHandler}>
                        {/* TODO: state updates on input change here */}
                        <button
                            className="editUsrIconBtn"
                            onClick={() => console.log("update")}
                        />
                        <fieldset className="passChangeFieldSet">
                            <input
                                className="input"
                                type="text"
                                placeholder="Username"
                                name="Username"
                            />
                            <input
                                className="input"
                                type="text"
                                placeholder="Email"
                                name="Email"
                            />
                            <input
                                className="input"
                                type="text"
                                placeholder="Address"
                                name="Address"
                            />
                        </fieldset>

                        <button className="appBtn" type="submit">
                            Save changes
                        </button>
                    </form>
                </div>
            </section>
        </div>
    )
}

export default AccountDetails
