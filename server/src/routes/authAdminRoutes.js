const passport = require("passport");
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");

const VoiceClips = mongoose.model("voiceclips");
const Students = mongoose.model("students");

module.exports = app => {
	app.get("/api/admin/voiceall", requireLogin, async (req, res) => {
		const allVoice = await VoiceClips.find({ audioType: "audio/wav" });

		res.send(allVoice);
	});

	app.post("/api/students/voice/comment", requireLogin, async (req, res) => {
		const query = { audioS3key: req.body.voice_key };
		const update = { commentByAdmin: req.body.commentContent, comment: "true" };
		const options = { upsert: false };

		VoiceClips.updateOne(query, update, options)
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

	app.post("/api/students/profile/edit", requireLogin, async (req, res) => {
		const query = { _id: req.body.keyId };

		const update = {
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			firstName_lastName_teacher: req.body.firstName_lastName_teacher,
			password: req.body.password,
			schoolDistrictName: req.body.schoolDistrictName,
			username: req.body.username,
			state: req.body.state,
			zipCode: req.body.zipCode,
			currentGradeLevel: req.body.currentGradeLevel
		};
		const options = { upsert: false };

		Students.updateOne(query, update, options)
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
};
