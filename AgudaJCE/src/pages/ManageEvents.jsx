import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase.js";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

import "./ManageEvents.css";

import AddEvent from "../Components/addEvent.jsx";
import Event from "../Components/Event.jsx";
import NavBar from "../Components/NavBar";

function ManageEvents(props) {
	const [user, loading, error] = useAuthState(auth);
	const [isAdmin, setIsAdmin] = useState(false);
	const [events, setEvents] = useState([]);
	const navigate = useNavigate();

	function toggleBackground() {
		document.getElementById("blur_background").classList.toggle("active");
	}

	async function updateEvents() {
		const querySnapshot = await getDocs(collection(db, "Events"));
		var eventList = querySnapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}));

		// sort eventList by date descending according to the event's date field that is formatted as: "yyyy-mm-dd_hh:mm:ss"
		eventList = sortEvents(eventList);
		setEvents(eventList);
	}

	const sortEvents = (events) => {
		const sortedEvents = events.sort((a, b) => {
			const aDate = a.Date.split("_")[0].split("-");
			const bDate = b.Date.split("_")[0].split("-");
			const aTime = a.Date.split("_")[1].split(":");
			const bTime = b.Date.split("_")[1].split(":");
			const aDateTime = new Date(aDate[0], aDate[1], aDate[2], aTime[0], aTime[1], aTime[2]);
			const bDateTime = new Date(bDate[0], bDate[1], bDate[2], bTime[0], bTime[1], bTime[2]);
			return bDateTime - aDateTime;
		});
		return sortedEvents;
	};

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
		updateEvents();
	}, []);

	return (
		<div id="manage_events_page" className="page">
			{isAdmin ? <NavBar languageHelper={props.languageHelper.navBar} /> : <></>}
			<h1 id="manage_aguda_members_title">{props.languageHelper.manageEvents.header}</h1>
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
