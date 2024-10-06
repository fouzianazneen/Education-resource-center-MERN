



import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const EducatorResources = () => {
  const [resources, setResources] = useState([]);
  const [file, setFile] = useState(null);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [semester, setSemester] = useState("");
  const [branch, setBranch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/educator/resources",
          { withCredentials: true }
        );
        setResources(response.data);
      } catch (error) {
        console.error("Error fetching resources:", error);
      }
    };
    fetchResources();
  }, []);

  // const handleFileChange = (e) => {
  //   setFile(e.target.files[0]);
  //   console.log("Selected file:", e.target.files[0]); // Add this log
  // };



  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    console.log("Selected file:", e.target.files[0]); // This should show the selected file
  };
  

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  //   formData.append("file", file);
  //   formData.append("subject", subject);
  //   formData.append("description", description);
  //   formData.append("semester", semester);
  //   formData.append("branch", branch);

  //   console.log("Submitting form data:", {
  //     file,
  //     subject,
  //     description,
  //     semester,
  //     branch,
  //   });

  //   try {
  //     const response = await axios.post(
  //       "http://localhost:3000/educator/upload",
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //         withCredentials: true,
  //       }
  //     );
  //     console.log("Upload response:", response.data);
  //     setResources([...resources, response.data]);
  //   } catch (error) {
  //     console.error("Resource upload error:", error);
  //     console.log("Error response:", error.response);
  //   }
  // };





  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("subject", subject);
    formData.append("description", description);
    formData.append("semester", semester);
    formData.append("branch", branch);
  
    try {
      const response = await axios.post(
        "http://localhost:3000/educator/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      setResources([...resources, response.data]);
  
      // Clear form fields
      setFile("");
      setSubject("");
      setDescription("");
      setSemester("");
      setBranch("");
    } catch (error) {
      console.error("Resource upload error:", error);
    }
  };
  

  const handleDownload = async (fileUrl) => {
    const fullUrl = `http://localhost:3000${fileUrl}`;
    try {
      window.open(fullUrl, "_blank");
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const handleView = (fileUrl) => {
    window.open(
      `http://localhost:3000${fileUrl}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/educator/resources/${id}`, {
        withCredentials: true,
      });
      setResources(resources.filter((resource) => resource._id !== id));
    } catch (error) {
      console.error("Error deleting resource:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-8 flex justify-center">
      <div className="max-w-4xl w-full bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Upload Resource</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            
            <input
              type="file"
              onChange={handleFileChange}
              required
              className="border border-gray-300 px-4 py-2 rounded-lg w-full"
            />
          </div>
          <label className="block mb-2 font-bold">Subject:</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Subject"
            required
            className="border border-gray-300 px-4 py-2 rounded-lg w-full"
          />
          <label className="block mb-2  font-bold">Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            required
            className="border border-gray-300 px-4 py-2 rounded-lg w-full"
          />
          <label className="block mb-2 font-bold">Semester:</label>
          <input
            type="text"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            placeholder="Semester"
            required
            className="border border-gray-300 px-4 py-2 rounded-lg w-full"
          />
          <label className="block mb-2 font-bold">Branch</label>
          <input
            type="text"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            placeholder="Branch"
            required
            className="border border-gray-300 px-4 py-2 rounded-lg w-full"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Upload
          </button>
        </form>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-center">Your Resources</h2>
        <ul className="space-y-4">
          {resources.map((resource) => (
            <li key={resource._id} className="border border-gray-300 p-4 rounded-lg">
              <span className="font-bold">Subject:</span> {resource.subject} <br />
              <span className="font-bold">Description:</span> {resource.description} <br />
              <span className="font-bold">Semester:</span> {resource.semester} <br />
               <span className="font-bold">Branch:</span> {resource.branch} <br />
              <button
                onClick={() => handleDownload(resource.fileUrl)}
                className="bg-violet-400 hover:bg-violet-700 text-gray-800 py-1 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                Download
              </button>
              <button
                onClick={() => handleView(resource.fileUrl)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-1 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 ml-2"
              >
                View
              </button>
              
              <Link
                to={`/educator/resources/${resource._id}/edit`}
                className="bg-yellow-500 text-white px-3 py-1 rounded-lg focus:outline-none focus:ring-2 ml-2 hover:bg-yellow-600 transition duration-300"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(resource._id)}
                className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 ml-2"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        <button
          onClick={() => navigate("/educator/profile")}
          className="bg-gray-700 hover:bg-gray-400 text-white py-2 px-4 rounded-lg mt-4 focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          Back to Profile
        </button>
      </div>
    </div>
  );
};

export default EducatorResources;

