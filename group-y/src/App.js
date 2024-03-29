import HomePage from './Pages/HomePage.js'
import LogIn from './Pages/LogIn.js'
import SignUp from './Pages/SignUp'
import UserSettings from './Pages/UserSettings.js';
import './App.css';
import AccountDetails from './Pages/AccountDetails.js';
import UserView from './Pages/UserView.js';
import ItemPage from './Pages/ItemPage.js';
import Search from './Pages/Search';
import YourOffers from './Pages/YourOffers.js';
import Categories from "./Pages/Categories.js"
import Notifications from './Pages/Notifications.js';
import FavouritesPage from './Pages/FavouritesPage.js';
import AddListing from './Pages/AddListing.js';
import CategorySearch from './Pages/CategorySearch.js';
import ModifyItem from './Pages/ModifyItem.js';

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
                {/* <div className="Links">
          <Link style={padding} to="/">Home</Link>
          <Link style={padding} to="/login">Log In</Link>
        </div> */}

                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LogIn />} />
                    <Route path="/register" element={<SignUp />} />
                    <Route path="/settings" element={<UserSettings />} />
                    <Route path="/userdetails" element={<AccountDetails />} />
                    <Route path="/categories" element={<Categories />} />
                    <Route path="/categories/:name" element={<CategorySearch />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/userview" element={<UserView />} />
                    <Route path="/item/:id" element={<ItemPage/>} />
                    <Route path="/editItem/:id" element={<ModifyItem/>} />

                    <Route path="/notifications" element={<Notifications/>} />
                    <Route path="/offers" element={<YourOffers/>} />
                    <Route path="/favourites" element={<FavouritesPage />} />
                    <Route path="/addlisting" element={<AddListing />} />

                </Routes>
            </Router>
        </div>
    )
}

export default App;
