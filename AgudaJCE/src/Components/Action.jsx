import React from "react";
import "../css/Action.css";

const Action = (props) => {
	return (
		<a
			className="action glow"
			onClick={props.onClick ? props.onClick : null}
			href={props.href ? props.href : ""}
			target={props.href ? "_blank" : ""}
			rel={props.href ? "noopener noreferrer" : ""}
		>
			<img className="action_img" src={props.img} alt={props.title} />
			<h3 className="action_title">{props.title}</h3>
		</a>
	);
};

export default Action;
