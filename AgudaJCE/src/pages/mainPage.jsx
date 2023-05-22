import React, { useEffect, useState } from "react";
import { app, db } from "../firebase.js";
import { collection, getDocs } from "firebase/firestore";
import "./mainPage.css";
import { Link } from "react-router-dom";

function MainPage(props) {
	
	
	return (
		<div id="main_page">
			<div>
				<Link to="/login">
					<button className="login_button">Login</button>
				</Link>
			</div>
			<h1>Main Page</h1>
		</div>
	);
}

export default MainPage;
