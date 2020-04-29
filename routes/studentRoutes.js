const passport = require("passport");
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");

const Student = mongoose.model("students");
const VoiceClips = mongoose.model("voiceclips");
const ReadingSource = mongoose.model("readingsources");

module.exports = app => {
  app.post(
    "/api/student/login",
    passport.authenticate("student-local", {
      successRedirect: "/api/current_user"
    }),
    (req, res) => {
      res.send(req.user);
    }
  );

  app.get("/api/students/voicedata", requireLogin, async (req, res) => {
    const voiceData = await VoiceClips.find({ supervisorId: req.user._id });

    res.send(voiceData);
  });

  app.get("/api/students/source", requireLogin, async (req, res) => {
    const readingSource = await ReadingSource.find({
      readingGradeLevel: req.user.readingGradeLevel
    });

    res.send(readingSource);
  });

  app.post("/api/students/voice", requireLogin, async (req, res) => {
    const {
      audioS3link,
      audioType,
      audioS3key,
      username,
      firstName,
      lastName,
      supervisorId,
      studentId,
      lexileReadingLevel,
      readingGradeLevel,
      schoolDistrictName,
      state,
      zipCode,
      currentGradeLevel,
      firstName_lastName_teacher,
      sourceName,
      sourceReadingLevel,
      sourceLexile,
      sourceFiction,
      sourceWordCounts,
      sourceContent,
      comment,
      commentByAdmin,
      commentByParent,
      commentByTeacher
    } = req.body;

    const voiceClip = new VoiceClips({
      audioS3link,
      audioType,
      audioS3key,
      username,
      firstName,
      lastName,
      supervisorId,
      studentId,
      lexileReadingLevel,
      readingGradeLevel,
      schoolDistrictName,
      state,
      zipCode,
      currentGradeLevel,
      firstName_lastName_teacher,
      sourceName,
      sourceReadingLevel,
      sourceLexile,
      sourceFiction,
      sourceWordCounts,
      sourceContent,
      comment,
      commentByAdmin,
      commentByParent,
      commentByTeacher
    });
    try {
      await voiceClip.save();
      const user = await req.user.save();
      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  app.get("/api/student/profile", requireLogin, async (req, res) => {
    const student = await Student.find({ _id: req.user._id });
    res.send(student);
  });

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });

  app.get("/api/students/list", requireLogin, async (req, res) => {
    const students = await Student.find({ _supervisor: req.user.id });

    res.send(students);
  });

  app.post("/api/students", requireLogin, async (req, res) => {
    const {
      firstName,
      lastName,
      schoolDistrictName,
      state,
      zipCode,
      currentGradeLevel,
      firstName_lastName_teacher,
      username,
      password,
      lexileReadingLevel,
      readingGradeLevel
    } = req.body;

    const student = new Student({
      firstName,
      lastName,
      schoolDistrictName,
      state,
      zipCode,
      currentGradeLevel,
      firstName_lastName_teacher,
      username,
      password,
      lexileReadingLevel,
      readingGradeLevel,
      _supervisor: req.user.id
    });

    try {
      await student.save();

      const user = await req.user.save();
      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
