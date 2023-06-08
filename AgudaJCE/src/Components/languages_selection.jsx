import { React, useState } from "react";
import "../css/languages_selection.css";

import hebrewFlag from "../assets/israel.png";
import englishFlag from "../assets/usa.png";

function LanguagesSelection(props) {
	const [language, setLanguage] = useState("he");

	// Toggles the language
	function toggleLanguage() {
		if (language === "he") setLanguage("en");
		else setLanguage("he");
		props.toggleLanguage();
	}

	return (
		<div className="languages_tab">
			<img
				src={language === "he" ? hebrewFlag : englishFlag}
				alt={props.currentLanguage}
				onClick={toggleLanguage}
			/>
		</div>
	);
}

export default LanguagesSelection;
