import React from "react";
import "../css/Background.css";

import background from "../assets/Background1.png";

const Background = (props) => {
	const classes = props.absolute ? "BG absolute" : "BG";
	return <img src={background} alt="background-picture" className={classes} />;
};

export default Background;
