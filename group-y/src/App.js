import Conversations from './Pages/Conversations.js'
import SignUp from './Pages/SignUp.js'
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
          <Link style={padding} to="/login">Sign Up</Link>
        </div>
    
      <Routes>
        <Route path="/" element ={<Conversations />} />
        <Route path="/login" element ={<SignUp />} />
      </Routes> 
      </Router>
    </div>
  );
}

export default App;
