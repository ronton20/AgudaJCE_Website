import { useState } from "react";
import "./App.css";
import LanguagesSelection from "./Components/languages_selection.jsx";
import MainPage from "./pages/mainPage.jsx";
import Login from "./Components/Login.jsx";
import AddUsers from "./Components/addUsers.jsx";
import AddEvent from "./Components/addEvent.jsx";

function App() {
	const [currentLanguage, setCurrentLanguage] = useState("en");
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false);
	const [currentUserEmail, setCurrentUserEmail] = useState("");

	const handleLanguageChange = (e) => {
		setCurrentLanguage(e.target.value);
		// console.log(e.target.value);
		if (currentLanguage == "he") {
			document.getElementById("root").setAttribute("dir", "ltr");
		} else {
			document.getElementById("root").setAttribute("dir", "rtl");
		}
	};

	return (
		<div id="app_main_page">
			<LanguagesSelection
				handleLanguageChange={handleLanguageChange} // Pass the event handler as a prop
				selectedLanguage={currentLanguage}
			/>
			<MainPage currentLanguage={currentLanguage} />
			{/* <div id="login_form">
				<Login currentLanguage={currentLanguage} />
			</div> */}
			{/* <div id="add_users_form">
				<AddUsers currentLanguage={currentLanguage} />
			</div> */}
			{/* <div id="add_event">
				<AddEvent currentLanguage={currentLanguage} />
			</div> */}
		</div>
	);
}

export default App;
