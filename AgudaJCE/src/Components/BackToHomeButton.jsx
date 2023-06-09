import React from "react";
import "../css/BackToHomeButton.css";
import homeImg from "../assets/home.png";

const BackToHomeButton = () => {
	return (
		<div className="back-to-home-div">
			<a href="/">
				<img src={homeImg} alt="Home" />
			</a>
		</div>
	);
};

export default BackToHomeButton;
