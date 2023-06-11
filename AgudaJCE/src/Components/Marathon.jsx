import React from "react";
import "../css/Marathon.css";
import linkBtn from "../assets/external-link.png";

import { db } from "../firebase.js";
import { doc, deleteDoc } from "firebase/firestore";

import RemoveButton from "./RemoveButton.jsx";

function Marathon(props) {
	const deleteMarathon = async (e) => {
		e.preventDefault();
		const docId = props.data.id;

		try {
			await deleteDoc(doc(db, "Marathons", docId));
			props.updateMarathons();
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<tr className="marathon">
			<td>{props.data.department}</td>
			<td>{props.data.course}</td>
			<td>{props.data.lecturer}</td>
			<td>{props.data.date}</td>
			<td>
				{props.data.price}
				{props.languageHelper.currency}
			</td>
			<td className="register_link_cell">
				<a href={props.data.link} target="_blank">
					<img src={linkBtn} alt="sign up" />
				</a>
			</td>
			{props.removable ? (
				<td>
					<RemoveButton onClick={deleteMarathon} />
				</td>
			) : (
				<></>
			)}
		</tr>
	);
}

export default Marathon;

// <div className="marathon">
//     {props.removable ? <RemoveButton onClick={deleteMarathon} /> : <></>}
//     <div className="marathonOverlay">
//         <h3>{props.data.department}</h3>
//         <h3>{props.data.course}</h3>
//         <h3>{props.data.lecturer}</h3>
//         <h3>{props.data.date}</h3>
//         <h3>{props.data.price} {props.languageHelper.currency}</h3>
//     </div>
//     <a href={props.data.link}>{props.languageHelper.link}</a>
// </div>
