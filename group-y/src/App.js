import Conversations from './Pages/Conversations.js'
import LogIn from './Pages/LogIn.js'
import SignUp from './Pages/SignUp'

import './App.css';

import {
  BrowserRouter as Router,
  Routes, Route, Link
} from "react-router-dom"

function App() { 

  const padding = {
    padding: 12
  }
  
    return (
    <div className="App">
      <Router>
        <div className="Links">
          <Link style={padding} to="/">Home</Link>
          <Link style={padding} to="/login">Log In</Link>
        </div>
    
      <Routes>
        <Route path="/" element ={<Conversations />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/register" element={<SignUp />} />
      </Routes> 
      </Router>
    </div>
  );
}

export default App;
