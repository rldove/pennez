const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const parents = mongoose.model("parents");
const students = mongoose.model("students");
const teachers = mongoose.model("teachers");

passport.serializeUser((user, done) => {
  done(null, user.username);
});

passport.deserializeUser(function(id, done) {
  students.findOne({ username: id }, function(err, user) {
    if (err) done(err);
    if (user) {
      done(null, user);
    } else {
      parents.findOne({ username: id }, function(err, user) {
        if (err) done(err);
        if (user) {
          done(null, user);
        } else {
          teachers.findOne({ username: id }, function(err, user) {
            if (err) done(err);
            done(null, user);
          });
        }
      });
    }
  });
});

passport.use(
  "parent-local",
  new LocalStrategy(async (username, password, done) => {
    await parents.findOne({ username: username }, function(err, user) {
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
      if (user.accountType != parent){
        console.log("wrong accout type");
        return done(null,false,{message:"wrong accout type, please choose the right one as you register"})
      } 

      console.log(user);
      return done(null, user);
    });
  })
);

passport.use(
  "teacher-local",
  new LocalStrategy(async (username, password, done) => {
    await teachers.findOne({ username: username }, function(err, user) {
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

passport.use(
  "student-local",
  new LocalStrategy(async (username, password, done) => {
    await students.findOne({ username: username }, function(err, user) {
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
