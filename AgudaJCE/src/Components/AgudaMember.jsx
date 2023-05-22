import React from "react";
import "../css/AgudaMember.css";



function AgudaMember(props) {
	const deleteMember = async (e) => {
        e.preventDefault();
        const first_name = document.getElementById(`input_field_${ids.firstName}`).value;
        const last_name = document.getElementById(`input_field_${ids.lastName}`).value;
        
        const q = query(collection(db, "AgudaMembers"), where("Name", "==", first_name + " " + last_name));
		const querySnapshot = await getDocs(q);
        const docId = querySnapshot.docs[0].id;

        try {
            await deleteDoc(doc(db, "AgudaMembers", docId));
            console.log("Document successfully deleted!");
        }
        catch (error) {
            console.log(error.message);
        }
    };

	
	return (
		<div className="agudaMember">
			<img src={props.data.Img} alt={props.data.Name} />
			<h3>{props.data.Name}</h3>
			<p>{props.data.Position}</p>
		</div>
	);
}

export default AgudaMember;
