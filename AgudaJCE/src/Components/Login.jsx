import React, { useState } from "react";
import languages from "../modules/languages";
import InputField from "./InputField";
import "../css/Login.css";

import { app, auth, db } from "../firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";

function Login(props) {

	const handleSubmit = async (e) => {
		e.preventDefault();
		const email = document.getElementById("input_field_Email").value;
		const password = document.getElementById("input_field_Password").value;
		try {
			// Sign in the user using the custom authentication method
			const { user } = await signInWithEmailAndPassword(auth, email, password);

			// Login successful
			// console.log(user);
			// console.log(user.uid);

			//  --------------------------------------------------- ADD AND CHECK WHEN FIRESTORE IS READY ---------------------------------------------------
			// Check the admin role in Firestore
			const docRef = doc(db, "Users", user.uid);
			const docSnap = await getDoc(docRef);

			if (docSnap.exists()) {
				console.log("Document data:", docSnap.data());
			} else {
			// docSnap.data() will be undefined in this case
				console.log("No such document!");
			} 

			snapshot.forEach(doc => {
				console.log(doc.id, '=>', doc.data());
			})
			
			//TODO: rout to home page
			if(isAdmin) {
				// goto admin page
			}
			else {
			// goto user page
			}
    
		} catch (error) {
			// Handle any errors
			if (error.code == "auth/user-not-found") {
				alert(languages[props.currentLanguage].login.error_user_not_found);
			} else if (error.code == "auth/wrong-password") {
				alert(languages[props.currentLanguage].login.error_wrong_password);
			} else {
				alert(error);
			}
		}
	};

	const loginText = languages[props.currentLanguage].login;
	return (
		<div className="login_div">
			<h1>{loginText.header}</h1>
			<form className="login_form" onSubmit={handleSubmit}>
				<InputField	label="Email" type="email" />
				<InputField	label="Password" type="password" />
				{/* <div className="login_field">
					<label>{loginText.email}:</label>
					<input
						type="email"
						value={email}
						required
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className="login_field">
					<label>{loginText.password}:</label>
					<input
						type="password"
						value={password}
						required
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div> */}
				<button className="login_submit_button" type="submit">
					{loginText.submit}
				</button>
			</form>
		</div>
	);
}

export default Login;
