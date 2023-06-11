import React from "react";
import InputField from "./InputField";
import "../css/Login.css";

import { auth } from "../firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase.js";

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
			// check if user is blocked
			const querySnapshot = await getDocs(collection(db, "Users"));
			const userDoc = querySnapshot.docs.find((doc) => doc.data().email == email);
			if (userDoc.data().block) {
				alert(props.languageHelper.error_user_not_found);
				return;
			}
			// Sign in the user using the custom authentication method
			await signInWithEmailAndPassword(auth, email, password);
			// Close the login modal and refresh the page
			props.toggleLogin();
		} catch (error) {
			alert(props.languageHelper.error_invalid_user);
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
