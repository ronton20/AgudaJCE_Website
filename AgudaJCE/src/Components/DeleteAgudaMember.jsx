import React from "react";
import languages from "../modules/languages";
import InputField from "./InputField.jsx";
// import "./deleteAgudaMembers.css";

import { app, db } from "../firebase.js";
import { collection, query, getDocs, where, doc, deleteDoc } from "firebase/firestore";


function DeleteAgudaMembers(props) {
    const languageHelper = languages[props.currentLanguage].deleteAgudaMembers;
    const ids = {
        firstName: "add_aguda_members_first_name",
        lastName: "add_aguda_members_last_name",
    };

    return( 
        <div className="delete_aguda_members_div">
			<h2>{languageHelper.header}</h2>
			<form className="delete_aguda_members_form" onSubmit={deleteMember}>
				<InputField _id={ids.firstName} label={languageHelper.firstName} type="text" />
				<InputField _id={ids.lastName} label={languageHelper.lastName} type="text" />
				<button className="submit_button" type="submit">
					{languageHelper.submit}
				</button>
			</form>
		</div>
    );
}

export default DeleteAgudaMembers;