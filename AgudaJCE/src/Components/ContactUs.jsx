import React, { useRef } from "react";
import InputField from "./InputField.jsx";
import "../css/ContactUs.css";

import emailjs from "@emailjs/browser";

function ContactUs(props) {
	const ids = {
		fullName: "contact_us_full_name",
		email: "contact_us_email",
	};
	const form = useRef();

	const sendEmail = (e) => {
		e.preventDefault();

		console.log(form.current);
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
			<form className="contact_us_form container" ref={form} onSubmit={sendEmail}>
				<div className="form_row">
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
					<InputField
						_id="contact_us_phone"
						label={props.languageHelper.phone}
						_name="from_phone"
						type="text"
					/>
				</div>

				<div className="form_row">
					<div className="input_field">
						<label>{props.languageHelper.department}:</label>
						<select name="department">
							<option value={props.languageHelper.departments.software}>
								{props.languageHelper.departments.software}
							</option>
							<option
								value={props.languageHelper.departments.industry_and_management}
							>
								{props.languageHelper.departments.industry_and_management}
							</option>
							<option
								value={props.languageHelper.departments.electrical_and_electronics}
							>
								{props.languageHelper.departments.electrical_and_electronics}
							</option>
							<option value={props.languageHelper.departments.mechanical}>
								{props.languageHelper.departments.mechanical}
							</option>
							<option value={props.languageHelper.departments.materials}>
								{props.languageHelper.departments.materials}
							</option>
							<option value={props.languageHelper.departments.pharma}>
								{props.languageHelper.departments.pharma}
							</option>
							<option value={props.languageHelper.departments.civil}>
								{props.languageHelper.departments.civil}
							</option>
							<option value={props.languageHelper.departments.pre_academic}>
								{props.languageHelper.departments.pre_academic}
							</option>
							<option value={props.languageHelper.departments.masters}>
								{props.languageHelper.departments.masters}
							</option>
						</select>
					</div>
					<div className="input_field">
						<label>{props.languageHelper.year}:</label>
						<select name="year">
							<option value={props.languageHelper.years.first}>
								{props.languageHelper.years.first}
							</option>
							<option value={props.languageHelper.years.second}>
								{props.languageHelper.years.second}
							</option>
							<option value={props.languageHelper.years.third}>
								{props.languageHelper.years.third}
							</option>
							<option value={props.languageHelper.years.fourth}>
								{props.languageHelper.years.fourth}
							</option>
							<option value={props.languageHelper.years.other}>
								{props.languageHelper.years.other}
							</option>
						</select>
					</div>
				</div>

				<div className="form_row">
					<InputField
						_id="contact_us_subject"
						label={props.languageHelper.subject}
						_name="subject"
						type="text"
					/>
					<div className="input_field">
						<label>{props.languageHelper.subject_area}:</label>
						<select name="subject_field">
							<option value={props.languageHelper.subjects.academy}>
								{props.languageHelper.subjects.academy}
							</option>
							<option value={props.languageHelper.subjects.colture}>
								{props.languageHelper.subjects.colture}
							</option>
							<option value={props.languageHelper.subjects.sport}>
								{props.languageHelper.subjects.sport}
							</option>
							<option value={props.languageHelper.subjects.industry}>
								{props.languageHelper.subjects.industry}
							</option>
							<option value={props.languageHelper.subjects.welfare}>
								{props.languageHelper.subjects.welfare}
							</option>
							<option value={props.languageHelper.subjects.population}>
								{props.languageHelper.subjects.population}
							</option>
							<option value={props.languageHelper.subjects.suggestions}>
								{props.languageHelper.subjects.suggestions}
							</option>
							<option value={props.languageHelper.subjects.other}>
								{props.languageHelper.subjects.other}
							</option>
						</select>
					</div>
				</div>

				<div className="text_area_div input_field">
					<label htmlFor="contact_us_textarea">{props.languageHelper.message}:</label>
					<textarea
						id="contact_us_textarea"
						className="contact_us_textarea"
						placeholder={props.languageHelper.message}
						name="message"
					></textarea>
				</div>

				<button className="submit_button" type="submit">
					{props.languageHelper.submit}
				</button>
			</form>
		</div>
	);
}

export default ContactUs;
