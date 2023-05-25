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
import NavBar from "./Components/NavBar";
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
			<Route
				path="/"
				element={<Root isAdmin={isAdmin} languageHelper={languageHelper.navBar} />}
			>
				<Route
					index
					element={
						<MainPage languageHelper={languageHelper} user={user} setUser={setUser} />
					}
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
				<NavBar
					languageHelper={props.languageHelper}
					links={[
						{ key: "nav_link_1", name: props.languageHelper.home, path: "/" },
						{
							key: "nav_link_2",
							name: props.languageHelper.manageAgudaMembers,
							path: "/manage_aguda_members",
						},
						{
							key: "nav_link_3",
							name: props.languageHelper.manageUsers,
							path: "/add_users",
						},
						{
							key: "nav_link_4",
							name: props.languageHelper.manageEvents,
							path: "/manage_events",
						},
						{
							key: "nav_link_5",
							name: props.languageHelper.manageMarathons,
							path: "/manage_marathons",
						},
					]}
				/>
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
