import React, { useEffect, useState } from "react";
import { app, db } from "../firebase.js";
import { collection, getDocs } from "firebase/firestore";
import "./mainPage.css";
import { Link } from "react-router-dom";
import Login from "../Components/Login.jsx";

function MainPage(props) {
	function toggleLogin() {
		document.getElementById("login_div").classList.toggle("active");
		document.getElementById("blur_background").classList.toggle("active");
	}

	const handleLogout = () => {
		props.setUser({});
		localStorage.clear();

		// refresh page after logout
		window.location.reload(); //plaster
	};

	return (
		<div id="main_page" className="page">
			{props.user ? (
				<div id="logout_button_div">
					<button
						id="logout_button"
						className="submit_button"
						onClick={() => {
							handleLogout();
						}}
					>
						{props.languageHelper.logout.submit}
					</button>
				</div>
			) : (
				<div id="login_button_div">
					<button
						id="login_button"
						className="submit_button"
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
				<Login
					languageHelper={props.languageHelper.login}
					setUser={props.setUser}
					toggleLogin={toggleLogin}
				/>
			</div>
			<div id="blur_background" onClick={toggleLogin}></div>
		</div>
	);
}

export default MainPage;
