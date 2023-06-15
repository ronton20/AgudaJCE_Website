import { React, useState } from "react";
import InputField from "./InputField";
import "../css/Login.css";

import { auth } from "../firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase.js";

function Login(props) {

	const [ errorMessage, setErrorMessage ] = useState("");

	const ids = {
		email: "login_email",
		password: "login_password",
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		// clean the error if there is one
		setErrorMessage("");
		// disable the button to prevent multiple submissions
		const submitButton = e.target.querySelector(".submit_button");
		submitButton.disabled = true;
		
		
		const email = document.getElementById(`input_field_${ids.email}`).value;
		const password = document.getElementById(`input_field_${ids.password}`).value;
		try {
			// check if user is blocked
			const querySnapshot = await getDocs(collection(db, "Users"));
			const userDoc = querySnapshot.docs.find((doc) => doc.data().email == email);
			if (userDoc.data().block) {
				invalidUser(props.languageHelper.error_invalid_user);
				return;
			}
			// Sign in the user using the custom authentication method
			await signInWithEmailAndPassword(auth, email, password);
			// Close the login modal and refresh the page
			props.toggleLogin();
		} catch (error) {
			invalidUser(props.languageHelper.error_invalid_user);
			submitButton.disabled = false;
		}
	};

	const invalidUser = (errorMessage) => {
		setErrorMessage(errorMessage);
	};

	return (
		<div className="login_div">
			<h1>{props.languageHelper.header}</h1>
			{errorMessage === "" ? (<></>) : (<p id="login_error" className="error_message">{ errorMessage }</p>)}
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
