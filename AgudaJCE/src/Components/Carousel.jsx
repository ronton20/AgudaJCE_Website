import React, { useState, useEffect } from "react";
import Event from "./Event.jsx";

import "../css/Carousel.css";

import arrow from "../assets/arrow.png";

const Carousel = (props) => {
	const items = props.events;
	const [state, setState] = useState({
		currentIndex: 0,
		translateValue: 0,
	});

	const { currentIndex, translateValue } = state;

	useEffect(() => {
		setState({
			...state,
			currentIndex: 0,
			translateValue: 0,
		});
	}, [props.currLang]);

	const goToPrevSlide = () => {
		if (currentIndex === 0) return;

		setState({
			...state,
			currentIndex: currentIndex - 1,
			translateValue:
				props.currLang === "he"
					? translateValue - slideWidth()
					: translateValue + slideWidth(),
		});
	};

	const goToNextSlide = () => {
		if (currentIndex === items.length - 1) return;

		setState({
			...state,
			currentIndex: currentIndex + 1,
			translateValue:
				props.currLang === "he"
					? translateValue + slideWidth()
					: translateValue - slideWidth(),
		});
	};

	const slideWidth = () => {
		return document.querySelector(".carousel__slide").clientWidth;
	};

	return (
		<div className={`carousel`}>
			<div
				className="carousel__wrapper"
				style={{
					transform: `translateX(${translateValue}px)`,
					transition: "transform ease-out 0.45s",
				}}
			>
				{items.map((event, index) => (
					<div key={index} className="carousel__slide">
						<Event key={event.id} data={event} removable={false} updateEvents={null} />
					</div>
				))}
			</div>

			<button
				className="carousel__btn next"
				onClick={goToPrevSlide}
				style={props.currLang === "he" ? { right: "0" } : { left: "0" }}
			>
				<img
					src={arrow}
					alt="next"
					style={props.currLang === "he" ? {} : { transform: "scaleX(-1)" }}
				/>
			</button>
			<button
				className="carousel__btn prev"
				onClick={goToNextSlide}
				style={props.currLang === "he" ? { left: "0" } : { right: "0" }}
			>
				<img
					src={arrow}
					alt="prev"
					style={props.currLang === "he" ? { transform: "scaleX(-1)" } : {}}
				/>
			</button>
		</div>
	);
};

export default Carousel;
