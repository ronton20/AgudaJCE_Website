import React from "react";
import "../css/Action.css";

const Action = (props) => {
	return (
		<div className="action glow" onClick={props.onClick}>
			<img className="action_img" src={props.img} alt={props.title} />
			<h3 className="action_title">{props.title}</h3>
		</div>
	);
};

export default Action;
