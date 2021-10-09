const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userCtrl = {
  register: async (req, res) => {
    try {
      const {
        fname,
        lname,
        password,
        cpassword,
        email,
        phone,
        dob,
        designation,
      } = req.body;

      //Check for empty fields
      if (
        !fname ||
        !lname ||
        !password ||
        !cpassword ||
        !email ||
        !phone ||
        !dob ||
        !designation
      ) {
        return res.status(400).json({
          msg: "Please fill all the fields",
        });
      }

      //Check if passwords match
      if (password !== cpassword) {
        return res.status(400).json({
          msg: "Passwords do not match",
        });
      }
      //Check if email is already registered or not
      const user = await Users.findOne({ email });
      if (user) {
        return res.status(409).json({
          msg: "User already exists",
        });
      }
      //Check if the password is strong enough
      if (password.length < 6) {
        return res.status(400).json({
          msg: "Password must be at least 6 characters long",
        });
      }

      //password Hashing
      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = await Users.create({
        fname,
        lname,
        password: passwordHash,
        cpassword: passwordHash,
        email,
        phone,
        dob,
        designation,
      });

      //Generate access token
      const token = jwt.sign(
        {
          id: newUser._id,
          email: newUser.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME }
      );

      res.status(200).json({
        msg: "User created successfully",
        token,
      });
    } catch (err) {
      res.status(400).json({
        msg: err.message,
      });
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await Users.findOne({ email });

      //Check if user exists
      if (!user) {
        return res.status(404).json({
          msg: "User does not exist",
        });
      }

      //Check if password is correct
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          msg: "Incorrect password",
        });
      }
      //Generate access token
      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME }
      );

      res.status(200).json({
        msg: "User logged in successfully",
        token,
      });
    } catch {
      res.status(400).json({
        msg: "Login failed",
      });
    }
  },
};

module.exports = userCtrl;
