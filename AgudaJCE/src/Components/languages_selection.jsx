import { React, useState, useEffect } from "react";
import "../css/languages_selection.css";

import hebrewFlag from "../assets/israel.png";
import englishFlag from "../assets/usa.png";

function LanguagesSelection(props) {
	const [language, setLanguage] = useState(props.currentLanguage);

	useEffect(() => {
		setLanguage(props.currentLanguage);
	}, [props.currentLanguage]);

	return (
		<div className="languages_tab">
			<img
				src={language === "he" ? hebrewFlag : englishFlag}
				alt={props.currentLanguage}
				onClick={() => props.toggleLanguage()}
			/>
		</div>
	);
}

export default LanguagesSelection;
