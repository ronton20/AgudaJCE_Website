import React, { useState } from "react";
import languages from "../modules/languages";
import InputField from "./InputField";
import "../css/Login.css";

import { app, auth, db } from "../firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";

function Login(props) {
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
			await signInWithEmailAndPassword(auth, email, password);

			// Check the admin role in Firestore
			const q = query(collection(db, "Users"), where("email", "==", email));
			const querySnapshot = await getDocs(q);

			const isAdmin = querySnapshot.docs[0].data().isAdmin;

			props.setUser({ email: email, password: password, isAdmin: isAdmin });
			localStorage.setItem(
				"user",
				JSON.stringify({ email: email, password: password, isAdmin: isAdmin })
			);
			props.toggleLogin();
			window.location.reload(); //plaster
		} catch (error) {
			// Handle any errors
			if (error.code == "auth/user-not-found") {
				alert(props.languageHelper.error_user_not_found);
			} else if (error.code == "auth/wrong-password") {
				alert(props.languageHelper.error_wrong_password);
			} else {
				alert(error);
			}
		}
	};

	return (
		<div className="login_div">
			<h1>{props.languageHelper.header}</h1>
			<form className="login_form" onSubmit={handleSubmit}>
				<InputField _id={ids.email} label={props.languageHelper.email} type="email" />
				<InputField
					_id={ids.password}
					label={props.languageHelper.password}
					type="password"
				/>
				<button className="submit_button" type="submit">
					{props.languageHelper.submit}
				</button>
			</form>
		</div>
	);
}

export default Login;
