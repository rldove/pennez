const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");

require("./models/parentUsers");
require("./models/teacherUsers");
// require("./models/googleUser");
require("./models/Survey");
require("./models/Student");
require("./models/VoiceClip");
require("./models/readingSource");
// require("./services/passport");
require("./services/passportAll");
// require("./services/passportStudent");

mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
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
// require("./routes/surveyRoutes")(app);

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
