const mongoose = require("mongoose");
const { Schema } = mongoose;

const studentSchema = new Schema({
  firstName: String,
  lastName: String,
  schoolDistrictName: String,
  state: String,
  zipCode: Number,
  currentGradeLevel: String,
  firstName_lastName_teacher: String,

  username: String,
  password: String,

  lexileReadingLevel: { type: String, default: "" },
  readingGradeLevel: { type: String, default: "" },
  accountType: { type: String, default: "Student" },
  _supervisor: { type: Schema.Types.ObjectId, ref: "User" }
});

mongoose.model("students", studentSchema);
