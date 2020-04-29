const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
// const keys = require("../config/keys");

const students = mongoose.model("students");

passport.serializeUser((user, done) => {
	done(null, user.username);
});

passport.deserializeUser((id, done) => {
	students.findOne({ username: id }).then(user => {
		done(null, user);
	});
});

passport.use(
	"student-local",
	new LocalStrategy(async (username, password, done) => {
		await students.findOne({ username: username }, function (err, user) {
			if (err) {
				return done(err);
			}
			if (!user) {
				console.log("User Not Found with username " + username);
				return done(null, false, { message: "username Not found." });
			}
			if (user.password != password) {
				console.log("Invalid Password");
				return done(null, false, { message: "password Not found." });
			}
			console.log(user);
			return done(null, user);
		});
	})
);
