import { useEffect, useState } from "react";
import "./App.css";
import {
	createBrowserRouter,
	createRoutesFromElements,
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
import MeetingRooms from "./pages/MeetingRooms.jsx";

function App() {
	const [currentLanguage, setCurrentLanguage] = useState("he");
	const languageHelper = languages[currentLanguage];

	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path="/" element={<Root />}>
				<Route index element={<MainPage languageHelper={languageHelper} />} />
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
				<Route
					path="/meeting_rooms"
					element={
						<MeetingRooms
							languageHelper={languageHelper}
							currentLanguage={currentLanguage}
						/>
					}
				/>
			</Route>
		)
	);

	useEffect(() => {
		changeLanguage();
	}, [currentLanguage]);

	const changeLanguage = () => {
		if (currentLanguage == "he") {
			document.getElementById("root").setAttribute("dir", "rtl");
		} else {
			document.getElementById("root").setAttribute("dir", "ltr");
		}
	};

	const handleLanguageChange = (e) => {
		setCurrentLanguage(e.target.value);
		changeLanguage();
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
		<div id="page">
			<Outlet />
		</div>
	);
};

export default App;
