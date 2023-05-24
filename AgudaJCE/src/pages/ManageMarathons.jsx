import React, { useEffect, useState } from "react";
import { db } from "../firebase.js";
import { collection, getDocs } from "firebase/firestore";
import "./ManageAgudaMembers.css";

import AddMarathon from "../Components/AddMarathon.jsx";
import Marathon from "../Components/Marathon.jsx";

function ManageMarathons(props) {
    const [marathons, setMarathons] = useState([]);

    async function updateMarathons() {
        const querySnapshot = await getDocs(collection(db, "Marathons"));
        const marathons = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        setMarathons(marathons);
    }

    useEffect(() => {
        updateMarathons();
    }, []);

    return (
        <div id="manage_marathons_page">
            <div id="addMarathons">
                <AddMarathon
                    languageHelper={props.languageHelper.addMarathon}
                    updateMarathons={updateMarathons}
                />
            </div>
            <div id="marathons">
                {marathons.map((marathon) => (
                    <Marathon
                        key={marathon.id}
                        data={marathon}
                        removable={true}
                        updateMarathons={updateMarathons}
                        languageHelper={props.languageHelper.addMarathon}
                    />
                ))}
            </div>
        </div>
    );
}

export default ManageMarathons;