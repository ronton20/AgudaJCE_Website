import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase.js";
import { collection, getDocs } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

import "./ManageEvents.css";

import AddEvent from "../Components/addEvent.jsx";
import Event from "../Components/Event.jsx";

function ManageEvents(props) {
	const [user, loading, error] = useAuthState(auth);
	const [events, setEvents] = useState([]);
	const navigate = useNavigate();

	function toggleBackground() {
		document.getElementById("blur_background").classList.toggle("active");
	}

	async function updateEvents() {
		const querySnapshot = await getDocs(collection(db, "Events"));
		const eventList = querySnapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}));
		setEvents(eventList);
	}

	useEffect(() => {
		if (loading) return;
		if (!user) return navigate("/");
	}, [user, loading]);

	useEffect(() => {
		updateEvents();
	}, []);

	return (
		<div id="manage_events_page" className="page">
			<div id="add_event">
				<AddEvent
					languageHelper={props.languageHelper.addEvent}
					updateEvents={updateEvents}
				/>
			</div>
			<div id="event_list" className="glassify">
				{events.map((event) => (
					<Event
						key={event.id}
						data={event}
						removable={true}
						updateEvents={updateEvents}
					/>
				))}
			</div>
			<div id="blur_background" onClick={toggleBackground}></div>
		</div>
	);
}

export default ManageEvents;
