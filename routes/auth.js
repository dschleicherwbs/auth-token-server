const { registerValidation, loginValidation } = require('../validation');
const dotenv = require('dotenv').config();
const UserModel = require('../model/UserModel');
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.post('/register', async (req, res) => {
  // Validate Data before adding user
  const { error } = registerValidation(req.body);
  if (error)
    return res.status(400).send(error.details.map(d => d.message).join(', '));

  // Check if Email alredy exists
  const emailExist = await UserModel.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send('Email already exist');

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new UserModel({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  });
  try {
    const savedUser = await user.save();
    res.send({ user: savedUser._id });
  } catch (error) {
    res.status(400).send(error);
  }
});

// Login
router.post('/login', async (req, res) => {
  const errMsg = 'Email or Password wrong';
  // Validate Data before adding user
  const { error } = loginValidation(req.body);
  if (error)
    return res.status(400).send(error.details.map(d => d.message).join(', '));

  // Check if Email alredy exists
  const user = await UserModel.findOne({ email: req.body.email });
  if (!user) return res.status(400).send(errMsg);

  // Check Password
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send(errMsg);

  // Create and assing Token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header('auth-token', token).send('Login successfully');
});

module.exports = router;
