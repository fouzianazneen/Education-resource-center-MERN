import React, { useState, useEffect } from "react";
import axios from "../../api";
import { useNavigate } from "react-router-dom";

const EditStudentProfile = () => {
  const [profile, setProfile] = useState({
    username: "",
    email: "",
    branch: "",
    year: "",
    collegeName: "",
    password: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("/student/profile");
        setProfile({
          username: response.data.username,
          email: response.data.email,
          branch: response.data.branch,
          // collegeName: response.data.collegeName,
          year: response.data.year,
          password: "",
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Updating ${name} to:`, value); // Logging the changes
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/student/profile/update", profile);
      alert("Profile updated successfully");
      console.log("Profile updated successfully");
      navigate("/student/profile"); // Navigate to profile page after successful update
    } catch (error) {
      console.error(error);
      alert("Error updating profile");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-8 flex justify-center">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-lg">
    {/* <div className="flex justify-center w-100"> */}
    <form onSubmit={handleSubmit} className="p-4">
      <h1 className="text-2xl font-bold mt-5  mb-4">Edit Student Profile</h1>
      <div className="mb-4">
        <label className="block mb-2">Username</label>
        <input
          type="text"
          name="username"
          value={profile.username}
          onChange={handleChange}
          className="border px-2 py-1 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Email</label>
        <input
          type="email"
          name="email"
          value={profile.email}
          onChange={handleChange}
          className="border px-2 py-1 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Branch</label>
        <input
          type="text"
          name="branch"
          value={profile.branch}
          onChange={handleChange}
          className="border px-2 py-1 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Year</label>
        <input
          type="text"
          name="year"
          value={profile.year}
          onChange={handleChange}
          className="border px-2 py-1 w-full"
        />
      </div>
      {/* <div className="mb-4">
        <label className="block mb-2">College Name</label>
        <input
          type="text"
          name="collegeName"
          value={profile.collegeName}
          onChange={handleChange}
          className="border px-2 py-1 w-full"
        />
      </div> */}
      <div className="mb-4">
        <label className="block mb-2">Password</label>
        <input
          type="password"
          name="password"
          value={profile.password}
          onChange={handleChange}
          className="border px-2 py-1 w-full"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        Update Profile
      </button>
    </form>
    </div>
    </div>
    
  );
};

export default EditStudentProfile;
