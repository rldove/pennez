const mongoose = require("mongoose");
const { Schema } = mongoose;

const googleUserSchema = new Schema({
  googleId: String,
  googleEmail: String,
  googlePic: String,
  googleName: String,
  googleGivenName: String,
  googleFamilyName: String,
  googleLocale: String
});

mongoose.model("googleUsers", googleUserSchema);
