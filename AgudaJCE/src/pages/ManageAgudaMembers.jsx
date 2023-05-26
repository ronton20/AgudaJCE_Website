import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase.js";
import { collection, getDocs } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./ManageAgudaMembers.css";

import AddAgudaMembers from "../Components/AddAgudaMembers.jsx";
import AgudaMember from "../Components/AgudaMember.jsx";

function ManageAgudaMembers(props) {
	const [user, loading, error] = useAuthState(auth);
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
		if (loading) return;
		if (!user) return navigate("/");
	}, [user, loading]);

	useEffect(() => {
		updateMembers();
	}, []);

	return (
		<div id="manage_aguda_members_page" className="page">
			<h1 id="manage_aguda_members_title">
				{props.languageHelper.manageAgudaMembers.header}
			</h1>
			<div id="addMembers">
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
