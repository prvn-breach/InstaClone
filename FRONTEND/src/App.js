import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";

// Store
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, updateSetCurrentUser, logoutUser } from "./actions/authActions";

import { PUBLIC_PATHS} from "./config";

// Styles
import './App.css';

// Components
import Login from './views/components/auth/Login';
import Register from './views/components/auth/Register';
import ForgetPassword from './views/components/auth/ForgetPassword';
import ChangePassword from './views/components/auth/ChangePassword';
import Navbar from "./views/Navbar/NavBar";
import FootNavBar from "./views/FootNavBar/FootNavBar";
import Dashboard from "./views/components/landing/Dashboard";
import NewsFeed from "./views/NewsFeed/NewsFeed"; //testing
import Profile from "./views/components/profile/Profile";
import NewProfile from "./views/Profile/Profile";
import Accounts from "./views/Accounts/Accounts";
import ChatBox from "./views/ChatBox/ChatBox";
// import openSocket from "socket.io-client";

// Check auth token
if (localStorage['jwtToken']) {
	// Set token header to auth
	setAuthToken(localStorage['jwtToken']);
	// Decode token and get user token
	const decoded = jwt_decode(localStorage['jwtToken']);
	
	// SET CURRENT USER
	store.dispatch(updateSetCurrentUser());
	// Get Auth User Event
	// let getAuthUser = openSocket("http://localhost:5000/user/getAuthUsers");
	// getAuthUser.on('getAuthUsers', (data) => {
	// 	if (decoded['id'] === data['current_user']._id) {
	// 		store.dispatch(setCurrentUser(data['current_user']));
	// 	} else if (decoded['id'] === data['followed_user']._id) {
	// 		store.dispatch(setCurrentUser(data['followed_user']));
	// 	}
	// });

	// Check for expired token
	const currentTime = Date.now() / 1000;
	if (decoded.exp < currentTime) {
		// Logout user
		store.dispatch(logoutUser());

		// Disconnect GetAuthUser Socket
		// getAuthUser.disconnect();
	}
} else {
	if (!PUBLIC_PATHS.includes(window.location.pathname)) {
		store.dispatch(logoutUser());
	}
}

const App = () => {
	return (
		<div className="App">
			<Provider store={store}>
				<Router>
					{
						localStorage['jwtToken']
							? (<Navbar />)
							: ""
					}
					<div className="">
						<Switch>
							{/* AUTH */}
							<Route exact path="/login" component={Login} />
							<Route exact path="/" component={Login} />
							<Route exact path="/register" component={Register} />
							<Route exact path="/forget-password" component={ForgetPassword} />
							<Route exact path="/change-password/:userId/:uuid" component={ChangePassword} />

							{/* PAGES */}
							{/* <Route exact path="/" component={Dashboard} /> */}
							<Route exact path="/newsfeed" component={NewsFeed} />
							<Route exact path="/testprofile" component={NewProfile} />
							<Route exact path="/profile/:username" component={Profile} />
							<Route exact path="/accounts/:tab" component={Accounts} />
							<Route exact path="/inbox" component={ChatBox} />

							{/* REDIRECTION */}
							<Redirect to="/login" />
						</Switch>
					</div>
					{
						localStorage['jwtToken']
							? (<FootNavBar />)
							: ""
					}
				</Router>
			</Provider>
		</div>
	);
}

export default App;
