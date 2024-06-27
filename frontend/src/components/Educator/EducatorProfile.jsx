

import React, { useEffect, useState } from "react";
import axios from "../../api";
import { useNavigate } from "react-router-dom";

const EducatorProfile = () => {
  const [profile, setProfile] = useState({
    username: "",
    email: "",
    collegeName: "",
    experience: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("/educator/profile");
        console.log("Profile fetch response:", response.data);
        const { username, email, collegeName, experience } = response.data;
        setProfile({ username, email, collegeName, experience });
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("/logout");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleEditProfile = () => {
    navigate("/educator/profile/update");
  };

  const handleUploadResource = () => {
    navigate("/educator/upload");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="max-w-2xl w-full p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
        <h2 className="text-2xl font-bold mb-4 flex justify-center">Educator Profile</h2>
        <div className="mb-4  justify-center">
          <p className="mb-2 text-center">
            <span className="font-bold justify-center">Username:</span> {profile.username}
          </p>
          <p className="mb-2 text-center">
            <span className="font-bold ">Email:</span> {profile.email}
          </p>
          <p className="mb-2 text-center">
            <span className="font-bold">College Name:</span> {profile.collegeName}
          </p>
          <p className="mb-2  text-center">
            <span className="font-bold ">Experience:</span> {profile.experience}
          </p>
        </div>

        <div className="flex justify-center gap-4">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={handleEditProfile}
          >
            Edit Profile
          </button>
          <button
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            onClick={handleUploadResource}
          >
            Upload Resource
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-400"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default EducatorProfile;
