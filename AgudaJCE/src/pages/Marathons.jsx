import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, getDocs, query, where } from "firebase/firestore";

import NavBar from "../Components/NavBar";
import Marathon from "../Components/Marathon.jsx";
import "./Marathons.css";

function Marathons(props) {
	const [user, loading] = useAuthState(auth);
	const [isAdmin, setIsAdmin] = useState(false);
	const [marathons, setMarathons] = useState([]);

	async function updateMarathons() {
		const querySnapshot = await getDocs(collection(db, "Marathons"));
		const marathons = querySnapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}));
		setMarathons(marathons);
	}

	useEffect(() => {
		updateMarathons();
	}, []);

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
		<div id="marathons_page" className="page">
			{isAdmin ? <NavBar languageHelper={props.languageHelper.navBar} /> : <></>}

			<h1>{props.languageHelper.marathons.header}</h1>
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
						{marathons.map((marathon) => (
							<Marathon
								key={marathon.id}
								data={marathon}
								languageHelper={props.languageHelper.marathon}
							/>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default Marathons;
