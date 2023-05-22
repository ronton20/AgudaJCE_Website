import { useState } from "react";
import "./App.css";
import {
	createBrowserRouter,
	createRoutesFromElements,
	Link,
	Route,
	RouterProvider,
	Outlet,
} from "react-router-dom";

import LanguagesSelection from "./Components/languages_selection.jsx";
import MainPage from "./pages/mainPage.jsx";
import ManageAgudaMembers from "./pages/ManageAgudaMembers.jsx";
import Login from "./Components/Login";
import AddUsers from "./Components/addUsers";

function App() {
	const [currentLanguage, setCurrentLanguage] = useState("en");
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false);
	const [currentUserEmail, setCurrentUserEmail] = useState("");

	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path="/" element={<Root />}>
				<Route index element={<MainPage currentLanguage={currentLanguage} />} />
				<Route
					path="/manage_aguda_members"
					element={<ManageAgudaMembers currentLanguage={currentLanguage} />}
				/>
				<Route
					path="/login"
					element={<Login currentLanguage={currentLanguage} />}
				/>
				<Route
					path="/add_users"
					element={<AddUsers currentLanguage={currentLanguage} />}
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

const Root = () => {
	return (
		<>
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
			</div>
			<div id="page">
				<Outlet />
			</div>
		</>
	);
};

export default App;
