import React from 'react'

function UserSettings() {
    const handleUserClicked = (event) => {
        console.log("clicked on user icon")
    }
  return (
    <div className='UserSettingsPage'>
              <section className="loginheader">
        <div className='MasterHeader'>
                <ul>
                    <li><a href="/login">Login</a></li>
                    <li><a href="/">Home</a></li>
                    <li className='usrAccLi'> <button className='usrAccBtn' onClick={handleUserClicked}></button></li>
                </ul>
        </div>          
        <h1>User Settings</h1>
        
        <div className='miniNavBar'>
            <ul>
                    <li><a className= 'active' href="/settings">Settings</a></li>
                    <li><a href="/userdetails">Details</a></li>
                    <li><a href="/userview">View</a></li>

                </ul>
            </div>
        </section>
        <section className='main'>
            
        </section>
    </div>
  )
}

export default UserSettings