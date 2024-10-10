import React, { useEffect, useState } from "react";
import axios from "../../api";

const StudentResources = () => {
  const [resources, setResources] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const { data } = await axios.get("/student/resources");
        setResources(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchResources();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredResources = resources.filter((resource) =>
    resource.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDownload = async (fileUrl) => {
    const fullUrl = `https://education-resource-center-mern.onrender.com${fileUrl}`;
    try {
      window.open(fullUrl, "_blank");

      
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  return (
    <div className="p-4 my-4 flex flex-col justify-center">
      <h1 className="text-3xl font-bold mb-4 text-center">Student Resources</h1>

      {/* Search input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by subject..."
          className="p-2 border rounded w-full"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {/* Resources list */}
      {filteredResources.length > 0 ? (
        filteredResources.map((resource) => (
          <div key={resource._id} className="mb-4 p-4 border rounded shadow-md">
            <div className="font-bold mb-2 ">Subject: {resource.subject}</div>
            <div className="mb-2">
              <span className="font-bold">Description:</span>{" "}
              {resource.description}
            </div>
            <div className="mb-2">
              <span className="font-bold">Semester:</span> {resource.semester}
            </div>
            <div className="mb-2">
              <span className="font-bold">Branch:</span> {resource.branch}
            </div>
           
            <button className="flex flex-col justify-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded" onClick={() => handleDownload(resource.fileUrl)}>
              Download
            </button>
          </div>
        ))
      ) : (
        <p className="text-red-500 font-bold">No resources found.</p>
      )}

      {/* Back to profile button */}
      <div className="mt-4">
        <button
          onClick={() => window.history.back()}
          className= "flex flex-col justify-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Back to Profile
        </button>
      </div>
    </div>
  );
};

export default StudentResources;
