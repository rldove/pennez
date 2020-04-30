const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  _googleUser: { type: Schema.Types.ObjectId, ref: "googelUsers" },

  userName: String,
  firstName: String,
  familyName: String,
  password: String,
  email: String,

  accountType: String,

  createDate: Date
});

mongoose.model("users", userSchema);
