import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, getDocs, getDoc, setDoc, doc, updateDoc, query, where } from "firebase/firestore";

import "./MeetingRoomBookings.css";
import dropdownArrow from "../assets/dropdown-arrow.png";

import NavBar from "../Components/NavBar";
import Background from "../Components/Background.jsx";
import RoomBooking from "../Components/RoomBooking.jsx";

function MeetingRoomBookings(props) {
	const [user, loading] = useAuthState(auth);
	const [isAdmin, setIsAdmin] = useState(false);

	const [meetingRoom1, setMeetingRoom1] = useState([]);
	const [meetingRoom2, setMeetingRoom2] = useState([]);
	const [meetingRoom3, setMeetingRoom3] = useState([]);

	const meetingRooms = {
		room1: "c305",
		room2: "c306",
		room3: "c307",
	};

	const timeFrames = {
		morning: "09:00-13:00",
		noon: "13:00-17:00",
		evening: "17:00-21:00",
	};

	useEffect(() => {
		// get the preferences from firebase
		const getPreferences = async () => {
			const docRef = doc(db, "Preferences", "sendEmailToAdminOnBook");
			const docSnap = await getDoc(docRef);
			// check the box according to the preferences
			const checkBox = document.getElementById("send_confirmation_email_checkbox");
			checkBox.checked = docSnap.data().sendConfirmationEmail;
		};
		getPreferences();
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

	const setRoomBookings = async (room) => {
		const querySnapshot = await getDocs(collection(db, room));
		var roomBookings = querySnapshot.docs.map((doc) => ({
			id: doc.id,
			date: doc.id.split("_")[0],
			timeFrame: doc.id.split("_")[1],
			...doc.data(),
		}));

		roomBookings = sortByDate(roomBookings);
		roomBookings.forEach((booking) => {
			booking.date = localizeFormat(booking.date);
		});

		switch (room) {
			case meetingRooms.room1:
				setMeetingRoom1(roomBookings);
				break;
			case meetingRooms.room2:
				setMeetingRoom2(roomBookings);
				break;
			case meetingRooms.room3:
				setMeetingRoom3(roomBookings);
				break;
			default:
				break;
		}
	};

	const sortByDate = (roomBookings) => {
		var sortedBookings = roomBookings.sort((a, b) => {
			const aDate = new Date(a.date);
			const bDate = new Date(b.date);
			return aDate - bDate;
		});

		// sort by timeFrame (morning, noon, evening) per date
		sortedBookings = sortedBookings.sort((a, b) => {
			if (a.date === b.date) {
				const aTimeFrame = a.timeFrame;
				const bTimeFrame = b.timeFrame;
				if (aTimeFrame === "morning" && bTimeFrame === "noon") return -1;
				if (aTimeFrame === "morning" && bTimeFrame === "evening") return -1;
				if (aTimeFrame === "noon" && bTimeFrame === "evening") return -1;
				return 1;
			}
			return 0;
		});

		return sortedBookings;
	};

	const localizeFormat = (date) => {
		const dateObj = new Date(date);
		const day = dateObj.getDate();
		const month = dateObj.getMonth() + 1;
		const year = dateObj.getFullYear();
		return `${day}/${month}/${year}`;
	};

	useEffect(() => {
		setRoomBookings(meetingRooms.room1);
		setRoomBookings(meetingRooms.room2);
		setRoomBookings(meetingRooms.room3);
	}, []);

	const toggleConfirmationEmail = async (e) => {
		const sendConfirmationEmail = e.target.checked;
		// disable the checkbox
		e.target.disabled = true;
		// create the set "Preferences" document in Firestore if it doesn't exist
		const collectionRef = collection(db, "Preferences");
		const querySnapshot = await getDocs(collectionRef);
		if (querySnapshot.empty) {
			// create the collection "Preferences" in Firestore
			await setDoc(doc(db, "Preferences", "sendEmailToAdminOnBook"), {
				sendConfirmationEmail: sendConfirmationEmail,
			});
		}
		else {
			// update the set "preferences" document in Firestore to true/false on sendConfirmationEmail field
			const docRef = doc(db, "Preferences", "sendEmailToAdminOnBook");
			await updateDoc(docRef, {
				sendConfirmationEmail: sendConfirmationEmail,
			});
		}



		// enable the checkbox
		e.target.disabled = false;
	};

	const toggleDropdown = (e) => {
		const dropdown = e.target.parentElement;
		dropdown.classList.toggle("active");
	};

	return (
		<div id="meeting_room_bookings_page" className="page">
			<Background />
			<div className="page_content">
				{isAdmin ? <NavBar languageHelper={props.languageHelper.navBar} /> : <></>}
				<h1>{props.languageHelper.meetingRoomBookings.header}</h1>
				<div id="room_1_bookings_table" className="room_bookings_container glassify">
					<div className="room_bookings_title" onClick={toggleDropdown}>
						<img
							src={dropdownArrow}
							alt=""
							className={props.currentLanguage === "he" ? "flip" : ""}
						/>
						<h2>{meetingRooms.room1}</h2>
					</div>
					<div className="meeting_room_bookings_table">
						<table>
							<thead>
								<tr>
									<th>{props.languageHelper.meetingRoomBookings.date}</th>
									<th>{props.languageHelper.meetingRoomBookings.timeFrame}</th>
									<th>{props.languageHelper.meetingRoomBookings.id}</th>
									<th>{props.languageHelper.meetingRoomBookings.id}</th>
									<th>{props.languageHelper.meetingRoomBookings.id}</th>
								</tr>
							</thead>
							<tbody>
								{meetingRoom1.map((booking) => (
									<RoomBooking
										key={booking.id}
										date={booking.date}
										timeFrame={timeFrames[booking.timeFrame]}
										data={booking}
										languageHelper={props.languageHelper.meetingRoomBookings}
									/>
								))}
							</tbody>
						</table>
					</div>
				</div>
				<div id="room_2_bookings_table" className="room_bookings_container glassify">
					<div className="room_bookings_title" onClick={toggleDropdown}>
						<img
							src={dropdownArrow}
							alt=""
							className={props.currentLanguage === "he" ? "flip" : ""}
						/>
						<h2>{meetingRooms.room2}</h2>
					</div>
					<div className="meeting_room_bookings_table">
						<table>
							<thead>
								<tr>
									<th>{props.languageHelper.meetingRoomBookings.date}</th>
									<th>{props.languageHelper.meetingRoomBookings.timeFrame}</th>
									<th>{props.languageHelper.meetingRoomBookings.id}</th>
									<th>{props.languageHelper.meetingRoomBookings.id}</th>
									<th>{props.languageHelper.meetingRoomBookings.id}</th>
								</tr>
							</thead>
							<tbody>
								{meetingRoom2.map((booking) => (
									<RoomBooking
										key={booking.id}
										date={booking.date}
										timeFrame={timeFrames[booking.timeFrame]}
										data={booking}
										languageHelper={props.languageHelper.meetingRoomBookings}
									/>
								))}
							</tbody>
						</table>
					</div>
				</div>
				<div id="room_3_bookings_table" className="room_bookings_container glassify">
					<div className="room_bookings_title" onClick={toggleDropdown}>
						<img
							src={dropdownArrow}
							alt=""
							className={props.currentLanguage === "he" ? "flip" : ""}
						/>
						<h2>{meetingRooms.room3}</h2>
					</div>
					<div className="meeting_room_bookings_table">
						<table>
							<thead>
								<tr>
									<th>{props.languageHelper.meetingRoomBookings.date}</th>
									<th>{props.languageHelper.meetingRoomBookings.timeFrame}</th>
									<th>{props.languageHelper.meetingRoomBookings.id}</th>
									<th>{props.languageHelper.meetingRoomBookings.id}</th>
									<th>{props.languageHelper.meetingRoomBookings.id}</th>
								</tr>
							</thead>
							<tbody>
								{meetingRoom3.map((booking) => (
									<RoomBooking
										key={booking.id}
										date={booking.date}
										timeFrame={timeFrames[booking.timeFrame]}
										data={booking}
										languageHelper={props.languageHelper.meetingRoomBookings}
									/>
								))}
							</tbody>
						</table>
					</div>
				</div>
				<div id="email_prefrences" className="room_bookings_container glassify">
					<div className="email_prefrences_container">
						<input
							type="checkbox"
							name="send_confirmation_email"
							id="send_confirmation_email_checkbox"
							onClick={toggleConfirmationEmail}
						/>
						<label htmlFor="send_confirmation_email_checkbox">
							{props.languageHelper.meetingRoomBookings.emailCheckbox}
						</label>
					</div>
				</div>
			</div>
		</div>
	);
}

export default MeetingRoomBookings;
