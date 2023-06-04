import React, { useRef } from "react";
import InputField from "./InputField.jsx";
import emailjs from "@emailjs/browser";

import "../css/ContactUs.css";

function ContactUs(props) {
	const ids = {
		fullName: "contact_us_full_name",
		email: "contact_us_email",
		textArea: "contact_us_text_area",
	};
	const form = useRef();

	const sendEmail = (e) => {
		e.preventDefault();

		emailjs
			.sendForm("service_1b0ai8x", "template_xtpoctj", form.current, "wdHyAazrWD5Ae01Xf")
			.then(
				(result) => {
					console.log(result.text);
				},
				(error) => {
					console.log(error.text);
				}
			);
	};

	return (
		<div className="contact_us_div">
			<form className="contact_us_form container glassify" ref={form} onSubmit={sendEmail}>
				<div className="contact_us_inputs">
					<InputField
						_id={ids.fullName}
						label={props.languageHelper.fullName}
						_name="from_name"
						type="text"
					/>
					<InputField
						_id={ids.email}
						label={props.languageHelper.email}
						_name="from_email"
						type="text"
					/>
				</div>

				<div className="input_field">
					<label htmlFor={ids.textArea}>{props.languageHelper.message}:</label>
					<textarea
						id={ids.textArea}
						className="contact_us_textarea"
						placeholder={props.languageHelper.message}
						name="message"
					></textarea>
				</div>
				<button className="submit_button" type="submit">
					{" "}
					{props.languageHelper.submit}{" "}
				</button>
			</form>
		</div>
	);
}

export default ContactUs;
