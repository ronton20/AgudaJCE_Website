import React, { useEffect, useState } from "react";
import { app, db } from "../firebase.js";
import { collection, getDocs } from "firebase/firestore";
import "./mainPage.css";

import AgudaMember from "../Components/AgudaMember.jsx";

function MainPage() {
	const [agudaMembers, setAgudaMembers] = useState([]);

	useEffect(() => {
		async function updateMembers() {
			const querySnapshot = await getDocs(collection(db, "AgudaMembers"));
			const members = querySnapshot.docs.map((doc) => doc.data());
			setAgudaMembers(members);
		}
		updateMembers();
	}, []);

	return (
		<div id="main_page">
			<h1>AgudaJCE</h1>
			<div id="agudaMembers">
				{agudaMembers.map((member, index) => (
					<AgudaMember key={index} data={member} />
				))}
			</div>
		</div>
	);
}

export default MainPage;
