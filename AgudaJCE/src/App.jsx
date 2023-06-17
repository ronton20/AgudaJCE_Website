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
import ManageMembers from "./pages/ManageMembers.jsx";
import ManageEvents from "./pages/ManageEvents.jsx";
import ManageMarathons from "./pages/ManageMarathons.jsx";
import MeetingRooms from "./pages/MeetingRooms.jsx";
import Marathons from "./pages/Marathons.jsx";
import MeetingRoomBookings from "./pages/MeetingRoomBookings.jsx";

function App() {
	const localLanguage = localStorage.getItem("language");
	const [currentLanguage, setCurrentLanguage] = useState(localLanguage || "he");
	const languageHelper = languages[currentLanguage];

	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path="/" element={<Root />}>
				<Route
					index
					element={
						<MainPage languageHelper={languageHelper} currLang={currentLanguage} />
					}
				/>
				<Route
					path="/manage_aguda_members"
					element={<ManageAgudaMembers languageHelper={languageHelper} />}
				/>
				<Route
					path="/manage_users"
					element={<ManageMembers languageHelper={languageHelper} />}
				/>
				<Route
					path="/meeting_room_bookings"
					element={
						<MeetingRoomBookings
							languageHelper={languageHelper}
							currentLanguage={currentLanguage}
						/>
					}
				/>
				<Route
					path="/manage_events"
					element={<ManageEvents languageHelper={languageHelper} />}
				/>
				<Route
					path="/manage_marathons"
					element={<ManageMarathons languageHelper={languageHelper} />}
				/>
				<Route path="/marathons" element={<Marathons languageHelper={languageHelper} />} />
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

	const toggleLanguage = () => {
		if (currentLanguage == "he") {
			setCurrentLanguage("en");
			localStorage.setItem("language", "en");
		} else {
			setCurrentLanguage("he");
			localStorage.setItem("language", "he");
		}
		window.location.reload();
	};

	return (
		<>
			<div id="languageSelection">
				<LanguagesSelection
					toggleLanguage={toggleLanguage}
					currentLanguage={currentLanguage}
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
