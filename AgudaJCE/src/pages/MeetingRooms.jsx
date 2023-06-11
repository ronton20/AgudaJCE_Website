import React, { useState, useEffect } from "react";
import arrow from "../assets/arrow.png";
import leftArrow from "../assets/leftArrow.png";
import AgudaButtonUI from "../Components/AgudaButton.jsx";
import { db, auth } from "../firebase";
import { collection, getDoc, getDocs, setDoc, doc, query, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

import SchedualMeetingRoom from "../Components/SchedualMeetingRoom";
import NavBar from "../Components/NavBar";

import "./MeetingRooms.css";
import BackToHomeButton from "../Components/BackToHomeButton";

const MeetingRooms = (props) => {
	const [user, loading, error] = useAuthState(auth);
	const [isAdmin, setIsAdmin] = useState(false);
	const navigate = useNavigate();
	const date = new Date();
	const [currentMonth, setCurrentMonth] = useState(date.getMonth());
	const [currentYear, setCurrentYear] = useState(date.getFullYear());
	const [days, setDays] = useState([]);
	const [currentDate, setCurrentDate] = useState();
	const [meetingRoom, setMeetingRoom] = useState("MeetingRoom1");
	const [selectedTimeSlot, setSelectedTimeSlot] = useState();
	const [isMorningAvailable, setIsMorningAvailable] = useState(false);
	const [isNoonAvailable, setIsNoonAvailable] = useState(false);
	const [isEveningAvailable, setIsEveningAvailable] = useState(false);

	const meetingRooms = {
		room1: "c305",
		room2: "c306",
		room3: "c307",
	};

	const timeFrames = {
		room1: "09:00-13:00",
		room2: "13:00-17:00",
		room3: "17:00-21:00",
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
		const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
		const daysArray = [...Array(daysInMonth).keys()].map((i) => i + 1);
		setDays(daysArray);
	}, [currentMonth, currentYear]);

	const handlePrevMonth = () => {
		cleanSelections({ calendar: true, meetingRoom: true, timeSlot: true, ids: true });
		if (currentMonth === 12) {
			setCurrentYear(currentYear - 1);
		}
		setCurrentMonth((prevMonth) => prevMonth - 1);
	};

	const handleNextMonth = () => {
		cleanSelections({ calendar: true, meetingRoom: true, timeSlot: true, ids: true });
		if (currentMonth === 11) {
			setCurrentYear(currentYear + 1);
		}
		setCurrentMonth((prevMonth) => prevMonth + 1);
	};

	const month = new Date(currentYear, currentMonth);
	const monthNumeric = month.getMonth() + 1;
	var monthName;
	if (props.currentLanguage === "he") {
		monthName = month.toLocaleString("he", { month: "long" });
	} else {
		monthName = month.toLocaleString("en", { month: "long" });
	}

	const check_availability_time_frame = async (room, time_frame) => {
		// console.log(room, "-", currentDate, "-", time_frame);
		const docRef = doc(db, room, currentDate + "_" + time_frame);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			return false;
		} else {
			return true;
		}
	};

	function setDate(date) {
		setCurrentDate(date);
		cleanSelections({ calendar: true, meetingRoom: true, timeSlot: true, ids: true });
		document.getElementById("meeting_rooms_box").classList.add("active");
		document.getElementById(date).classList.add("selected");
	}

	async function setRoom(meetingRoom) {
		setMeetingRoom(meetingRoom);
		cleanSelections({ calendar: false, meetingRoom: true, timeSlot: true, ids: true });
		document.getElementById("meeting_rooms_box").classList.add("active");
		document.querySelector("#time_frame_box").classList.add("active");
		document.getElementById(meetingRoom).classList.add("selected");
		setIsMorningAvailable(await check_availability_time_frame(meetingRoom, "morning"));
		setIsNoonAvailable(await check_availability_time_frame(meetingRoom, "noon"));
		setIsEveningAvailable(await check_availability_time_frame(meetingRoom, "evening"));
	}

	const timeSlotClicked = (time_frame) => {
		setSelectedTimeSlot(time_frame);
		cleanSelections({ calendar: false, meetingRoom: false, timeSlot: true, ids: true });
		document.querySelector("#time_frame_box").classList.add("active");
		document.getElementById(time_frame).classList.add("selected");
		document.getElementById("id_box").classList.add("active");
	};

	const cleanSelections = ({
		calendar = true,
		meetingRoom = true,
		timeSlot = true,
		ids = true,
	}) => {
		if (calendar) {
			const dateSelected = document.querySelector(".calendar .selected");
			if (dateSelected) dateSelected.classList.remove("selected");
		}
		if (meetingRoom) {
			document.querySelector("#meeting_rooms_box").classList.remove("active");
			const roomSelected = document.querySelector(".booking_box .submit_button.selected");
			if (roomSelected) roomSelected.classList.remove("selected");
		}
		if (timeSlot) {
			document.querySelector("#time_frame_box").classList.remove("active");
			const timeSlotSelected = document.querySelector(
				"#time_frame_box .submit_button.selected"
			);
			if (timeSlotSelected) timeSlotSelected.classList.remove("selected");
		}
		if (ids) {
			document.querySelector("#id_box").classList.remove("active");
		}
	};

	return (
		<div id="meeting_room_page" className="page">
			{isAdmin ? <NavBar languageHelper={props.languageHelper.navBar} /> : <></>}
			<h1>{props.languageHelper.meetingRooms.header}</h1>
			<div className="meeting_room_booking_container">
				<div className="calendar">
					<div className="header">
						<a className="arrow" rel="right-arrow-container" onClick={handlePrevMonth}>
							<img src={arrow} alt="right-arrow" />
						</a>
						<h2>
							{monthName} {currentYear}
						</h2>
						<a className="arrow" rel="left-arrow-container" onClick={handleNextMonth}>
							<img id="left-arrow" src={leftArrow} alt="left-arrow" />
						</a>
					</div>
					<div className="days">
						{days.map((day) => {
							const fullDate = `${currentYear}-${monthNumeric}-${day}`;
							return (
								<div key={day} onClick={() => setDate(fullDate)} id={fullDate}>
									{day}
								</div>
							);
						})}
					</div>
				</div>
				<div id="meeting_rooms_box" className="booking_box">
					<AgudaButtonUI
						_id={meetingRooms.room1}
						button_text={meetingRooms.room1}
						disabled={false}
						onClick={() => setRoom(meetingRooms.room1)}
						value={meetingRooms.room1}
					/>
					<AgudaButtonUI
						_id={meetingRooms.room2}
						button_text={meetingRooms.room2}
						disabled={false}
						onClick={() => setRoom(meetingRooms.room2)}
						value={meetingRooms.room2}
					/>
					<AgudaButtonUI
						_id={meetingRooms.room3}
						button_text={meetingRooms.room3}
						disabled={false}
						onClick={() => setRoom(meetingRooms.room3)}
						value={meetingRooms.room3}
					/>
				</div>
				<div id="time_frame_box" className="booking_box">
					<div className="time_frame_button">
						<AgudaButtonUI
							_id={"morning"}
							button_text={props.languageHelper.meetingRooms.morning}
							disabled={!isMorningAvailable}
							onClick={() => timeSlotClicked("morning")}
							value={"morning"}
						/>
						<p>{timeFrames.room1}</p>
					</div>
					<div className="time_frame_button">
						<AgudaButtonUI
							_id={"noon"}
							button_text={props.languageHelper.meetingRooms.afternoon}
							disabled={!isNoonAvailable}
							onClick={() => timeSlotClicked("noon")}
							value={"noon"}
						/>
						<p>{timeFrames.room2}</p>
					</div>
					<div className="time_frame_button">
						<AgudaButtonUI
							_id={"evening"}
							button_text={props.languageHelper.meetingRooms.evening}
							disabled={!isEveningAvailable}
							onClick={() => timeSlotClicked("evening")}
							value={"evening"}
						/>
						<p>{timeFrames.room3}</p>
					</div>
					
					
					
				</div>
				<SchedualMeetingRoom
					selectedDate={currentDate}
					selectedRoom={meetingRoom}
					selectedTimeSlot={selectedTimeSlot}
					languageHelper={props.languageHelper}
				/>
			</div>
			<BackToHomeButton />
		</div>
	);
};

export default MeetingRooms;
