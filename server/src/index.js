import express from "express";
import { json } from "body-parser";
import { connect } from "mongoose";
import cookieSession from "cookie-session";
import passport from "passport";
import dotenv from "dotenv"
dotenv.config()

import "./models/parentUsers";
import "./models/teacherUsers";
// require("./server/models/googleUser");
import "./models/Survey";
import "./models/Student";
import "./models/VoiceClip";
import "./models/readingSource";
// require("./services/passport");
import "./services/passportAll";
// require("./services/passportStudent");

connect(process.env.MONGO_URI);

const app = express();

app.use(json());

app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [process.env.COOKIE_KEY]
	})
);
app.use(passport.initialize());
app.use(passport.session());

require("./routes/authParentRoutes")(app);
require("./routes/authTeacherRoute")(app);
require("./routes/studentRoutes")(app);
require("./routes/awsTranscribeRoutes")(app);
require("./routes/readingSourceRoutes")(app);
require("./routes/authAdminRoutes")(app);
// require("./server/routes/surveyRoutes")(app);

// if (process.env.NODE_ENV === "production") {
// 	// express will serve up production assets
// 	// Like our main.js file, or main.css file
// 	app.use(express.static("../client/build"));
// 	// Express will serve up the index.html file
// 	// if it doesn't recognize the route
// 	const path = require("path");
// 	app.get("*", (req, res) => {
// 		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
// 	});
// }

app.use(express.static(path.join(__dirname, '../client/build')));
app.get('/', function (req, res) {
	console.log(req)
	res.sendFile(path.join(__dirname, '../cllient/build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);

// npm run dev
