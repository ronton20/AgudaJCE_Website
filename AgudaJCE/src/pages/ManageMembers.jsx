import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase.js";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

import "./ManageMembers.css";

import AddUser from "../Components/addUsers.jsx";
import UpdateUsers from "../Components/UpdateUsers.jsx";
import NavBar from "../Components/NavBar";
import Background from "../Components/Background.jsx";

function ManageMembers(props) {
	const [user, loading, error] = useAuthState(auth);
	const [isAdmin, setIsAdmin] = useState(false);
	const navigate = useNavigate();

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

	return (
		<div id="manage_members_page" className="page">
			<Background />
			{isAdmin ? <NavBar languageHelper={props.languageHelper.navBar} /> : <></>}
			<div className="page_content">
				<h1 id="manage_members_title">{props.languageHelper.manageMembers.header}</h1>
				<div id="add_member" className="glassify">
					<AddUser languageHelper={props.languageHelper.addUsers} />
				</div>
				<div id="update_members" className="glassify">
					<UpdateUsers languageHelper={props.languageHelper.addUsers} />
				</div>
			</div>
		</div>
	);
}

export default ManageMembers;
