import { React, useState, useEffect } from "react";

import { storage } from "../firebase.js";
import { ref, getDownloadURL } from "firebase/storage";

import "../css/EventPopup.css";

const EventPopup = ({ active = false, event = null, closePopup = null }) => {
	const [eventTitle, setEventTitle] = useState("");
	const [eventDescription, setEventDescription] = useState("");
	const [imgUrl, setImgUrl] = useState("");

	useEffect(() => {
		if (!event) {
			setEventTitle("");
			setEventDescription("");
			setImgUrl("");
			return;
		}

		setEventTitle(event.Title);
		setEventDescription(event.Description);

		const storageRef = ref(storage, event.imgUrl);
		getDownloadURL(storageRef)
			.then((url) => {
				setImgUrl(url);
			})
			.catch((error) => {
				console.log(error.message);
			});
	}, [event]);

	return (
		<div className={active ? "event_popup active" : "event_popup"}>
			<div className="event_popup_content">
				<div className="event_popup_text">
					<h2>{eventTitle}</h2>
					<p>{eventDescription}</p>
				</div>
				<div className="event_popup_image">
					<img src={imgUrl} alt={eventTitle} />
				</div>
				<div className="event_popup_close" onClick={closePopup}></div>
			</div>
		</div>
	);
};

export default EventPopup;
