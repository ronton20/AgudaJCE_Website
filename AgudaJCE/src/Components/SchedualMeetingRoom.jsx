import React from "react";
import InputField from "./InputField";

import { auth, db } from "../firebase.js";
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";




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

    const handleSubmit = (e) => {
        e.preventDefault();
        // Access the input field values using their ids
        const firstStudentId = document.getElementById("input_field_student_id_1");
        const secondStudentId = document.getElementById("input_field_student_id_2");
        const thirdStudentId = document.getElementById("input_field_student_id_3");
        
        const studentsIdList = [firstStudentId, secondStudentId, thirdStudentId];

        // validate for each

        studentsIdList.forEach((studentId) => {
            validateStudentId(studentId.value).then((isValid) => {
                if (!isValid) {
                    studentId.style.border = "2px solid red";
                    return;
                }
            });
            studentId.style.border = "2px solid green";
        });
    };
  
    return (
      <div id="id_box" className="booking_box">
        <form className="container" onSubmit={handleSubmit}>
          <InputField label={"First Student Id:"} type={"tel"} _id={"student_id_1"} />
          <InputField label={"Second Student Id:"} type={"tel"} _id={"student_id_2"} />
          <InputField label={"Third Student Id:"} type={"tel"} _id={"student_id_3"} />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
  

export default SchedualMeetingRoom;