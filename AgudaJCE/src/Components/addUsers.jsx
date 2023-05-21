import React, { useState } from "react";
import languages from "../modules/languages";
import LanguagesSelection from "./languages_selection";
import InputField from "./InputField.jsx";
// import '../css/UserHandle.css';

import Papa from "papaparse";
import { app, auth, db } from "../firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, addDoc, setDoc, getDocs, query} from "firebase/firestore";

function SignUp() {


	const handleSignUp = async (e) => {
		e.preventDefault();
		const id_number = document.getElementById("input_field_ID").value
		const first_name = document.getElementById("input_field_First_Name").value
		const last_name = document.getElementById("input_field_Last_Name").value
		const phone = document.getElementById("input_field_Phone_Number").value
		const email = document.getElementById("input_field_Email").value
		
		addUser({id: id_number, email:email, first_name:first_name, last_name:last_name, phone:phone})
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
					addUser({id:userId, email:user.email, first_name:user.first_name, last_name:user.last_name, phone:'0'+user.phone})
				}
			},
		});
	};

	const addUser = async ({id="", email="", first_name="", last_name="", phone="", isAdmin=false}) => {
		try {
			// Create a new user with the provided email and password
			await createUserWithEmailAndPassword(auth, email, id);

			// Create a user document in the "users" collection with the same UID and isAdmin set to false
			const userRef = collection(db, "Users")

			await addDoc(userRef, {
				id:id,
				first_name:first_name,
				last_name:last_name,
				email:email,
				phone:phone,
				isAdmin:isAdmin
			});

			// User creation successful
			console.log("User created successfully");

		} catch (error) {
			// Handle any errors
			console.error("User creation error:", error);
		}
	};

	return (
		<div>
			<h2>Sign Up</h2>
			<form onSubmit={handleSignUp}>
				<InputField label="First Name" type="text" />
				<InputField	label="Last Name" type="text" />
				<InputField	label="Email" type="email" />
				<InputField label="ID" type="text" />
				<InputField label="Phone Number" type="text" />
				<button type="submit">Sign Up</button>
			</form>
			<input type="file" onChange={handleFileChange} />
		</div>
	);
}

export default SignUp;
