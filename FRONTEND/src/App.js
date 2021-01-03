import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";

import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

// Styles
import './App.css';

// Load components
import Login from './views/components/auth/Login';
import Register from './views/components/auth/Register';
import ForgetPassword from './views/components/auth/ForgetPassword';
import ChangePassword from './views/components/auth/ChangePassword';

// import Navbar from "./components/layout/Navbar";
import Navbar from "./views/Navbar/NavBar";
import FootNavBar from "./views/FootNavBar/FootNavBar";
import Dashboard from "./views/components/landing/Dashboard";
import NewsFeed from "./views/NewsFeed/NewsFeed"; //testing
import Profile from "./views/components/profile/Profile";
import NewProfile from "./views/Profile/Profile";
import Accounts from "./views/Accounts/Accounts";

// Check auth token
if (localStorage['jwtToken']) {
	// Set token header to auth
	setAuthToken(localStorage['jwtToken']);
	// Decode token and get user token
	const decoded = jwt_decode(localStorage['jwtToken']);
	// Set Current User
	store.dispatch(setCurrentUser(decoded));

	// Check for expired token
	const currentTime = Date.now() / 1000;
	if (decoded.exp < currentTime) {
		// Logout user
		store.dispatch(logoutUser());

		// Redirect to login
		window.location.href = "/login";
	}
}

function App() {
	return (
		<div className="App">
			<Provider store={store}>
				<Router>
					<Navbar />
					<div className="">
						<Switch>
							{/* AUTH */}
							<Route exact path="/login" component={Login} />
							<Route exact path="/register" component={Register} />
							<Route exact path="/forget-password" component={ForgetPassword} />
							<Route exact path="/change-password/:userId/:uuid" component={ChangePassword} />

							{/* PAGES */}
							<Route exact path="/" component={Dashboard} />
							<Route exact path="/newsfeed" component={NewsFeed} />
							<Route exact path="/testprofile" component={NewProfile} />
							<Route exact path="/profile/:username" component={Profile} />
							<Route exact path="/accounts/:tab" component={Accounts} />

							{/* REDIRECTION */}
							<Redirect to="/login" />
						</Switch>
					</div>
					
					<FootNavBar />
				</Router>
			</Provider>
		</div>
	);
}

export default App;
