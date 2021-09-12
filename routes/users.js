const _ = require('lodash');
const bcrypt = require('bcrypt');
const express = require('express');
const { User, validateUser } = require('../models/user');
const { successResult, failureResult } = require('../utils');

const router = express.Router();

router.post('/', async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.send(400).json(failureResult(error.details[0].message));

  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json(failureResult('User already registered'));
    }

    const salt = await bcrypt.genSalt(10);

    user = new User({
      name,
      email,
      password: await bcrypt.hash(password, salt),
    });

    await user.save();
    return res
      .status(201)
      .json(successResult(_.pick(user, ['_id', 'name', 'email'])));
  } catch (ex) {
    return res.status(500).json(failureResult(ex.message));
  }
});

module.exports = router;
