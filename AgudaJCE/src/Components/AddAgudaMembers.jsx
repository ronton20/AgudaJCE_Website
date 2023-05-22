import React from "react";
import languages from "../modules/languages";
import InputField from "./InputField.jsx";
// import "./addAgudaMembers.css";

import { db } from "../firebase.js";
import { collection, addDoc } from "firebase/firestore";

function AddAgudaMembers(props) {
	const languageHelper = languages[props.currentLanguage].addAgudaMembers;
	const ids = {
		firstName: "add_aguda_members_first_name",
		lastName: "add_aguda_members_last_name",
		position: "add_aguda_members_position",
		img: "add_aguda_members_img",
	};

	const addMember = async (e) => {
		e.preventDefault();
		const first_name = document.getElementById(`input_field_${ids.firstName}`).value;
		const last_name = document.getElementById(`input_field_${ids.lastName}`).value;
		const position = document.getElementById(`input_field_${ids.position}`).value;
		const img = document.getElementById(`input_field_${ids.img}`).value;

		// create a new document in the AgudaMembers collection
		const agudaMemberRef = collection(db, "AgudaMembers");
		await addDoc(agudaMemberRef, {
			// add the image to the document
			Name: first_name + " " + last_name,
			Position: position,
			Img: img,
		});

		// update the aguda members list
		props.updateMembers();
	};

	return (
		<div className="add_aguda_members_div">
			<h2>{languageHelper.header}</h2>
			<form className="add_aguda_members_form" onSubmit={addMember}>
				<InputField _id={ids.firstName} label={languageHelper.firstName} type="text" />
				<InputField _id={ids.lastName} label={languageHelper.lastName} type="text" />
				<InputField _id={ids.position} label={languageHelper.position} type="text" />
				<InputField _id={ids.img} label={languageHelper.img} type="text" />
				<button className="submit_button" type="submit">
					{languageHelper.submit}
				</button>
			</form>
		</div>
	);
}

export default AddAgudaMembers;
