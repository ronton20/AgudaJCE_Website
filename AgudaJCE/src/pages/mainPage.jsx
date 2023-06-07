import React, { useState, useEffect, useRef } from "react";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Link } from "react-scroll";

import "./mainPage.css";
import loginImg from "../assets/login.png";
import logoutImg from "../assets/logout.png";
import contactUsImg from "../assets/contact_us_2.jpg";

import Login from "../Components/Login.jsx";
import ContactUs from "../Components/ContactUs";
import NavBar from "../Components/NavBar";
import Action from "../Components/Action";
import AgudaMember from "../Components/AgudaMember.jsx";

function MainPage(props) {
	const [user, loading, error] = useAuthState(auth);
	const [isAdmin, setIsAdmin] = useState(false);
	const navigate = useNavigate();

	const [agudaMembers, setAgudaMembers] = useState([]);

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

	// Get the aguda members from the database
	useEffect(() => {
		async function updateMembers() {
			const querySnapshot = await getDocs(collection(db, "AgudaMembers"));
			const members = querySnapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
			setAgudaMembers(members);
		}
		updateMembers();
	}, []);

	const handleLogout = () => {
		signOut(auth);
		setIsAdmin(false);
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
				{/* Login/Logout button */}
				{user ? (
					<div className="login_button_div">
						<button
							id="logout_button"
							className="login_button"
							onClick={() => {
								handleLogout();
							}}
						>
							<img src={logoutImg} alt="logout" />
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
							<img src={loginImg} alt="login" />
						</button>
					</div>
				)}
			</nav>
			{isAdmin ? <NavBar languageHelper={props.languageHelper.navBar} lower={true} /> : <></>}
			{/* MAIN PAGE STARTS HERE */}
			<main id="main_page_content">
				<section id="section_aguda">
					<div id="section_aguda_content" className="section_content glassify">
						<div id="aguda_text">
							<h1>{props.languageHelper.mainPage.header}</h1>
							<p>{props.languageHelper.mainPage.aboutText}</p>
						</div>
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
									onClick={() => goTo("/marathons")}
								/>
								<Action
									title={props.languageHelper.actions.materials}
									img="https://unsplash.it/600/700"
									href="https://www.dropbox.com/sh/yt2y1sdmx55tlju/AAAkccJEqrUckSbvVo4lQpRra?dl=0"
								/>
							</div>
						</div>
					</section>
				)}
				<section id="section_aguda_members">
					<div className="section_content">
						<h2>{props.languageHelper.navBar.agudaMembers}</h2>
						<div id="aguda_members_div">
							{agudaMembers.map((member) => (
								<AgudaMember
									key={member.id}
									data={member}
									removable={false}
									updateMembers={null}
								/>
							))}
						</div>
					</div>
				</section>
				<section id="section_events"></section>
				{!user ? (
					<></>
				) : (
					<section id="section_contact_us">
						<div className="section_content">
							<h2>{props.languageHelper.navBar.contactUs}</h2>
							<div id="contact_us_div">
								<ContactUs languageHelper={props.languageHelper.contactUs} />
								<img src={contactUsImg} alt="contact-us-image" />
							</div>
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
