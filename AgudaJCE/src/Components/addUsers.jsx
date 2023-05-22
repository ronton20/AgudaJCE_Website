import React, { useState } from "react";
import languages from "../modules/languages";
import InputField from "./InputField.jsx";
import "../css/addUsers.css";

import Papa from "papaparse";
import { app, auth, db } from "../firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, addDoc, setDoc, getDocs, query } from "firebase/firestore";

function AddUsers(props) {
	const languageHelper = languages[props.currentLanguage].addUsers;
	const ids = {
		firstName: "add_users_first_name",
		lastName: "add_users_last_name",
		id: "add_users_id",
		phone: "add_users_phone",
		email: "add_users_email",
		uploadFile: "add_users_upload_file",
		uploadFileLabel: "add_users_upload_file_label",
	};
	const handleSignUp = async (e) => {
		e.preventDefault();
		const id_number = document.getElementById(`input_field_${ids.id}`).value;
		const first_name = document.getElementById(`input_field_${ids.firstName}`).value;
		const last_name = document.getElementById(`input_field_${ids.lastName}`).value;
		const phone = document.getElementById(`input_field_${ids.phone}`).value;
		const email = document.getElementById(`input_field_${ids.email}`).value;

		addUser({
			id: id_number,
			email: email,
			first_name: first_name,
			last_name: last_name,
			phone: phone,
		});
	};

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (!file || !file.name.endsWith(".csv") || file.type !== "text/csv" || !file.size) {
			return;
		}
		parseCSV(file);
	};

	const parseCSV = (file) => {
		const reader = new FileReader();

		Papa.parse(file, {
			header: true,
			skipEmptyLines: true,
			complete: async function (results) {
				for (const user of results.data) {
					const userId = user.id.length < 9 ? "0" + user.id : user.id;
					addUser({
						id: userId,
						email: user.email,
						first_name: user.first_name,
						last_name: user.last_name,
						phone: "0" + user.phone,
					});
				}
			},
		});
	};

	const addUser = async ({
		id = "",
		email = "",
		first_name = "",
		last_name = "",
		phone = "",
		isAdmin = false,
	}) => {
		try {
			// Create a new user with the provided email and password
			await createUserWithEmailAndPassword(auth, email, id);

			// Create a user document in the "users" collection with the same UID and isAdmin set to false
			const userRef = collection(db, "Users");

			await addDoc(userRef, {
				id: id,
				first_name: first_name,
				last_name: last_name,
				email: email,
				phone: phone,
				isAdmin: isAdmin,
			});

			// User creation successful
			console.log("User created successfully");
		} catch (error) {
			// Handle any errors
			console.error("User creation error:", error);
		}
	};

	return (
		<div className="add_users_div">
			<h2>{languageHelper.header}</h2>
			<form className="add_users_form" onSubmit={handleSignUp}>
				<InputField _id={ids.firstName} label={languageHelper.firstName} type="text" />
				<InputField _id={ids.lastName} label={languageHelper.lastName} type="text" />
				<InputField _id={ids.email} label={languageHelper.email} type="email" />
				<InputField _id={ids.id} label={languageHelper.id} type="text" />
				<InputField _id={ids.phone} label={languageHelper.phone} type="text" />
				<button className="submit_button" type="submit">
					{languageHelper.submit}
				</button>
			</form>
			<label id={ids.uploadFileLabel} className="submit_button" htmlFor={ids.uploadFile}>
				{languageHelper.chooseFile}
				<input id={ids.uploadFile} type="file" accept=".csv" onChange={handleFileChange} />
			</label>
		</div>
	);
}

export default AddUsers;
