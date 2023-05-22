import React, { useState } from "react";
import languages from "../modules/languages";
import InputField from "./InputField";
import "../css/Login.css";

import { app, auth, db } from "../firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";
// import { collection } from "firebase/firestore";
// import { doc, getDoc } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";

function Login(props) {
	const languageHelper = languages[props.currentLanguage].login;
	const ids = {
		email: "login_email",
		password: "login_password",
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		const email = document.getElementById(`input_field_${ids.email}`).value;
		const password = document.getElementById(`input_field_${ids.password}`).value;
		try {
			// Sign in the user using the custom authentication method
			const { user } = await signInWithEmailAndPassword(auth, email, password);

			// Login successful
			// console.log(user);
			// console.log(user.uid);

			//  --------------------------------------------------- ADD AND CHECK WHEN FIRESTORE IS READY ---------------------------------------------------
			// Check the admin role in Firestore
			const q = query(collection(db, "Users"), where("email", "==", email));
			const querySnapshot = await getDocs(q);

			const isAdmin = querySnapshot.docs[0].data().isAdmin;

			//TODO: rout to home page
			if (isAdmin) {
				// goto admin page
				console.log("go to admin page");
			} else {
				// goto user page
				console.log("go to user page");
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

	return (
		<div className="login_div">
			<h1>{languageHelper.header}</h1>
			<form className="login_form" onSubmit={handleSubmit}>
				<InputField _id={ids.email} label={languageHelper.email} type="email" />
				<InputField _id={ids.password} label={languageHelper.password} type="password" />
				<button className="submit_button" type="submit">
					{languageHelper.submit}
				</button>
			</form>
		</div>
	);
}

export default Login;
