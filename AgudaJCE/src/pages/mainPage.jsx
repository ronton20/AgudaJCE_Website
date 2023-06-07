import React, { useState, useEffect, useRef } from "react";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Link } from "react-scroll";

import "./mainPage.css";

import Login from "../Components/Login.jsx";
import ContactUs from "../Components/ContactUs";
import NavBar from "../Components/NavBar";
import Action from "../Components/Action";

function MainPage(props) {
	const [user, loading, error] = useAuthState(auth);
	const [isAdmin, setIsAdmin] = useState(false);
	const navigate = useNavigate();

	// Toggles the login form
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
			setIsAdmin(isAdmin);
		}

		if (loading) return;
		if (user) {
			// Check the admin role in Firestore
			setAdmin();
		} else navigate("/");
	}, [user, loading]);

	const handleLogout = () => {
		signOut(auth);
		props.setIsAdmin(false);
		window.location.reload();
	};

	function goTo(path) {
		navigate(path);
	}

	return (
		<div id="main_page" className="page">
			<nav id="main_page_nav_bar">
				<div id="logo_div">
					<img
						id="logo"
						src="https://firebasestorage.googleapis.com/v0/b/agudajce-51667.appspot.com/o/Assets%2FAgudaJCE_Logo.jpg?alt=media&token=94f93a3d-899d-434c-97f2-9c8b6b4438f9&_gl=1*jra0q4*_ga*MTE4Mzc5OTA2NS4xNjg0NDIzMzAy*_ga_CW55HF8NVT*MTY4NTYxNDE3OC45LjEuMTY4NTYxNDIzMS4wLjAuMA.."
						alt="logo"
					/>
				</div>
				<ul>
					<li>
						<Link
							to="section_aguda"
							spy={true}
							smooth={true}
							offset={-80}
							duration={500}
						>
							{props.languageHelper.navBar.aguda}
						</Link>
					</li>
					{!user ? (
						<></>
					) : (
						<li>
							<Link
								to="section_actions"
								spy={true}
								smooth={true}
								offset={-80}
								duration={500}
							>
								{props.languageHelper.navBar.actions}
							</Link>
						</li>
					)}
					<li>
						<Link
							to="section_aguda_members"
							spy={true}
							smooth={true}
							offset={-80}
							duration={500}
						>
							{props.languageHelper.navBar.agudaMembers}
						</Link>
					</li>
					<li>
						<Link
							to="section_events"
							spy={true}
							smooth={true}
							offset={-80}
							duration={500}
						>
							{props.languageHelper.navBar.events}
						</Link>
					</li>
					{!user ? (
						<></>
					) : (
						<li>
							<Link
								to="section_contact_us"
								spy={true}
								smooth={true}
								offset={-80}
								duration={500}
							>
								{props.languageHelper.navBar.contactUs}
							</Link>
						</li>
					)}
				</ul>
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
			</nav>
			{isAdmin ? <NavBar languageHelper={props.languageHelper.navBar} /> : <></>}
			{/* MAIN PAGE STARTS HERE */}
			<main id="main_page_content">
				<section id="section_aguda">
					<div className="section_content glassify">
						<div id="aguda_text">
							<h1>{props.languageHelper.mainPage.header}</h1>
							<p>{props.languageHelper.mainPage.aboutText}</p>
						</div>
						<img
							id="aguda_image"
							src="https://firebasestorage.googleapis.com/v0/b/agudajce-51667.appspot.com/o/Assets%2Fcover_photo.png?alt=media&token=f72d9261-1db4-413b-84f4-e0b2c4a2eaf9&_gl=1*1b6zpkt*_ga*MTE4Mzc5OTA2NS4xNjg0NDIzMzAy*_ga_CW55HF8NVT*MTY4NTYyMzY3My4xMS4xLjE2ODU2MjM3MjguMC4wLjA."
							alt="aguda"
						/>
					</div>
				</section>
				{!user ? (
					<></>
				) : (
					<section id="section_actions">
						<div className="section_content">
							<h2>{props.languageHelper.navBar.actions}</h2>
							<div id="actions_div">
								<Action
									title={props.languageHelper.actions.meetingRooms}
									img="https://unsplash.it/600/600"
									onClick={() => goTo("/meeting_rooms")}
								/>
								<Action
									title={props.languageHelper.actions.marathons}
									img="https://unsplash.it/700/600"
									onClick={null}
								/>
								<Action
									title={props.languageHelper.actions.materials}
									img="https://unsplash.it/600/700"
									onClick={null}
								/>
							</div>
						</div>
					</section>
				)}
				<section id="section_aguda_members"></section>
				<section id="section_events"></section>
				{!user ? (
					<></>
				) : (
					<section id="section_contact_us">
						<div className="section_content">
							<h2>{props.languageHelper.navBar.contactUs}</h2>
							<ContactUs languageHelper={props.languageHelper.contactUs} />
						</div>
					</section>
				)}
			</main>
			<div id="login_div">
				<Login languageHelper={props.languageHelper.login} toggleLogin={toggleLogin} />
			</div>
			<div id="blur_background" onClick={toggleLogin}></div>
		</div>
	);
}

export default MainPage;
