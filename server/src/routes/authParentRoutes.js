const passport = require("passport");
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");

const Parents = mongoose.model("parents");

module.exports = app => {
	app.post(
		"/api/parent/login",
		passport.authenticate("parent-local", (err, user, info) => {
			if (err) {
				console.log({ err: err })
				res.send(err)
			}
			successRedirect: "/api/current_user"
		}),
		(req, res) => {
			res.send(req);
		}
	);

	app.get("/api/accounts/parentprofile", requireLogin, async (req, res) => {
		const parent = await Parents.find({ _id: req.user._id });
		res.send(parent);
	});

	app.get("/api/logout", (req, res) => {
		req.logout();
		res.redirect("/");
	});

	app.get("/api/current_user", (req, res) => {
		res.send(req.user);
	});

	app.post("/api/parents/profile/edit", requireLogin, async (req, res) => {
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
			addressZipcode: req.body.addressZipcode
		};
		const options = { upsert: false };

		Parents.updateOne(query, update, options)
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

	app.get("/api/accounts/parents/list", async (req, res) => {
		const parent = await Parents.findOne({ userName: req.user.userName });

		res.send(parent);
	});

	app.post("/api/accounts/parents", async (req, res) => {
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
			addressZipcode
		} = req.body;

		const parent = new Parents({
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
			addressZipcode
		}).save();
		res.send(req.user);
	});
};
