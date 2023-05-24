import { useState, useEffect } from "react";
import "./App.css";
import {
	createBrowserRouter,
	createRoutesFromElements,
	Link,
	Route,
	RouterProvider,
	Outlet,
} from "react-router-dom";

import languages from "./modules/languages";
import LanguagesSelection from "./Components/languages_selection.jsx";
import MainPage from "./pages/mainPage.jsx";
import ManageAgudaMembers from "./pages/ManageAgudaMembers.jsx";
import ManageEvents from "./pages/ManageEvents.jsx";
import ManageMarathons from "./pages/ManageMarathons.jsx";
import AddUsers from "./Components/addUsers";

function App() {
	const [currentLanguage, setCurrentLanguage] = useState("en");
	const [user, setUser] = useState();
	const [isAdmin, setIsAdmin] = useState();
	const languageHelper = languages[currentLanguage];

	// Checks if a user is logged in and sets the user state accordingly
	useEffect(() => {
		const loggedInUser = localStorage.getItem("user");
		if (loggedInUser) {
			const foundUser = JSON.parse(loggedInUser);
			setUser(foundUser);
			setIsAdmin(foundUser.isAdmin);
		}
	}, []);

	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path="/" element={<Root isAdmin={isAdmin} />}>
				<Route
					index
					element={<MainPage languageHelper={languageHelper} user={user} setUser={setUser} />}
				/>
				<Route
					path="/manage_aguda_members"
					element={<ManageAgudaMembers languageHelper={languageHelper} />}
				/>
				<Route
					path="/add_users"
					element={<AddUsers languageHelper={languageHelper.addUsers} />}
				/>
				<Route
					path="/manage_events"
					element={<ManageEvents languageHelper={languageHelper} />}
				/>
				<Route
					path="/manage_marathons"
					element={<ManageMarathons languageHelper={languageHelper} />}
				/>
			</Route>
		)
	);

	const handleLanguageChange = (e) => {
		setCurrentLanguage(e.target.value);
		if (currentLanguage == "he") {
			document.getElementById("root").setAttribute("dir", "ltr");
		} else {
			document.getElementById("root").setAttribute("dir", "rtl");
		}
	};

	return (
		<>
			<div id="languageSelection">
				<LanguagesSelection
					handleLanguageChange={handleLanguageChange}
					selectedLanguage={currentLanguage}
				/>
			</div>
			<RouterProvider router={router} />
		</>
	);
}

const Root = (props) => {
	return (
		<>
			{props.isAdmin ? (
				<div id="nav_bar">
					<h1>AgudaJCE</h1>
					<div className="nav_bar_pages">
						<Link to="/">Home</Link>
					</div>
					<div className="nav_bar_pages">
						<Link to="/manage_aguda_members">Manage Aguda Members</Link>
					</div>
					<div className="nav_bar_pages">
						<Link to="/add_users">Add Users</Link>
					</div>
					<div className="nav_bar_pages">
						<Link to="/manage_events">Manage Events</Link>
					</div>
					<div className="nav_bar_pages">
						<Link to="/manage_marathons">Manage Marathons</Link>
					</div>
				</div>
			) : (
				<></>
			)}
			<div id="page">
				<Outlet />
			</div>
		</>
	);
};

export default App;
