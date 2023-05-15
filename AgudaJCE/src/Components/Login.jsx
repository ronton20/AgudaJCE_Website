import React, { useState } from "react";
import languages from "../modules/languages";
import "../css/Login.css";

import { app, auth, db } from "../firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";

function Login(props) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			// Sign in the user using the custom authentication method
			const { user } = await signInWithEmailAndPassword(auth, email, password);

			// Login successful
			console.log(user);
			console.log(user.uid);

			/* --------------------------------------------------- ADD AND CHECK WHEN FIRESTORE IS READY ---------------------------------------------------
       // Check the admin role in Firestore
       const userRef = db.collection('users').doc(user.uid);
       const userSnapshot = await userRef.get();
       const isAdmin = userSnapshot.exists && userSnapshot.data().admin;
       
       //TODO: rout to home page
       if(isAdmin){
         // goto admin page
        }
        else{
          // goto user page
        }
      */
		} catch (error) {
			// Handle any errors
			if (error.code == "auth/user-not-found") {
				alert(languages[props.currentLanguage].login.error_user_not_found);
			} else if (error.code == "auth/wrong-password") {
				alert(languages[props.currentLanguage].login.error_wrong_password);
			} else {
				alert(languages[props.currentLanguage].login.error_general);
			}
		}
	};

	const loginText = languages[props.currentLanguage].login;
	return (
		<div className="login_div">
			<h1>{loginText.header}</h1>
			<form onSubmit={handleSubmit}>
				<label>
					{loginText.email}:
					<input
						type="email"
						value={email}
						required
						onChange={(e) => setEmail(e.target.value)}
					/>
				</label>
				<br />
				<label>
					{loginText.password}:
					<input
						type="password"
						value={password}
						required
						onChange={(e) => setPassword(e.target.value)}
					/>
				</label>
				<br />
				<button type="submit">{loginText.submit}</button>
			</form>
		</div>
	);
}

export default Login;
