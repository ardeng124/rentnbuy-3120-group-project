import React, { useState } from "react";

function UserSettings() {
    const [formInfo, setFormInfo] = useState({username: '', password: ''})

    const handleUserClicked = (event) => {
        console.log("clicked on user icon")
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
            setFormInfo({...formInfo, username: event.target.value})
        } else if (name === "password") {
            setFormInfo({...formInfo, password: event.target.value})
        }
    }
  return (
      <div className="UserSettingsPage">
          <section className="loginheader">
              <div className="MasterHeader">
                  <ul>
                      <li>
                          <a href="/login">Login</a>
                      </li>
                      <li>
                          <a href="/">Home</a>
                      </li>
                      <li className="usrAccLi">
                          {" "}
                          <button
                              className="usrAccBtn"
                              onClick={handleUserClicked}
                          ></button>
                      </li>
                  </ul>
              </div>
              <h1>User Settings</h1>

              <div className="miniNavBar">
                  <ul>
                      <li>
                          <a className="active" href="/settings">
                              Settings
                          </a>
                      </li>
                      <li>
                          <a href="/userdetails">Details</a>
                      </li>
                      <li>
                          <a href="/userview">View</a>
                      </li>
                  </ul>
              </div>
          </section>
          <section class="loginBox">
              <div className="formContainer">
                <br></br>
                  <form className="border" onSubmit={formHandler}>
                      <input
                          type="checkbox"
                          id="profanityFilter"
                          name="profanityFilter"
                          value="profanityFilter"
                      />
                    <label for="profanityFilter"> Filter profanity?</label>


                      {/* TODO: state updates on input change here */}
                      <fieldset className="passChangeFieldSet">
                      <legend>Password change</legend>
                          <input
                              className="input"
                              type="password"
                              placeholder="Old password"
                              name="oldPass"
                              
                          />
                          <input
                              className="input"
                              type="password"
                              placeholder="New password"
                              name="oldPass"
                              
                          />
                          <input
                              className="input"
                              type="password"
                              placeholder="New password retype"
                              name="oldPass"
                              
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

export default UserSettings