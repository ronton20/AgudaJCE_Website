import React from "react";
import "../css/addUsers.css";

import Papa from "papaparse";
import { auth, db } from "../firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";

function UpdateUsers(props) {
	const ids = {
		uploadFileLabel: "add_users_upload_file_label",
	};

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (!file || !file.name.endsWith(".csv") || file.type !== "text/csv" || !file.size) {
			return;
		}
		parseCSV(file);
	};

	const parseCSV = (file) => {
		// get the input id ids.uploadFile
		const uploadFile = document.getElementById(ids.uploadFileLabel);
		// change the text to uploading
		uploadFile.innerHTML = props.languageHelper.uploading;

		const currentUser = auth.currentUser;
		const reader = new FileReader();

		Papa.parse(file, {
			header: true,
			skipEmptyLines: true,
			complete: async function (results) {
				// get all the users IDs from the DB
				const querySnapshot = await getDocs(collection(db, "Users"));
				const users = querySnapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				for (const csvUser of results.data) {
					const userId =
						csvUser.idNumber.length < 9 ? "0" + csvUser.idNumber : csvUser.idNumber;
					// if the user in the CSV and not in the DB already add the user
					const existingUser = users.find((u) => u.id === userId);
					if (!existingUser) {
						try {
							// Create a new user with the provided email and password
							await createUserWithEmailAndPassword(auth, csvUser.email, userId);

							// Create a user document in the "users" collection with the same UID and isAdmin set to false
							const userRef = collection(db, "Users");

							await addDoc(userRef, {
								id: userId,
								email: csvUser.email,
								first_name: csvUser.firstName,
								last_name: csvUser.lastName,
								phone: "0" + csvUser.phone,
								isAdmin:
									csvUser.isAdmin === "TRUE" || csvUser.isAdmin === "true"
										? true
										: false,
								block: false,
							});

							// User creation successful
						} catch (error) {
							// Handle any errors
							console.error("User creation error:", error);
						}
						await auth.updateCurrentUser(currentUser);
					}
					// if the user in the CSV and in the DB already update the user and delete the user from users array
					else {
						const docId = querySnapshot.docs.find((doc) => doc.data().id === userId).id;
						// try to update the user
						try {
							const userRef = doc(db, "Users", docId);
							await updateDoc(userRef, {
								email: csvUser.email,
								first_name: csvUser.firstName,
								last_name: csvUser.lastName,
								phone: "0" + csvUser.phone,
								isAdmin:
									csvUser.isAdmin === "TRUE" || csvUser.isAdmin === "true"
										? true
										: false,
								block: false,
							});
						} catch (error) {
							// Handle any errors
							console.error("User update error:", error);
						}
						// delete the user from the users array
						users.splice(users.indexOf(existingUser), 1);
					}
				}
				// if the user in the DB and not in the CSV, block the user
				for (const user of users) {
					const docId = querySnapshot.docs.find((doc) => doc.data().id === user.id).id;
					try {
						const userRef = doc(db, "Users", docId);
						await updateDoc(userRef, {
							block: true,
						});
					} catch (error) {
						// Handle any errors
						console.error("User update error:", error);
					}
				}
				// change the text to success
				uploadFile.innerHTML = props.languageHelper.fileUploadSuccess;
				// change the text to green with green border
				uploadFile.style.color = "green";
				uploadFile.style.border = "2px solid green";
			},
		}
		);

	};

	return (
		<div className="add_users_div">
			<h2>{props.languageHelper.updateUsers}</h2>
			<label id={ids.uploadFileLabel} className="choose_file_button" htmlFor={ids.uploadFile}>
				{props.languageHelper.chooseFile}
				<input id={ids.uploadFile} type="file" accept=".csv" onChange={handleFileChange} />
			</label>
		</div>
	);
}

export default UpdateUsers;
