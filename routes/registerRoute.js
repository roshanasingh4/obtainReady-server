const bcrypt = require("bcrypt");
const express = require('express');
const router = express.Router();
const Users = require("../models/userModel");
const { check, validationResult } = require('express-validator');

router.post('/register', [
    check('fname', 'First name is required').not().isEmpty(),
    check('lname', 'Last name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

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
          return res.status(204).json({
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
        const user = await Users.findOne({ email: req.body.email });
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
        const newUser = new Users({
          fname,
          lname,
          password: passwordHash,
          cpassword: passwordHash,
          email,
          phone,
          dob,
          designation,
        });
    
        //save user to databas
        await newUser.save();
    
        res.status(201).json({
          msg: "User created successfully",
        });
      } catch (err) {
        console.log(err);
        res.status(400).json({
          msg: err.message,
        });
      }
})


module.exports = router;