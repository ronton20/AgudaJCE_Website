const languages = {
	en: {
		// Other sections...
		login: {
			header: "Login",
			email: "Email",
			password: "Password",
			submit: "Login",
			error_user_not_found: "User not found",
			error_wrong_password: "Wrong password",
		},
		logout: {
			header: "Logout",
			submit: "Logout",
		},
		manageMembers: {
			header: "Manage Members"
		},
		addUsers: {
			header: "Add User",
			updateUsers: "Update Users",
			firstName: "First Name",
			lastName: "Last Name",
			email: "Email",
			id: "ID",
			phone: "Phone Number",
			submit: "Add",
			chooseFile: "Choose File",
		},
		addAgudaMembers: {
			header: "Add A Member",
			firstName: "First Name",
			lastName: "Last Name",
			position: "Position",
			img: "Image Link",
			submit: "Add",
		},
		addEvent: {
			header: "Add Event",
			title: "Title",
			description: "Description",
			date: "Date",
			time: "Time",
			chooseFile: "Choose File",
			submit: "Add",
		},
		addMarathon: {
			header: "Add Marathon",
			department: "Department",
			course: "Course",
			lecturer: "Lecturer",
			date: "Date",
			price: "Price",
			currency: "₪",
			link: "Registration Link",
			submit: "Add",
		},
		marathon: {
			department: "Department",
			course: "Course",
			lecturer: "Lecturer",
			date: "Date",
			price: "Price",
			currency: "₪",
			link: "Register",
		},
		marathons: {
			header: "Marathons",
		},
		deleteAgudaMembers: {
			header: "Delete Aguda Member",
			firstName: "First Name",
			lastName: "Last Name",
			submit: "Delete",
		},
		meetingRooms: {
			header: "Meeting Rooms",
			meeting_room_1: "Room 1",
			meeting_room_2: "Room 2",
			meeting_room_3: "Room 3",
			morning: "Morning",
			afternoon: "Afternoon",
			evening: "Evening",
		},
		manageAgudaMembers: {
			header: "Manage Aguda Members",
		},
		manageEvents: {
			header: "Manage Events",
		},
		manageMarathons: {
			header: "Manage Marathons",
		},
		navBar: {
			header: "Admin Panel",
			home: "Home",
			manageAgudaMembers: "Manage Aguda Members",
			manageEvents: "Manage Events",
			manageMarathons: "Manage Marathons",
			manageUsers: "Manage Users",
			meetingRooms: "Manage Meeting Rooms",
			aguda: "Aguda",
			actions: "Actions",
			agudaMembers: "Aguda Members",
			events: "Events",
			contactUs: "Contact Us",
		},
		mainPage: {
			header: "Welcome to Azrielli's Student Union",
			about: "About",
			aboutText:
				"The Azrieli College of Engineering Jerusalem Student Union is a student organization that works for the benefit of the students of the college.",
			aboutText2:
				"The Student Union is the official representative of the students in the college and is responsible for the welfare of the students and their rights.",
			aboutText3:
				"The Student Union is the body that organizes the social life of the students in the college and is responsible for the various events that take place in the college.",

			agudaMembers: "Aguda Members",

			events: "Events",
			eventsText:
				"The Student Union is responsible for organizing various events in the college, such as: parties, trips, lectures, etc.",

			contactUs: "Contact Us",
		},
		contactUs: {
			header: "Contact Us",
			fullName: "Full Name",
			email: "Email",
			message: "Message",
			submit: "Send",
		},
		actions: {
			meetingRooms: "Book a Meeting Room",
			marathons: "Marathons",
			materials: "Go To Study Materials",
		},
		contactUs: {
			header: "Contact Us",
			fullName: "Full Name",
			email: "Email",
			phone: "Phone Number",

			department: "Department",
			departments: {
				software: "Software",
				industry_and_management: "Industry and Management",
				mechanical: "Mechanical",
				electrical_and_electronics: "Electrical and Electronics",
				pharma: "Pharma",
				materials: "Materials",
				civil: "Civil",
				pre_academic: "Pre Academic",
				masters: "Masters",
			},
			year: "Year",
			years: {
				first: "1st",
				second: "2nd",
				third: "3rd",
				fourth: "4th",
				other: "Other",
			},

			subject_area: "Subject Area",
			subjects: {
				academy: "Academy",
				colture: "Colture",
				sport: "Sport",
				industry: "Industry",
				welfare: "Welfare",
				population: "Population",
				suggestions: "Suggestions",
				other: "Other",
			},
			subject: "Subject",

			message: "Message",
			submit: "Submit",
		},
		scheduleMeetingRoom: {
			header: "Schedule Meeting Room",
			id1: "First Student ID",
			id2: "Second Student ID",
			id3: "Third Student ID",
			submit: "Book",
		},
	},
	he: {
		login: {
			header: "התחברות",
			email: "אימייל",
			password: "סיסמה",
			submit: "התחבר",
			error_user_not_found: "משתמש לא נמצא",
			error_wrong_password: "סיסמה שגויה",
		},
		logout: {
			header: "התנתקות",
			submit: "התנתק",
		},
		manageMembers: {
			header: "ניהול משתמשים"
		},
		addUsers: {
			header: "הוספת משתמש",
			updateUsers: "עדכון משתמשים",
			firstName: "שם פרטי",
			lastName: "שם משפחה",
			email: "אימייל",
			id: "תעודת זהות",
			phone: "מספר טלפון",
			submit: "הוסף",
			chooseFile: "בחר קובץ",
		},
		addAgudaMembers: {
			header: "הוספת חבר אגודה",
			firstName: "שם פרטי",
			lastName: "שם משפחה",
			position: "תפקיד",
			img: "קישור לתמונה",
			submit: "הוסף",
		},
		addEvent: {
			header: "הוספת אירוע",
			title: "כותרת",
			description: "תיאור",
			date: "תאריך",
			time: "שעה",
			chooseFile: "בחר קובץ",
			submit: "הוסף",
		},
		addMarathon: {
			header: "הוספת מרתון",
			department: "מחלקה",
			course: "קורס",
			lecturer: "מרצה",
			date: "תאריך",
			price: "מחיר",
			currency: "₪",
			link: "להרשמה",
			submit: "הוסף",
		},
		marathon: {
			department: "מחלקה",
			course: "קורס",
			lecturer: "מרצה",
			date: "תאריך",
			price: "מחיר",
			currency: "₪",
			link: "להרשמה",
		},
		marathons: {
			header: "הרשמה למרתונים",
		},
		deleteAgudaMembers: {
			header: "מחיקת חבר אגודה",
			firstName: "שם פרטי",
			lastName: "שם משפחה",
			submit: "מחק",
		},
		meetingRooms: {
			header: "הזמנת חדר ישיבות",
			meeting_room_1: "חדר ישיבות 1",
			meeting_room_2: "חדר ישיבות 2",
			meeting_room_3: "חדר ישיבות 3",
			morning: "בוקר",
			afternoon: "צהריים",
			evening: "ערב",
		},
		manageAgudaMembers: {
			header: "ניהול חברי אגודה",
		},
		manageEvents: {
			header: "ניהול אירועים",
		},
		manageMarathons: {
			header: "ניהול מרתונים",
		},
		navBar: {
			header: "פאנל ניהול",
			home: "בית",
			manageAgudaMembers: "ניהול חברי אגודה",
			manageEvents: "ניהול אירועים",
			manageMarathons: "ניהול מרתונים",
			manageUsers: "ניהול משתמשים",
			meetingRooms: "ניהול חדנים",
			aguda: "האגודה",
			actions: "פעולות",
			agudaMembers: "חברי אגודה",
			events: "אירועים",
			contactUs: "צור קשר",
		},
		mainPage: {
			header: "ברוכים הבאים לאתר אגודת הסטודנטים של עזריאלי",
			about: "אודות",
			aboutText:
				"אגודת הסטודנטים של מכללת עזריאלי ירושלים היא ארגון סטודנטים הפועל למען תועלת הסטודנטים במכללה.",
			aboutText2:
				"אגודת הסטודנטים היא הנציגה הרשמית של הסטודנטים במכללה ואחראית לרווחת הסטודנטים ולזכויותיהם.",
			aboutText3:
				"אגודת הסטודנטים מספקת שירותים ופעילויות לסטודנטים ומקדמת את ענייני הסטודנטים במכללה.",

			agudaMembers: "חברי אגודה",

			events: "אירועים",
			eventsText:
				"אגודת הסטודנטים מקיימת אירועים רבים במהלך השנה האקדמית, כגון: סדנאות, סיורים, ימי כיף ועוד.",

			contactUs: "צור קשר",
		},
		contactUs: {
			header: "צור קשר",
			fullName: "שם מלא",
			email: "אימייל",
			message: "תוכן ההודעה",
			submit: "שלח",
		},
		actions: {
			meetingRooms: "הזמן חדר ישיבות",
			marathons: "מרתונים",
			materials: "חומרי לימוד",
		},
		contactUs: {
			header: "צור קשר",
			fullName: "שם מלא",
			email: "אימייל",
			phone: "מספר טלפון",

			department: "מחלקה",
			departments: {
				software: "תוכנה",
				industry_and_management: "תעשיה וניהול",
				mechanical: "מכונות",
				electrical_and_electronics: "חשמל ואלקטרוניקה",
				pharma: "פארמצבטיקה",
				materials: "חומרים",
				civil: "אזרחית",
				pre_academic: "מכינה קדם אקדמאית",
				masters: "תואר שני",
			},
			year: "שנה",
			years: {
				first: "א",
				second: "ב",
				third: "ג",
				fourth: "ד",
				other: "אחר",
			},

			subject_area: "תחום",
			subjects: {
				academy: "אקדמיה",
				colture: "תרבות",
				sport: "ספורט",
				industry: "תעשיה",
				welfare: "רווחה",
				population: "אוכלוסיה",
				suggestions: "הצעות",
				other: "אחר",
			},
			subject: "נושא",

			message: "תוכן ההודעה",
			submit: "שלח",
		},
		scheduleMeetingRoom: {
			header: "קביעת חדר ישיבות",
			id1: 'ת"ז סטודנט ראשון',
			id2: 'ת"ז סטודנט שני',
			id3: 'ת"ז סטודנט שלישי',
			submit: "קבע",
		},
	},
};

export default languages;
