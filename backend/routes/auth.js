const express = require('express');
const bcrypt = require('bcrypt');
// const Educator = require('../models/educator');
const Student = require('../models/student');
const router = express.Router();


router.post('/register/student', async (req, res) => {
  try {
    const { password, ...rest } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const student = new Student({ ...rest, password: hashedPassword });
    await student.save();
    res.status(201).send('Student registered');
  } catch (error) {
    res.status(400).send(error.message);
  }
});



// router.post('/register/educator', async (req, res) => {
//   try {
//     const { password, ...rest } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const educator = new Educator({ ...rest, password: hashedPassword });
//     await educator.save();
//     res.status(201).send('Educator registered');
//   } catch (error) {
//     res.status(400).send(error.message);
//   }
// });







const validateEducatorData = (data) => {
  const requiredFields = ['username', 'email', 'password', 'collegeName', 'experience'];
  for (const field of requiredFields) {
    if (!data[field]) {
      throw new Error(`Missing required field: ${field}`);
    }
  }
};

router.post('/register/educator', async (req, res) => {
  try {
    validateEducatorData(req.body);
    const { password, ...rest } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const educator = new Educator({ ...rest, password: hashedPassword });
    await educator.save();
    res.status(201).send('Educator registered');
  } catch (error) {
    console.error('Error registering educator:', error.message);
    res.status(400).send('Error registering educator: ' + error.message);
  }
});



router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    let user;

    user = await Educator.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
      req.session.user = { id: user._id,  username: Educator.username, role: 'educator' };
      return res.status(200).json({ role: 'educator' });
    }



    
    user = await Student.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
      req.session.user = { id: user._id, role: 'student' };
      return res.status(200).json({ role: 'student' });
    }

    res.status(400).send('Invalid email or password');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).send('Internal Server Error');
    res.status(200).send('Logged out');
  });
});










module.exports = router;
