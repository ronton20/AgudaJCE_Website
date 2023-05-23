import React from "react";
import "../css/AgudaMember.css";

import { db } from "../firebase.js";
import { doc, deleteDoc } from "firebase/firestore";

import RemoveButton from "./RemoveButton.jsx";

function AgudaMember(props) {
	const deleteMember = async (e) => {
		e.preventDefault();
		const docId = props.data.id;

		try {
			await deleteDoc(doc(db, "AgudaMembers", docId));
			props.updateMembers();
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<div className="agudaMember">
			<div className="agudaMemberOverlay">
				<img src={props.data.Img} alt={props.data.Name} />
				{props.removable ? <RemoveButton onClick={deleteMember} /> : <></>}
			</div>
			<h3>{props.data.Name}</h3>
			<p>{props.data.Position}</p>
		</div>
	);
}

export default AgudaMember;
