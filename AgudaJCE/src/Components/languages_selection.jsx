import React from "react";
import "../css/languages_selection.css";

function LanguagesSelection(props) {
	return (
		<div className="languages_tab">
			<select
				name="languages_tab_selection"
				id="languages_tab_selection"
				onChange={props.handleLanguageChange}
				value={props.currentLanguage}
			>
				<option value="he">עברית</option>
				<option value="en">English</option>
			</select>
		</div>
	);
}

export default LanguagesSelection;
