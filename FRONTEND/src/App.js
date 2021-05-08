import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
// import 'bootstrap/dist/css/bootstrap.css';

// Store
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import { updateSetCurrentUser, logoutUser } from "./actions/authActions";

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
import NewsFeed from "./views/NewsFeed/NewsFeed";
import Profile from "./views/Profile/Profile";
import Accounts from "./views/Accounts/Accounts";
import ChatBox from "./views/ChatBox/ChatBox";
import { getUsersStatuses } from './actions/userActions';

// Check auth token
if (localStorage['jwtToken']) {
	// Set token header to auth
	setAuthToken(localStorage['jwtToken']);
	// Decode token and get user token
	const decoded = jwt_decode(localStorage['jwtToken']);
	
	// SET CURRENT USER
	store.dispatch(updateSetCurrentUser(decoded['id']));

	// Get Users Statuses
	store.dispatch(getUsersStatuses());
	
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
					<Navbar token={localStorage['jwtToken']} />
					<Switch>
						<Route exact path="/login" component={Login} />
						<Route exact path="/" component={Login} />
						<Route exact path="/register" component={Register} />
						<Route exact path="/forget-password" component={ForgetPassword} />
						<Route exact path="/change-password/:userId/:uuid" component={ChangePassword} />
						<Route exact path="/newsfeed" component={NewsFeed} />
						<Route exact path="/profile/:username" component={Profile} />
						<Route exact path="/accounts/:tab" component={Accounts} />
						<Route exact path="/inbox" component={ChatBox} />

						<Redirect to="/login" />
					</Switch>
					<FootNavBar token={localStorage['jwtToken']} />
				</Router>
			</Provider>
		</div>
	);
}

export default App;
