import React from "react";
import InputField from "./InputField";

import { auth, db } from "../firebase.js";
import { collection, setDoc, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";
import emailjs from "@emailjs/browser";

function SchedualMeetingRoom(props) {
	const selectedDate = props.selectedDate;
	const selectedRoom = props.selectedRoom;
	const selectedTimeSlot = props.selectedTimeSlot;
	const selectedTimeSlotHour = props.selectedTimeSlotHour;
	const meetingRooms = props.meetingRooms;
	
	// if a new date/room/time slot is selected, resume the original submit button

	const validateStudentId = async (studentId) => {
		const id = studentId.value;
		const querySnapshot = await getDocs(collection(db, "Users"));
		const students = querySnapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}));
		// return boolean value
		const returnValue = students.some((student) => student.id === id);
		if (!returnValue)
			invalidIdForBooking(studentId, props.languageHelper.scheduleMeetingRoom.error_invalid_id);
		return returnValue;
	};

	const invalidIdForBooking = (studentId, errorMessage) => {
		studentId.style.border = "2px solid red";
		const errorElement = document.createElement("p");
		errorElement.className = "error_message";
		errorElement.innerText = errorMessage;
		studentId.parentNode.insertBefore(errorElement, studentId.nextSibling);
	  };
	  

	const validateOnlyUniqueStudents = (studentsIdList) => {
		const uniqueStudentsIdList = [
			...new Set(studentsIdList.map((studentId) => studentId.value)),
		];
		// validate that the students id are unique and print any not unique
		if (uniqueStudentsIdList.length !== studentsIdList.length) {
			studentsIdList.forEach((studentId) => {
				if (studentsIdList.filter((id) => id.value === studentId.value).length > 1) {
					invalidIdForBooking(studentId, props.languageHelper.scheduleMeetingRoom.error_duplicate_id);
				}
			});
			return false;
		}
		return true;
	};

	const validateMaxBookingsNotExceeded = async (studentsIdList) => {
		// get all the bookings for the current week of all meeting rooms, all the documents id are in this form: "yyyy-mm-dd_(time_slot)"
		const querySnapshot = await getDocs(collection(db, meetingRooms.room1));
		const querySnapshot2 = await getDocs(collection(db, meetingRooms.room2));
		const querySnapshot3 = await getDocs(collection(db, meetingRooms.room3));
		// merge all the bookings into one array
		const bookings = querySnapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}));
		const bookings2 = querySnapshot2.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}));
		const bookings3 = querySnapshot3.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}));
		const allBookings = [...bookings, ...bookings2, ...bookings3];
		// get the current week using the selected date with Date object
		const date = new Date(selectedDate);
		const currentWeek = getWeekNumber(date);
		// filter the bookings to only the bookings of the current week
		const currentWeekBookings = allBookings.filter((booking) => {
			const bookingDate = new Date(booking.id.split("_")[0]);
			const bookingWeek = getWeekNumber(bookingDate);
			return bookingWeek[0] === currentWeek[0] && bookingWeek[1] === currentWeek[1];
		});
		// iterate all currentWeekBookings and check id1, id2, id3 fields for each booking
		let studentsExceededMaxBookings = false;
		let counter = 0;
		
		studentsIdList.forEach((studentId) => {
			currentWeekBookings.forEach((booking) => {
				if (
					booking.id1 === studentId.value ||
					booking.id2 === studentId.value ||
					booking.id3 === studentId.value
				) {
					counter++;
					if (counter >= 2) {
						// if one of the students already exceeded the max bookings for the current week (2 bookings) print error
						studentsExceededMaxBookings = true;
						invalidIdForBooking(studentId, props.languageHelper.scheduleMeetingRoom.error_exceed_limit);
					}
				}
			});
			counter = 0;
		});
		return !studentsExceededMaxBookings;
	};

	const getWeekNumber = (date) => {
		// Copy date so don't modify original
		date = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
		// Set to nearest Thursday: current date + 4 - current day number
		// Make Sunday's day number 7
		date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 2));
		// Get first day of year
		var yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
		// Calculate full weeks to nearest Thursday
		var weekNo = Math.ceil(((date - yearStart) / 86400000 + 1) / 7);
		// Return array of year and week number
		return [date.getUTCFullYear(), weekNo];
	};

	const bookMeetingRoom = async (studentsIdList) => {
		// create a new document in the DB with the selected date and time slot
		const docRef = await setDoc(doc(db, selectedRoom, `${selectedDate}_${selectedTimeSlot}`), {
			id1: studentsIdList[0].value,
			id2: studentsIdList[1].value,
			id3: studentsIdList[2].value,
		});
		// send confirmation mail to the current user
		const currentUserEmail = auth.currentUser.email;
		// send confirmation mail to the currentUserEmail
		await emailjs.send("service_1b0ai8x", "template_rjg6mea", {
			to_email: currentUserEmail,
			room_number: selectedRoom,
			date: selectedDate,
			time: selectedTimeSlotHour,
		  }, "wdHyAazrWD5Ae01Xf");

		//   TODO: send confirmation mail to the admin
	};

	// validate that the room is available for the selected date and time slot
	const validateMeetingRoomAvailability = async () => {
		const querySnapshot = await getDocs(collection(db, selectedRoom));
		const bookings = querySnapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}));
		const booking = bookings.find((booking) => booking.id === `${selectedDate}_${selectedTimeSlot}`);
		if (booking) 
			return false;
		return true;
	};

	const clearAllInputFields = () => {
		const firstStudentId = document.getElementById("input_field_student_id_1");
		const secondStudentId = document.getElementById("input_field_student_id_2");
		const thirdStudentId = document.getElementById("input_field_student_id_3");
	  
		// Clear all the red borders from the input fields
		firstStudentId.style.border = "";
		secondStudentId.style.border = "";
		thirdStudentId.style.border = "";
	  
		// Remove error elements
		const errorElements = document.querySelectorAll(".error_message");
		errorElements.forEach((errorElement) => {
		  errorElement.parentNode.removeChild(errorElement);
		});
	  };
	  

	const handleSubmit = async (e) => {
		e.preventDefault();
		// disable the submit button until the validation is done to prevent multiple clicks
		const submitButton = e.target.querySelector(".submit_button");
		submitButton.disabled = true;
		// clear all the red borders from the input fields
		clearAllInputFields();
		const firstStudentId = document.getElementById("input_field_student_id_1");
		const secondStudentId = document.getElementById("input_field_student_id_2");
		const thirdStudentId = document.getElementById("input_field_student_id_3");

		const studentsIdList = [firstStudentId, secondStudentId, thirdStudentId];

		// validate that the students id are unique
		if (!validateOnlyUniqueStudents(studentsIdList)) {
			submitButton.disabled = false;
			return;
		}

		// Validate each of the students id is in the DB
		const validatePromises = studentsIdList.map((studentId) =>
			validateStudentId(studentId)
		);

		try {
			const validationResults = await Promise.all(validatePromises);
			const isAllValid = validationResults.every((isValid) => isValid);

			if (isAllValid) {
				studentsIdList.forEach((studentId) => {
					studentId.style.border = "2px solid green";
				});

				// Validate that the max bookings for the current week is not exceeded
				const isMaxBookingsValid = await validateMaxBookingsNotExceeded(studentsIdList);

				if (isMaxBookingsValid) {
					// check if the meeting room is available, then book
					const isAvailable = await validateMeetingRoomAvailability();
					if (isAvailable){
						await bookMeetingRoom(studentsIdList);
						// Update the submit button text to indicate booking success
						submitButton.textContent = props.languageHelper.scheduleMeetingRoom.success;
						// give the button a green border
						submitButton.style.border = "2px solid green";
						// give the button a green text color
						submitButton.style.color = "green";
					}
					else 
						alert(props.languageHelper.scheduleMeetingRoom.not_available);
				}
				else
					submitButton.disabled = false;

			}
			else
				submitButton.disabled = false;
		} catch (error) {
			console.log("An error occurred during student ID validation:", error);
			submitButton.disabled = false;
		}
	};

	return (
		<div id="id_box" className="booking_box">
			<form className="container" onSubmit={handleSubmit}>
				<InputField
					label={props.languageHelper.scheduleMeetingRoom.id1}
					type={"tel"}
					_id={"student_id_1"}
				/>
				<InputField
					label={props.languageHelper.scheduleMeetingRoom.id2}
					type={"tel"}
					_id={"student_id_2"}
				/>
				<InputField
					label={props.languageHelper.scheduleMeetingRoom.id3}
					type={"tel"}
					_id={"student_id_3"}
				/>
				<button className="submit_button" type="submit">
					{props.languageHelper.scheduleMeetingRoom.submit}
				</button>
			</form>
		</div>
	);
}

export default SchedualMeetingRoom;
