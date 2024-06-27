const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const Educator = require("../models/educator");
const Resource = require("../models/Resource");
const bcrypt = require("bcrypt");
const router = express.Router();

const authenticateEducator = async (req, res, next) => {
  console.log("Session user:", req.session.user); // Log session user to debug
  if (!req.session.user || req.session.user.role !== "educator") {
    console.error("Unauthorized access attempt:", req.session.user);
    return res.status(401).send("Access denied");
  }
  try {
    const educator = await Educator.findById(req.session.user.id);
    if (!educator) {
      console.error("Educator not found:", req.session.user.id);
      return res.status(404).send("Educator not found");
    }
    console.log("Educator details:", educator.username); // Example usage
    req.user = educator;
    next();
  } catch (error) {
    console.error("Error in authenticateEducator:", error);
    res.status(500).send("Internal Server Error");
  }
};





const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });







router.get("/profile", authenticateEducator, async (req, res) => {
  // res.json(req.user);
  try {
    // Fetch educator details based on user ID from session
    const educator = await Educator.findById(req.session.user.id);
    if (!educator) {
      return res.status(404).send("Educator not found");
    }
    console.log("Fetched educator profile:", educator); // Log the fetched educator profile
    // Return educator profile details
    res.status(200).json({
      username: educator.username,
      email: educator.email,
      collegeName: educator.collegeName,
      experience: educator.experience,
    });
  } catch (error) {
    console.error("Error fetching educator profile:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post(
  "/upload",
  authenticateEducator,
  upload.single("file"),
  async (req, res) => {
    try {
      console.log("Received file:", req.file);
      console.log("Received body:", req.body);
      if (!req.file) {
        return res.status(400).send("No file uploaded.");
      }
    
      console.log("Uploaded file:", req.file); // Log uploaded file details
      const fileUrl = `/uploads/${req.file.filename}`;
      const resource = new Resource({
        subject: req.body.subject,
        description: req.body.description,
        semester: req.body.semester,
        branch: req.body.branch,
        
        fileUrl: fileUrl,
        educator: req.user._id,
        uploader: req.user._id,
      });
      await resource.save();
      console.log("Resource saved:", resource); // Lo
      res.status(200).json(resource);
      // res.status(200).send('File uploaded successfully.');
    } catch (error) {
      console.error("Error uploading resource:", error);
      res.status(400).json({ error: error.message, stack: error.stack });
    }
  }
);

// Serve uploaded files
router.get("/downloads/:filename", authenticateEducator, (req, res) => {
  const file = req.params.filename;
  const filePath = path.join(__dirname, "..", "uploads", file);
  res.sendFile(filePath);
});

router.get("/resources", authenticateEducator, async (req, res) => {
  try {
    const resources = await Resource.find({ educator: req.user._id });
    console.log("Fetched resources:", resources); // Log fetched resources
    res.json(resources);
  } catch (error) {
    console.error("Error fetching resources:", error);
    res.status(500).send("Internal Server Error");
  }
});









router.get("/resources/:id/edit", authenticateEducator, async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      return res.status(404).send("Resource not found");
    }
    if (resource.educator.toString() !== req.user._id.toString()) {
      return res.status(403).send("You don't have permission to edit this resource");
    }
    res.json(resource);
  } catch (error) {
    console.error("Error fetching resource for edit:", error);
    res.status(500).send("Internal Server Error");
  }
});








router.put("/resources/:id", authenticateEducator, upload.single('file'), async (req, res) => {
  try {
    console.log("Received update request for resource:", req.params.id);
    console.log("Request body:", req.body);
    console.log("Uploaded file:", req.file);

    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      return res.status(404).send("Resource not found");
    }
    if (resource.educator.toString() !== req.user._id.toString()) {
      return res.status(403).send("You don't have permission to edit this resource");
    }

    // Update text fields
    resource.subject = req.body.subject;
    resource.description = req.body.description;
    resource.semester = req.body.semester;
    resource.branch = req.body.branch;

    // Handle file replacement
    if (req.file) {
      // Delete old file if it exists
      if (resource.fileUrl) {
        const oldFilePath = path.join(__dirname, '..', resource.fileUrl);
        fs.unlink(oldFilePath, (err) => {
          if (err) console.error('Error deleting old file:', err);
        });
      }

      // Set new file URL
      resource.fileUrl = '/uploads/' + req.file.filename;
    }

    await resource.save();
    console.log("Updated resource:", resource);
    res.json(resource);
  } catch (error) {
    console.error("Error updating resource:", error);
    res.status(400).json({ error: error.message, stack: error.stack });
  }
});








router.delete("/resources/:id", authenticateEducator, async (req, res) => {
  try {
    await Resource.findByIdAndDelete(req.params.id);
    console.log("Resource deleted successfully"); // Log successful resource deletion
    res.status(200).send("Resource deleted");
  } catch (error) {
    console.error("Error deleting resource:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/profile/update", authenticateEducator, async (req, res) => {
  try {
    console.log("Updating educator profile:", req.body); // Log the received request body
    const { username, email, collegeName, experience, password } = req.body;
    const educator = await Educator.findById(req.user._id);
    if (!educator) {
      console.error("Educator not found for update:", req.user._id);
      return res.status(404).send("Educator not found");
    }
    educator.username = username;
    educator.email = email;
    educator.collegeName = collegeName;
    educator.experience = experience;
    if (password) {
      educator.password = await bcrypt.hash(password, 10);
    }
    await educator.save();
    console.log("Profile updated successfully"); // Log success message
    res.status(200).send("Profile updated");
  } catch (error) {
    console.error("Error updating educator profile:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
