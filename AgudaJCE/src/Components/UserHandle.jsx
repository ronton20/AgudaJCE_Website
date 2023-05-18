import React, { useState } from "react";
import languages from "../modules/languages";
import LanguagesSelection from "./languages_selection";
// import '../css/UserHandle.css';

import { app, auth, db } from "../firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { parse } from "csv-parser";

function SignUp() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSignUp = async (e) => {
		e.preventDefault();

		try {
			// Create a new user with the provided email and password
			await createUserWithEmailAndPassword(auth, email, password);

			// User creation successful
			const user = auth.currentUser;
			const { uid } = user;

			// Create a user document in the "users" collection with the same UID and isAdmin set to false
			const userRef = db.collection("users").doc(uid);
			await userRef.set({
				isAdmin: false,
			});

			// User creation successful
			console.log("User created successfully");
			// TODO: Redirect to a success page or perform any other necessary actions
		} catch (error) {
			// Handle any errors
			console.error("User creation error:", error);
		}
	};

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			parseCSV(file);
		}
	};

	const parseCSV = (file) => {
		const reader = new FileReader();

		reader.onload = async (e) => {
			const csvData = e.target.result;

			parse(csvData, { columns: true }, async (err, results) => {
				if (err) {
					console.error("CSV parsing error:", err);
					return;
				}

				// Process the parsed user information
				for (const user of results) {
					// Use the email, password, and isAdmin to create a new user in Firebase Auth and Firestore
					// You can utilize the previous code we discussed for creating a user and Firestore document
					try {
						// Create a new user with the provided email and id as first password
						await createUserWithEmailAndPassword(auth, user.email, user.id);

						// User creation successful
						const createdUser = auth.currentUser;
						const { uid } = createdUser;

						// Create a user document in the "users" collection with the same UID and isAdmin set to false
						const userRef = db.collection("Users").doc(uid);
						await userRef.set({
							id: user.id,
							email: user.email,
							firstName: user.firstName,
							lastName: user.lastName,
							phone: user.phone,
							isAdmin: false,
						});

						// User creation successful
						console.log("User created successfully");
						// TODO: Redirect to a success page or perform any other necessary actions
					} catch (error) {
						// Handle any errors
						console.error("User creation error:", error);
					}
				}

				console.log("CSV file parsed successfully");
				// TODO: Perform any necessary actions after parsing the CSV file
				console.log(results);
			});
		};

		reader.readAsText(file);
	};

	return (
		<div>
			<h2>Sign Up</h2>
			<form onSubmit={handleSignUp}>
				<label>
					Email:
					<input
						type="email"
						value={email}
						required
						onChange={(e) => setEmail(e.target.value)}
					/>
				</label>
				<br />
				<label>
					Password:
					<input
						type="text"
						value={password}
						required
						onChange={(e) => setPassword(e.target.value)}
					/>
				</label>
				<br />
				<button type="submit">Sign Up</button>
			</form>
			<input type="file" onChange={handleFileChange} />
		</div>
	);
}

export default SignUp;
