import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase.js";
import { collection, getDocs } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

import "./ManageAgudaMembers.css";

import AddMarathon from "../Components/AddMarathon.jsx";
import Marathon from "../Components/Marathon.jsx";

function ManageMarathons(props) {
	const [user, loading, error] = useAuthState(auth);
	const [marathons, setMarathons] = useState([]);
	const navigate = useNavigate();

	async function updateMarathons() {
		const querySnapshot = await getDocs(collection(db, "Marathons"));
		const marathons = querySnapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}));
		setMarathons(marathons);
	}

	useEffect(() => {
		if (loading) return;
		if (!user) return navigate("/");
	}, [user, loading]);

	useEffect(() => {
		updateMarathons();
	}, []);

	return (
		<div id="manage_marathons_page">
			<div id="addMarathons">
				<AddMarathon
					languageHelper={props.languageHelper.addMarathon}
					updateMarathons={updateMarathons}
				/>
			</div>
			<div id="marathons">
				{marathons.map((marathon) => (
					<Marathon
						key={marathon.id}
						data={marathon}
						removable={true}
						updateMarathons={updateMarathons}
						languageHelper={props.languageHelper.addMarathon}
					/>
				))}
			</div>
		</div>
	);
}

export default ManageMarathons;
