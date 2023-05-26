import React from "react";
import languages from "../modules/languages";
import InputField from "./InputField.jsx";
import "../css/addUsers.css";

import Papa from "papaparse";
import { app, auth, db } from "../firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";



function AddUsers(props) {
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

				// get all the users IDs from the DB
				const querySnapshot = await getDocs(collection(db, "Users"));
				const users = querySnapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				for (const csvUser of results.data) {
					const userId = csvUser.idNumber.length < 9 ? "0" + csvUser.idNumber : csvUser.idNumber;
					// if the user in the CSV and not in the DB already add the user
					const existingUser = users.find((u) => u.id === userId);
					if (!existingUser) {
						try {
							// Create a new user with the provided email and password
							await createUserWithEmailAndPassword(auth, csvUser.email, userId);

							// Create a user document in the "users" collection with the same UID and isAdmin set to false
							const userRef = collection(db, "Users");

							await addDoc(userRef, {
								id: userId,
								email: csvUser.email,
								first_name: csvUser.firstName,
								last_name: csvUser.lastName,
								phone: "0" + csvUser.phone,
								isAdmin:
								csvUser.isAdmin === "TRUE" || csvUser.isAdmin === "true" ? true : false,
							});

							// User creation successful
						} catch (error) {
							// Handle any errors
							console.error("User creation error:", error);
						}
					}
					// if the user in the CSV and in the DB already update the user and delete the user from users array
					else {
						const docId = querySnapshot.docs.find((doc) => doc.data().id === userId).id;
						// try to update the user
						try {
							const userRef = doc(db, "Users", docId);
							await updateDoc(userRef, {
								email: csvUser.email,
								first_name: csvUser.firstName,
								last_name: csvUser.lastName,
								phone: "0" + csvUser.phone,
								isAdmin:
								csvUser.isAdmin === "TRUE" || csvUser.isAdmin === "true" ? true : false,
							});
						} catch (error) {
							// Handle any errors
							console.error("User update error:", error);
						}
						// delete the user from the users array
						users.splice(users.indexOf(existingUser), 1);
					}
						
				}
				// if the user in the DB and not in the CSV delete the user
				for (const user of users) {
					const docId = querySnapshot.docs.find((doc) => doc.data().id === user.id).id;
					const userRef = doc(db, "Users", docId);
					// delete the document
					// await deleteDoc(userRef);
					// get all the users from the authentification
					// console.log(uid);
					// delete the user
					
					await auth.deleteUser(uid);
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
		} catch (error) {
			// Handle any errors
			console.error("User creation error:", error);
		}
	};

	return (
		<div className="add_users_div">
			<h2>{props.languageHelper.header}</h2>
			<form className="add_users_form" onSubmit={handleSignUp}>
				<InputField
					_id={ids.firstName}
					label={props.languageHelper.firstName}
					type="text"
				/>
				<InputField _id={ids.lastName} label={props.languageHelper.lastName} type="text" />
				<InputField _id={ids.email} label={props.languageHelper.email} type="email" />
				<InputField _id={ids.id} label={props.languageHelper.id} type="text" />
				<InputField _id={ids.phone} label={props.languageHelper.phone} type="text" />
				<button className="submit_button" type="submit">
					{props.languageHelper.submit}
				</button>
			</form>
			<label id={ids.uploadFileLabel} className="choose_file_button" htmlFor={ids.uploadFile}>
				{props.languageHelper.chooseFile}
				<input id={ids.uploadFile} type="file" accept=".csv" onChange={handleFileChange} />
			</label>
		</div>
	);
}

export default AddUsers;
