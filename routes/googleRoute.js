const express = require("express");
const passport = require("passport");
const userController = require("../controllers/googleCtrl");

const userRouter = express.Router();

userRouter.get("/auth/google", passport.authenticate("google", {scope:['profile']}));

userRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/callback",
    failureRedirect: "/fail",
  })
);

userRouter.get("/fail", (req, res) => {
  res.send("Failed attempt");
});

userRouter.get("/", (req, res) => {
  res.send("Success");
});

module.exports = userRouter;