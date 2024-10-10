


const express = require('express');
const bcrypt = require('bcrypt');
// const Student = require('../models/student');
const Resource = require('../models/Resource');
const router = express.Router();

const authenticateStudent = async (req, res, next) => {
  if (!req.session.user || req.session.user.role !== 'student') {
    return res.status(401).send('Access denied');
  }
  const student = await Student.findById(req.session.user.id);
  if (!student) return res.status(404).send('Student not found');
  req.user = student;
  next();
};

router.get('/profile', authenticateStudent, (req, res) => {
  res.json(req.user);
});

router.get('/resources', authenticateStudent, async (req, res) => {
  try {
    const resources = await Resource.find();
    console.log('Fetched resources:', resources); // Log fetched resources
    res.json(resources);
  } catch (error) {
    console.error('Error fetching resources:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/resources/search', authenticateStudent, async (req, res) => {
  try {
    const { subject } = req.query;
    const query = subject ? { subject } : {};
    const resources = await Resource.find(query);
    console.log('Fetched resources:', resources); // Log fetched resources
    res.json(resources);
  } catch (error) {
    console.error('Error fetching resources:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/profile/update', authenticateStudent, async (req, res) => {
  try {
    console.log('Updating student profile:', req.body); // Log the received request body
    const { username, email, branch, year, collegeName, password } = req.body;
    const student = await Student.findById(req.user._id);
    if (!student) {
      console.error('Student not found for update:', req.user._id);
      return res.status(404).send('Student not found');
    }
    student.username = username;
    student.email = email;
    student.branch = branch;
    student.year = year;
    // student.collegeName = collegeName;
    if (password) {
      student.password = await bcrypt.hash(password, 10);
    }
    await student.save();
    console.log('Profile updated successfully'); // Log success message
    res.status(200).send('Profile updated');
  } catch (error) {
    console.error('Error updating student profile:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
