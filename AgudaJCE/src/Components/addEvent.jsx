import React, { useState } from "react";
import { app, auth, db, storage } from "../firebase.js";
import { collection, doc, addDoc, setDoc, getDocs, query} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import InputField from "./InputField.jsx";



// this function will allow the admin to add an event to the events page
// "event" is basicly an image the admin can upload to the events page
function AddEvent(props) {
    // create the upload box
    const [image, setImage] = useState(null);
    const [imageName, setImageName] = useState("");

    const handleChange = (e) => {
        if (e.target.files[0]) {
            // set the image to the uploaded image
            setImage(URL.createObjectURL(e.target.files[0]));
            // set the image name to the uploaded image name without the file type
            setImageName(e.target.files[0].name.split(".")[0]);
        }
    };

    // this function will upload the image to the firebase storage
    const handleUpload = () => {
        // alert and return if image is null
        if (image == null) {
            alert("Please select an image to upload");
            return;
        }
        addEventToStorage(image);
    };

    // this function will upload the image to the firebase storage
    const addEventToStorage = async (image) => {
        // create a reference to the firebase storage
        const imageRef = ref(storage, `Events/${imageName + '_' + Date.now()}`);
        // upload the image to the firebase storage
        uploadBytes(imageRef, image).then(() => {
            alert("Image uploaded successfully to the storage");
        })
        // add the image to the Events collection
        addEventToCollection(imageRef.fullPath);
    };

    const addEventToCollection = async (imageUrl="") => {
        // create a new document in the Events collection
        const eventRef = collection(db, "Events");
        await addDoc(eventRef, {
            // add the image to the document
            Date: new Date().toLocaleDateString(),
            Title: document.getElementById("input_field_add_event_title").value,
            Description: document.getElementById("input_field_add_event_description").value,
            imgUrl: imageUrl,
        });
    };

    return (
        <div>
            <div>
                <InputField _id="add_event_title" type="text" label="Title"/>
                <InputField _id="add_event_description" type="text" label="Description"/>
            </div>
            <div>
            <input type="file" onChange={handleChange} />
            <img src={image? image : "http://via.placeholder.com/900x500"} alt="firebase-image" />
            </div>
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
}


export default AddEvent;