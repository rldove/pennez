const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
require('dotenv').config()

require("./server/models/parentUsers");
require("./server/models/teacherUsers");
// require("./server/models/googleUser");
require("./server/models/Survey");
require("./server/models/Student");
require("./server/models/VoiceClip");
require("./server/models/readingSource");
// require("./services/passport");
require("./server/services/passportAll");
// require("./services/passportStudent");

mongoose.connect(process.env.MONGO_URI);

const app = express();

app.use(bodyParser.json());

app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [process.env.COOKIE_KEY]
	})
);
app.use(passport.initialize());
app.use(passport.session());

require("./server/routes/authParentRoutes")(app);
require("./server/routes/authTeacherRoute")(app);
require("./server/routes/studentRoutes")(app);
require("./server/routes/awsTranscribeRoutes")(app);
require("./server/routes/readingSourceRoutes")(app);
require("./server/routes/authAdminRoutes")(app);
// require("./server/routes/surveyRoutes")(app);

if (process.env.NODE_ENV === "production") {
	// express will serve up production assets
	// Like our main.js file, or main.css file
	app.use(express.static("client/build"));
	// Express will serve up the index.html file
	// if it doesn't recognize the route
	const path = require("path");
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);

// npm run dev
