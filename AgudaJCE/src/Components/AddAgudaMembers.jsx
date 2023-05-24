import React from "react";
import languages from "../modules/languages";
import InputField from "./InputField.jsx";
import "../css/AddAgudaMembers.css";

import { db } from "../firebase.js";
import { collection, addDoc } from "firebase/firestore";

function AddAgudaMembers(props) {
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
		<div className="add_aguda_members_div glassify">
			<h2>{props.languageHelper.header}</h2>
			<form className="add_aguda_members_form container" onSubmit={addMember}>
				<div className="flex">
					<InputField
						_id={ids.firstName}
						label={props.languageHelper.firstName}
						type="text"
					/>
					<InputField
						_id={ids.lastName}
						label={props.languageHelper.lastName}
						type="text"
					/>
					<InputField
						_id={ids.position}
						label={props.languageHelper.position}
						type="text"
					/>
					<InputField _id={ids.img} label={props.languageHelper.img} type="text" />
				</div>
				<button className="submit_button" type="submit">
					{props.languageHelper.submit}
				</button>
			</form>
		</div>
	);
}

export default AddAgudaMembers;
