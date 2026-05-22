const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const user = require("../models/user");

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if user exists
    const userExists = await user.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create new user
    const newUser = await user.create({
      name,
      email,
      password: hashedPassword,
    });
    //Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email:newUser.email,
      token: token
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.post("/login", async (req, res) =>{
  try{
    const {email, password} = req.body;

    //1.check if user exist
    const foundUser = await user.findOne({email});

    if(!foundUser){
      return res.status(400).json({
        message: "invalid email or password"
      });
    }
    //2.compare password with hashed password 
    const isPasswordCorrect = await bcrypt.compare(password, foundUser.password)

    if (!isPasswordCorrect){
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }
    //3. Generate JWT token 
    const token = jwt.sign(
      {id: foundUser._id},
      process.env.JWT_SECRET,
      {expiresIn: '30d'}
    );
    //4. Send back user data + token 
    res.status(200).json({
      _id: foundUser._id,
      name: foundUser.name,
      email: foundUser.email,
      token: token
    });
  }catch(error){
    res.status(500).json({
      message: error.message
    });
  }
})

module.exports = router;
