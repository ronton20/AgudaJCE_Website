import React from "react";
import "../css/RemoveButton.css";

const RemoveButton = (props) => {
	return (
		<button
			className={props.absolute ? "remove_button absolute" : "remove_button"}
			onClick={props.onClick}
		>
			<div className="removeCircle">
				<div className="removeLine1"></div>
				<div className="removeLine2"></div>
			</div>
		</button>
	);
};

export default RemoveButton;
