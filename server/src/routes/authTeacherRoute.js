const passport = require("passport");
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");

const Teachers = mongoose.model("teachers");

module.exports = app => {
	app.post(
		"/api/teacher/login",
		passport.authenticate("teacher-local", {
			successRedirect: "/api/current_user"
		}),
		(req, res) => {
			res.send(req);
		}
	);

	app.get("/api/accounts/teacherprofile", requireLogin, async (req, res) => {
		const parent = await Teachers.find({ _id: req.user._id });
		res.send(parent);
	});

	app.get("/api/logout", (req, res) => {
		req.logout();
		res.redirect("/");
	});

	app.get("/api/current_user", (req, res) => {
		res.send(req.user);
	});
	app.post("/api/teachers/profile/edit", requireLogin, async (req, res) => {
		const query = { _id: req.body.keyId };

		const update = {
			firstName: req.body.firstName,
			familyName: req.body.familyName,
			email: req.body.email,
			phoneNum: req.body.phoneNum,
			username: req.body.username,
			password: req.body.password,

			addressStreet: req.body.addressStreet,
			addressCity: req.body.addressCity,
			addressState: req.body.addressState,
			addressZipcode: req.body.addressZipcode,

			schoolType: req.body.schoolType
		};
		const options = { upsert: false };

		Teachers.updateOne(query, update, options)
			.then(result => {
				res.sent(result);
				const { matchedCount, modifiedCount } = result;
				if (matchedCount && modifiedCount) {
					console.log(`Successfully updated the item.`);
				}
			})
			.catch(err => {
				res.send(err);
				console.error(`Failed to update the item: ${err}`);
			});
	});

	app.get("/api/accounts/teachers/list", async (req, res) => {
		const teacher = await Teachers.findOne({ userName: req.user.userName });

		res.send(teacher);
	});

	app.post("/api/accounts/teachers", async (req, res) => {
		const {
			username,
			firstName,
			familyName,
			password,
			email,
			phoneNum,
			accountType,
			addressStreet,
			addressCity,
			addressState,
			addressZipcode,
			schoolType
		} = req.body;

		const teacher = new Teachers({
			username,
			firstName,
			familyName,
			password,
			email,
			phoneNum,
			accountType,
			addressStreet,
			addressCity,
			addressState,
			addressZipcode,
			schoolType
		}).save();
		res.send(req.user);
	});
};
