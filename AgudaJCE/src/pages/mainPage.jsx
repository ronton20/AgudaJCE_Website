import React, { useEffect } from "react";
import { auth, db } from "../firebase.js";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";

import "./mainPage.css";

import Login from "../Components/Login.jsx";

function MainPage(props) {
	const [user, loading, error] = useAuthState(auth);
	const navigate = useNavigate();

	function toggleLogin() {
		document.getElementById("login_div").classList.toggle("active");
		document.getElementById("blur_background").classList.toggle("active");
	}

	// Checks if a user is logged in and sets the user state accordingly

	useEffect(() => {
		async function setAdmin() {
			const q = query(collection(db, "Users"), where("email", "==", user.email));
			const querySnapshot = await getDocs(q);
			const isAdmin = querySnapshot.docs[0].data().isAdmin;
			props.setIsAdmin(isAdmin);
		}

		if (loading) return;
		if (user) {
			// Check the admin role in Firestore
			setAdmin();
		}
		navigate("/");
	}, [user, loading]);

	const handleLogout = () => {
		signOut(auth);
		props.setIsAdmin(false);
		window.location.reload();
	};

	return (
		<div id="main_page" className="page">
			{user ? (
				<div className="login_button_div">
					<button
						id="logout_button"
						className="login_button"
						onClick={() => {
							handleLogout();
						}}
					>
						{props.languageHelper.logout.submit}
					</button>
				</div>
			) : (
				<div className="login_button_div">
					<button
						id="login_button"
						className="login_button"
						onClick={() => {
							toggleLogin();
						}}
					>
						{props.languageHelper.login.submit}
					</button>
				</div>
			)}
			<h1>Main Page</h1>

			<div id="login_div">
				<Login languageHelper={props.languageHelper.login} toggleLogin={toggleLogin} />
			</div>
			<div id="blur_background" onClick={toggleLogin}></div>
		</div>
	);
}

export default MainPage;
