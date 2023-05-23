import React, { useState } from "react";
import { db, storage } from "../firebase.js";
import { collection, addDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import InputField from "./InputField.jsx";

// this function will allow the admin to add an event to the events page
// "event" is basicly an image the admin can upload to the events page
function AddEvent(props) {
	// create the upload box
	const [image, setImage] = useState();
	const [file, setFile] = useState();

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
		const imageRef = ref(storage, `Events/${file.name}`);
		// upload the image to the firebase storage
		uploadBytes(imageRef, file);
		// add the image to the Events collection
		addEventToCollection(imageRef.fullPath);
	};

	const addEventToCollection = async (imageUrl = "") => {
		// create a new document in the Events collection
		const eventRef = collection(db, "Events");
		await addDoc(eventRef, {
			// add the image to the document
			Date: new Date().toLocaleDateString(),
			Title: document.getElementById("input_field_add_event_title").value,
			Description: document.getElementById("input_field_add_event_description").value,
			imgUrl: imageUrl,
		});

		// update the events list
		props.updateEvents();
	};

	return (
		<div>
			<div>
				<InputField _id="add_event_title" type="text" label="Title" />
				<InputField _id="add_event_description" type="text" label="Description" />
			</div>
			<div>
				<input type="file" onChange={handleChange} />
				<img src={image ? image : "http://via.placeholder.com/300"} alt="firebase-image" />
			</div>
			<button onClick={handleUpload}>Upload</button>
		</div>
	);
}

export default AddEvent;
