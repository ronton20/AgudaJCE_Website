import React, { useState, useEffect } from "react";
import arrow from "../assets/arrow.png";
import leftArrow from "../assets/leftArrow.png";
import AgudaButtonUI from "../Components/AgudaButton.jsx";
import { db } from "../firebase";
import { collection, getDoc, setDoc, doc, query } from "firebase/firestore";

import SchedualMeetingRoom from "../Components/SchedualMeetingRoom";

import "./MeetingRooms.css";

const MeetingRooms = (props) => {
	const date = new Date();
	const [currentMonth, setCurrentMonth] = useState(date.getMonth());
	const [currentYear, setCurrentYear] = useState(date.getFullYear());
	const [days, setDays] = useState([]);
	const [currentDate, setCurrentDate] = useState();
	const [meetingRoom, setMeetingRoom] = useState("hadan_test");
	const [isMorningAvailable, setIsMorningAvailable] = useState(false);
	const [isNoonAvailable, setIsNoonAvailable] = useState(false);
	const [isEveningAvailable, setIsEveningAvailable] = useState(false);

	const meetingRooms = {
		room1: "hadan_test",
		room2: "meetingRoom2",
		room3: "meetingRoom3",
	};

	useEffect(() => {
		const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
		const daysArray = [...Array(daysInMonth).keys()].map((i) => i + 1);
		setDays(daysArray);
	}, [currentMonth, currentYear]);

	const handlePrevMonth = () => {
		const selected = document.querySelector(".calendar .days div.selected");
		document.getElementById("meeting_rooms_box").classList.remove("active");
		document.querySelector("#time_frame_box").classList.remove("active");
		if (selected) selected.classList.remove("selected");
		if (currentMonth === 12) {
			setCurrentYear(currentYear - 1);
		}
		setCurrentMonth((prevMonth) => prevMonth - 1);
	};

	const handleNextMonth = () => {
		const selected = document.querySelector(".calendar .days div.selected");
		document.getElementById("meeting_rooms_box").classList.remove("active");
		document.querySelector("#time_frame_box").classList.remove("active");
		if (selected) selected.classList.remove("selected");
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
		console.log(room, "-", currentDate, "-", time_frame);
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
		document.getElementById("meeting_rooms_box").classList.add("active");
		document.querySelector("#time_frame_box").classList.remove("active");
		const selected = document.querySelector(".calendar .days div.selected");
		const roomSelected = document.querySelector(".booking_box .submit_button.selected");
		if (selected) selected.classList.remove("selected");
		if (roomSelected) roomSelected.classList.remove("selected");
		document.getElementById(date).classList.add("selected");
	}

	async function setRoom(meetingRoom) {
		setMeetingRoom(meetingRoom);
		document.querySelector("#time_frame_box").classList.add("active");
		const roomSelected = document.querySelector(".booking_box .submit_button.selected");
		if (roomSelected) roomSelected.classList.remove("selected");
		document.getElementById(meetingRoom).classList.add("selected");
		setIsMorningAvailable(await check_availability_time_frame(meetingRoom, "morning"));
		setIsNoonAvailable(await check_availability_time_frame(meetingRoom, "noon"));
		setIsEveningAvailable(await check_availability_time_frame(meetingRoom, "evening"));
	}

	const schedualHadan = async ({
		date = "",
		ids = [(id1 = ""), (id2 = ""), (id3 = "")],
		meeting_room = "",
		time_frame = "",
	}) => {
		try {
			// Creats an schedual meeting room
			const userSchedual = collection(db, meeting_room);
			await setDoc(doc(db, userSchedual, date + "_" + time_frame), ids);
			//Schedual Meeting room successful
		} catch (error) {
			// Handle any errors
			console.error("Schedual meeting room error:", error);
		}
	};

	return (
		<>
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
					button_text={props.languageHelper.meeting_room_1}
					disabled={false}
					onClick={() => setRoom(meetingRooms.room1)}
					value={meetingRooms.room1}
				/>
				<AgudaButtonUI
					_id={meetingRooms.room2}
					button_text={props.languageHelper.meeting_room_2}
					disabled={false}
					onClick={() => setRoom(meetingRooms.room2)}
					value={meetingRooms.room2}
				/>
				<AgudaButtonUI
					_id={meetingRooms.room3}
					button_text={props.languageHelper.meeting_room_3}
					disabled={false}
					onClick={() => setRoom(meetingRooms.room3)}
					value={meetingRooms.room3}
				/>
			</div>
			<div id="time_frame_box" className="booking_box">
				<AgudaButtonUI
					button_text={props.languageHelper.morning}
					disabled={!isMorningAvailable}
					onClick={SchedualMeetingRoom}
					value={"morning"}
				/>
				<AgudaButtonUI
					button_text={props.languageHelper.afternoon}
					disabled={!isNoonAvailable}
					onClick={SchedualMeetingRoom}
					value={"noon"}
				/>
				<AgudaButtonUI
					button_text={props.languageHelper.evening}
					disabled={!isEveningAvailable}
					onClick={SchedualMeetingRoom}
					value={"evening"}
				/>
			</div>
		</>
	);
};

export default MeetingRooms;
