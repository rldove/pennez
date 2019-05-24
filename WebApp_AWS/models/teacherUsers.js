const mongoose = require("mongoose");
const { Schema } = mongoose;

const teacherUserSchema = new Schema({
  // _googleUser: { type: Schema.Types.ObjectId, ref: "googelUsers" },

  username: String,
  firstName: String,
  familyName: String,
  password: String,
  email: String,
  phoneNum: Number,
  accountType: String,

  addressStreet: { type: String, default: "" },
  addressCity: { type: String, default: "" },
  addressState: { type: String, default: "" },
  addressZipcode: Number,
  schoolType: String,
  dataSent: { type: Date, default: Date.now }
});

mongoose.model("teachers", teacherUserSchema);
