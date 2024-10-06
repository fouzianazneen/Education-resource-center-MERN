import React, { useEffect, useState } from "react";
import axios from "../../api";
import { useNavigate } from "react-router-dom";

const StudentProfile = () => {
  const [profile, setProfile] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get("/student/profile");
        setProfile(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, []);

  const handleEditProfile = () => {
    navigate("/student/profile/update"); // Navigate to edit profile page
  };

  const handleManageResources = () => {
    navigate("/student/resources"); // Navigate to manage resources page
  };

  const handleLogout = async () => {
    try {
      await axios.post("/logout");
      navigate("/login"); // Redirect to login page after logout
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full md:w-1/2 lg:w-1/3">
        <h1 className="text-3xl font-bold mb-4 text-center">Student Profile</h1>
        <div className="mb-4 border-b pb-4">
          <div className="text-gray-700 mb-2">
            <span className="font-bold">Username:</span> {profile.username}
          </div>
          <div className="text-gray-700 mb-2">
            <span className="font-bold">Email:</span> {profile.email}
          </div>
          <div className="text-gray-700 mb-2">
            <span className="font-bold">Branch:</span> {profile.branch}
          </div>
          <div className="text-gray-700 mb-2">
            <span className="font-bold">Year:</span>
            {profile.year}
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <button
            onClick={handleEditProfile}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none mr-2"
          >
            Edit Profile
          </button>
          <button
            onClick={handleManageResources}
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded focus:outline-none mr-2"
          >
            Manage Resources
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded focus:outline-none"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
