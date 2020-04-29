const mongoose = require("mongoose");
const { Schema } = mongoose;

const VoiceClip = new Schema({
  audioS3link: String,
  audioType: String,
  audioS3key: String,
  username: String,
  firstName: String,
  lastName: String,
  supervisorId: String,
  studentId: String,
  lexileReadingLevel: String,
  readingGradeLevel: String,
  schoolDistrictName: String,
  state: String,
  zipCode: Number,
  currentGradeLevel: String,
  firstName_lastName_teacher: String,
  sourceName: String,
  sourceReadingLevel: String,
  sourceLexile: String,
  sourceFiction: String,
  sourceWordCounts: Number,
  sourceContent: String,
  comment: { type: String, default: "false" },
  commentByAdmin: { type: String, default: "false" },
  commentByParent: { type: String, default: "false" },
  commentByTeacher: { type: String, default: "false" },
  dateCreate: { type: Date, default: Date.now }
});

mongoose.model("voiceclips", VoiceClip);
