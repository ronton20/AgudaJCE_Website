import React, { useState } from "react";
import { db, storage } from "../firebase.js";
import { collection, addDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import InputField from "./InputField.jsx";
import "../css/addEvent.css";

// this function will allow the admin to add an event to the events page
// "event" is basicly an image the admin can upload to the events page
function AddEvent(props) {
	// create the upload box
	const [image, setImage] = useState();
	const [file, setFile] = useState();

	const ids = {
		uploadFile: "upload_file",
		uploadFileLabel: "upload_file_label",
	};

	const handleChange = (e) => {
		const file = e.target.files[0];
		// if the user selected an image
		if (file) {
			// set the image to the uploaded image
			setImage(URL.createObjectURL(file));
			setFile(file);
		}
	};

	// this function will upload the image to the firebase storage
	const handleUpload = () => {
		// alert and return if image is null
		if (!file) {
			alert("Please select an image to upload");
			return;
		}
		addEventToStorage();
	};

	// this function will upload the image to the firebase storage
	const addEventToStorage = async () => {
		// create a reference to the firebase storage
		const imageRef = ref(storage, `Events/${file.name + "_" + Date.now()}`);
		// upload the image to the firebase storage
		uploadBytes(imageRef, file).then((snapshot) => {
			// add the image to the Events collection
			addEventToCollection(imageRef.fullPath);
		});
	};

	const addEventToCollection = async (imageUrl = "") => {
		// create a new document in the Events collection
		const eventRef = collection(db, "Events");
		await addDoc(eventRef, {
			// add the image to the document
			Date: new Date().toLocaleDateString(),
			Title: document.getElementById("input_field_add_event_title").value,
			Description: document.getElementById("add_event_description").value,
			imgUrl: imageUrl,
		});

		// update the events list
		props.updateEvents();
	};

	return (
		<div id="add_event_container" className="container glassify">
			<h2>{props.languageHelper.header}</h2>
			<div className="grid-2">
				<div className="container">
					<InputField
						_id="add_event_title"
						type="text"
						label={props.languageHelper.title}
					/>
					{/* <InputField _id="add_event_description" type="text" label="Description" /> */}
					<div className="add_event_description_div input_field">
						<label htmlFor="add_event_description">
							{props.languageHelper.description}:
						</label>
						<textarea
							id="add_event_description"
							name="add_event_description"
							cols="30"
							rows="10"
						></textarea>
					</div>
				</div>
				<div className="container">
					<label
						className="choose_file_button"
						id={ids.uploadFileLabel}
						htmlFor={ids.uploadFile}
					>
						{props.languageHelper.chooseFile}
						<input id={ids.uploadFile} type="file" onChange={handleChange} />
					</label>
					<div className="image_preview_div">
						<img
							className="image_preview"
							src={
								image
									? image
									: "https://craftsnippets.com/articles_images/placeholder/placeholder.jpg"
							}
							alt="firebase-image"
						/>
					</div>
				</div>
			</div>
			<button className="submit_button" onClick={handleUpload}>
				{props.languageHelper.submit}
			</button>
		</div>
	);
}

export default AddEvent;
