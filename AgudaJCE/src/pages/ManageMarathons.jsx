import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase.js";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

import "./ManageMarathons.css";

import AddMarathon from "../Components/AddMarathon.jsx";
import Marathon from "../Components/Marathon.jsx";
import NavBar from "../Components/NavBar";

function ManageMarathons(props) {
	const [user, loading, error] = useAuthState(auth);
	const [isAdmin, setIsAdmin] = useState(false);
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
		updateMarathons();
	}, []);

	return (
		<div id="manage_marathons_page" className="page">
			{isAdmin ? <NavBar languageHelper={props.languageHelper.navBar} /> : <></>}
			<div className="page_content">
				<h1 id="manage_aguda_members_title">
					{props.languageHelper.manageMarathons.header}
				</h1>
				<div id="addMarathons" className="glassify">
					<AddMarathon
						languageHelper={props.languageHelper.addMarathon}
						updateMarathons={updateMarathons}
					/>
				</div>
				<div className="marathons_table glassify">
					<table>
						<thead>
							<tr>
								<th>{props.languageHelper.marathon.department}</th>
								<th>{props.languageHelper.marathon.course}</th>
								<th>{props.languageHelper.marathon.lecturer}</th>
								<th>{props.languageHelper.marathon.date}</th>
								<th>{props.languageHelper.marathon.price}</th>
								<th>{props.languageHelper.marathon.link}</th>
							</tr>
						</thead>
						<tbody>
							{marathons.map((marathon, index) => (
								<Marathon
									key={index}
									data={marathon}
									removable={true}
									updateMarathons={updateMarathons}
									languageHelper={props.languageHelper.addMarathon}
								/>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

export default ManageMarathons;
