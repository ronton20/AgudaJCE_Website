import React, { useState } from "react";
import { app, auth, db, storage } from "../firebase.js";
import { collection, doc, addDoc, setDoc, getDocs, query} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";



// this function will allow the admin to add an event to the events page
// "event" is basicly an image the admin can upload to the events page
function AddEvent(props) {
    // create the upload box
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");
    const [progress, setProgress] = useState(0);

    // this function will upload the image to the firebase storage
    const handleChange = (e) => {
        if (e.target.files[0]) {
            // set the image response to alt="firebase-image" to the image
            setImage(e.target.files[0]);
        }
    };

    // this function will upload the image to the firebase storage
    const handleUpload = () => {
        console.log("handleUpload");
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
        console.log("addEventToStorage");
        const imageRef = ref(storage, `Events/${image.name + '_' + Date.now()}`);
        // upload the image to the firebase storage
        uploadBytes(imageRef, image).then(() => {
            alert("Image uploaded successfully to the storage");
        })
        // add the image to the Events collection
        console.log(imageRef.fullPath);
        addEventToCollection(imageRef.fullPath);
    };

    const addEventToCollection = async (imageUrl="") => {
        // create a new document in the Events collection
        const eventRef = collection(db, "Events");
        await addDoc(eventRef, {
            // add the image to the document
            image: imageUrl,
        });
    };

    return (
        <div>
            <progress value={progress} max="100" />
            <br />
            <input type="file" onChange={handleChange} />
            <button onClick={handleUpload}>Upload</button>
            <br />
            <img src={url || "http://via.placeholder.com/400"} alt="firebase-image" />
        </div>
    );
}


export default AddEvent;