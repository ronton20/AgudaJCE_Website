import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase.js";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./ManageAgudaMembers.css";

import AddAgudaMembers from "../Components/AddAgudaMembers.jsx";
import AgudaMember from "../Components/AgudaMember.jsx";
import NavBar from "../Components/NavBar";

function ManageAgudaMembers(props) {
	const [user, loading, error] = useAuthState(auth);
	const [isAdmin, setIsAdmin] = useState(false);
	const [agudaMembers, setAgudaMembers] = useState([]);
	const navigate = useNavigate();

	async function updateMembers() {
		const querySnapshot = await getDocs(collection(db, "AgudaMembers"));
		const members = querySnapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}));
		setAgudaMembers(members);
	}

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

	useEffect(() => {
		updateMembers();
	}, []);

	return (
		<div id="manage_aguda_members_page" className="page">
			{isAdmin ? <NavBar languageHelper={props.languageHelper.navBar} /> : <></>}
			<h1 id="manage_aguda_members_title">
				{props.languageHelper.manageAgudaMembers.header}
			</h1>
			<div id="addMembers" className="glassify">
				<AddAgudaMembers
					languageHelper={props.languageHelper.addAgudaMembers}
					updateMembers={updateMembers}
				/>
			</div>
			<div id="agudaMembers" className="glassify">
				{agudaMembers.map((member) => (
					<AgudaMember
						key={member.id}
						data={member}
						removable={true}
						updateMembers={updateMembers}
					/>
				))}
			</div>
		</div>
	);
}

export default ManageAgudaMembers;
