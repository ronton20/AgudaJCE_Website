import React from "react";
import InputField from "./InputField.jsx";

import { db } from "../firebase.js";
import { collection, addDoc } from "firebase/firestore";


function AddMarathon(props) {

    const ids = {
        department: "add_marathon_department",
        course: "add_marathon_course_name",
        lecturer: "add_marathon_lecturer",
        date: "add_marathon_date",
        price: "add_marathon_price",
        link: "add_marathon_link",
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const department_name = document.getElementById(`input_field_${ids.department}`).value;
		const course_name = document.getElementById(`input_field_${ids.course}`).value;
		const lecturer_name = document.getElementById(`input_field_${ids.lecturer}`).value;
		const date_info = document.getElementById(`input_field_${ids.date}`).value;
        const price_info = document.getElementById(`input_field_${ids.price}`).value;
		const link_info = document.getElementById(`input_field_${ids.link}`).value;

        // create a new document in the AgudaMembers collection
		const marathonsRef = collection(db, "Marathons");
		await addDoc(marathonsRef, {
            department: department_name,
            course: course_name,
            lecturer: lecturer_name,
            date: date_info,
            price: price_info,
            link: link_info,
		});

		// update the aguda members list
		props.updateMarathons();
    }

    return(
        <div className="add_marathon_div">
			<h2>{props.languageHelper.header}</h2>
			<form className="add_marathon_form" onSubmit={handleSubmit}>
				<InputField	_id={ids.department} label={props.languageHelper.department} type="text" />
                <InputField	_id={ids.course} label={props.languageHelper.course} type="text" />
                <InputField	_id={ids.lecturer} label={props.languageHelper.lecturer} type="text" />
                <InputField	_id={ids.date} label={props.languageHelper.date} type="text" />
                <InputField	_id={ids.price} label={props.languageHelper.price} type="text" />
                <InputField	_id={ids.link} label={props.languageHelper.link} type="text" />
				<button className="submit_button" type="submit">
					{props.languageHelper.submit}
				</button>
			</form>
		</div>
    );
}

export default AddMarathon;