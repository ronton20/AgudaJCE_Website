import { useState } from "react";
import "./App.css";
import LanguagesSelection from "./Components/languages_selection.jsx";
import Login from "./Components/Login.jsx";
import AddUsers from "./Components/addUsers.jsx";
import AddEvent from "./Components/addEvent.jsx";

function App() {
	const [currentLanguage, setCurrentLanguage] = useState("en");

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
		<div id="main_page">
			<LanguagesSelection
				handleLanguageChange={handleLanguageChange} // Pass the event handler as a prop
				selectedLanguage={currentLanguage} // Pass the selected language as a prop
			/>
			<div id="login_form">
				<Login
					currentLanguage={currentLanguage} // Pass the selected language as a prop
				/>
			</div>
			{/* <div id="add_users_form">
				<AddUsers
					currentLanguage={currentLanguage} // Pass the selected language as a prop
				/>
			</div> */}
			{/* <div id="add_event">
				<AddEvent
					currentLanguage={currentLanguage} // Pass the selected language as a prop
				/>
			</div> */}
		</div>
	);
}

export default App;
