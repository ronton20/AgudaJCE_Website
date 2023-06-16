import React from "react";
import InputField from "./InputField.jsx";
import "../css/addUsers.css";

import { auth, db } from "../firebase.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, updateDoc, getDocs, doc } from "firebase/firestore";

function AddUser(props) {
	const submit_button = document.getElementById("add_users_submit");

	const ids = {
		firstName: "add_users_first_name",
		lastName: "add_users_last_name",
		id: "add_users_id",
		phone: "add_users_phone",
		email: "add_users_email",
		uploadFile: "add_users_upload_file",
	};
	const handleSignUp = async (e) => {
		e.preventDefault();
		// disable the submit button until the user is created
		submit_button.disabled = true;

		const id_number = document.getElementById(`input_field_${ids.id}`).value;
		const first_name = document.getElementById(`input_field_${ids.firstName}`).value;
		const last_name = document.getElementById(`input_field_${ids.lastName}`).value;
		const phone = document.getElementById(`input_field_${ids.phone}`).value;
		const email = document.getElementById(`input_field_${ids.email}`).value;
		// create the user
		addUser({
			id: id_number,
			email: email,
			first_name: first_name,
			last_name: last_name,
			phone: phone,
			block: false,
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
		const currentUser = auth.currentUser;
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
				block: false,
			});

			// change the submit button to "success" and make it green
			submit_button.innerHTML = props.languageHelper.success;
			submit_button.style.border = "2px solid green";
			// border green
			submit_button.style.color = "green";
			// re-enable the button after 5 seconds
			setTimeout(() => {
				submit_button.disabled = false;
				submit_button.innerHTML = props.languageHelper.submit;
				submit_button.style.border = "";
				submit_button.style.color = "";
			}, 5000);


			// User creation successful
		} catch (error) {
			// Handle any errors
			console.error("User creation error:", error);
			// remove the block from the user if already created
			if (error.code === "auth/email-already-in-use") {
				// get the user document
				const querySnapshot = await getDocs(collection(db, "Users"));
				// get the user document
				const userRef = doc(db, "Users", querySnapshot.docs[0].id);
				// print the user id
				// update the user document
				await updateDoc(userRef, {
					block: false,
				});
				// change the submit button to "success" and make it green
				submit_button.innerHTML = props.languageHelper.success;
				submit_button.style.border = "2px solid green";
				// border green
				submit_button.style.color = "green";
				// re-enable the button after 5 seconds
				setTimeout(() => {
					submit_button.disabled = false;
					submit_button.innerHTML = props.languageHelper.submit;
					submit_button.style.border = "";
					submit_button.style.color = "";
				}, 5000);
			}
		}
		auth.updateCurrentUser(currentUser);
	};

	return (
		<div className="add_users_div">
			<h2>{props.languageHelper.header}</h2>
			<form className="add_users_form" onSubmit={handleSignUp}>
				<div className="form_row">
					<InputField _id={ids.email} label={props.languageHelper.email} type="email" />
					<InputField _id={ids.id} label={props.languageHelper.id} type="text" pattern="[0-9]{9}"
					/>
				</div>
				<div className="form_row">
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
					<InputField _id={ids.phone} label={props.languageHelper.phone} type="text" pattern="[0-9]{10}"/>
				</div>
				<button id="add_users_submit" className="submit_button" type="submit">
					{props.languageHelper.submit}
				</button>
			</form>
		</div>
	);
}

export default AddUser;
