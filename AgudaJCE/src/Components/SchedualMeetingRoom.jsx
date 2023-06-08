import React from "react";
import InputField from "./InputField";

import { auth, db } from "../firebase.js";
import { collection, setDoc, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";




function SchedualMeetingRoom(props) {

    const selectedDate = props.selectedDate;
    const selectedRoom = props.selectedRoom;
    const selectedTimeSlot = props.selectedTimeSlot;


    const validateStudentId = async (studentId) => {
        const querySnapshot = await getDocs(collection(db, "Users"));
        const students = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        // return boolean value
        const returnValue = students.some((student) => student.id === studentId);
        return returnValue;
    };

    const validateOnlyUniqueStudents = (studentsIdList) => {
        const uniqueStudentsIdList = [...new Set(studentsIdList.map((studentId) => studentId.value))];
        // validate that the students id are unique and print any not unique
        if (uniqueStudentsIdList.length !== studentsIdList.length) {
            studentsIdList.forEach((studentId) => {
                if (studentsIdList.filter((id) => id.value === studentId.value).length > 1) {
                    studentId.style.border = "2px solid red";
                } else {
                    studentId.style.border = "2px solid green";
                }
            });
            return false;
        }
        return true;
    };

    const validateMaxBookingsNotExceeded = async (studentsIdList) => {
        // get all the bookings for the current week of all meeting rooms, all the documents id are in this form: "yyyy-mm-dd_(time_slot)"
        const querySnapshot = await getDocs(collection(db, "MeetingRoom1"));
        const querySnapshot2 = await getDocs(collection(db, "MeetingRoom2"));
        const querySnapshot3 = await getDocs(collection(db, "MeetingRoom3"));
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
        }
        );
        // iterate all currentWeekBookings and check id1, id2, id3 fields for each booking
        let studentsExceededMaxBookings = false;
        let counter = 0;


        studentsIdList.forEach((studentId) => {
            currentWeekBookings.forEach((booking) => {
                if (booking.id1 === studentId.value || booking.id2 === studentId.value || booking.id3 === studentId.value) {
                    counter++;
                    if (counter >= 2){
                        // if one of the students already exceeded the max bookings for the current week (2 bookings) print error
                        studentsExceededMaxBookings = true;
                        studentId.style.border = "2px solid red";
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
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Access the input field values using their ids
        const firstStudentId = document.getElementById("input_field_student_id_1");
        const secondStudentId = document.getElementById("input_field_student_id_2");
        const thirdStudentId = document.getElementById("input_field_student_id_3");
      
        const studentsIdList = [firstStudentId, secondStudentId, thirdStudentId];
      
        // validate that the students id are unique and print any not unique
        if (!validateOnlyUniqueStudents(studentsIdList)) {
          return;
        }
      
        // Validate each of the students id is in the DB
        const validatePromises = studentsIdList.map((studentId) =>
          validateStudentId(studentId.value)
        );
      
        try {
          const validationResults = await Promise.all(validatePromises);
          const isAllValid = validationResults.every((isValid) => isValid);
      
          if (isAllValid) {
            studentsIdList.forEach((studentId) => {
              studentId.style.border = "2px solid green";
            });
      
            // Validate that the max bookings for the current week is not exceeded
            const isMaxBookingsValid = await validateMaxBookingsNotExceeded(
              studentsIdList
            );
      
            if (isMaxBookingsValid) {
              bookMeetingRoom(studentsIdList);
              console.log("booked");
            }
          } else {
            console.log("not booked");
          }
        } catch (error) {
          console.log("An error occurred during student ID validation:", error);
        }
      };
      
  
    return (
      <div id="id_box" className="booking_box">
        <form className="container" onSubmit={handleSubmit}>
          <InputField label={"First Student Id"} type={"tel"} _id={"student_id_1"} />
          <InputField label={"Second Student Id"} type={"tel"} _id={"student_id_2"} />
          <InputField label={"Third Student Id"} type={"tel"} _id={"student_id_3"} />
          <button className="submit_button" type="submit">Submit</button>
        </form>
      </div>
    );
  }
  

export default SchedualMeetingRoom;