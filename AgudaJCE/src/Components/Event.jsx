import { React, useState, useEffect } from "react";
import "../css/Event.css";

import { db, storage } from "../firebase.js";
import { doc, deleteDoc } from "firebase/firestore";
import { ref, getDownloadURL, deleteObject } from "firebase/storage";
import RemoveButton from "./RemoveButton";

function Event(props) {
	const [imgUrl, setImgUrl] = useState("");

	useEffect(() => {
		const storageRef = ref(storage, props.data.imgUrl);
		getDownloadURL(storageRef)
			.then((url) => {
				setImgUrl(url);
			})
			.catch((error) => {
				console.log(error.message);
			});
	}, []);

	const deleteEvent = async (e) => {
		e.preventDefault();
		const docId = props.data.id;
		const storageRef = ref(storage, imgUrl);

		try {
			await deleteDoc(doc(db, "Events", docId));
			await deleteObject(storageRef);
			props.updateEvents();
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<div className="event">
			<img src={imgUrl} alt={props.data.title} />
			{props.removable ? <RemoveButton onClick={deleteEvent} /> : <></>}
		</div>
	);
}

export default Event;
