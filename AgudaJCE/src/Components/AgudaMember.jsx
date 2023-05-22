import React from "react";
import "../css/AgudaMember.css";

function AgudaMember(props) {
	return (
		<div className="agudaMember">
			<img src={props.data.Img} alt={props.data.Name} />
			<h3>{props.data.Name}</h3>
			<p>{props.data.Position}</p>
		</div>
	);
}

export default AgudaMember;
