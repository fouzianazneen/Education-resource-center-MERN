

import React, { useState, useEffect } from 'react';
import axios from '../../api'; // Assumes custom axios instance is configured in '../api'
import { useNavigate, useLocation, Link } from 'react-router-dom';

const Register = () =>  {
  const [credentials, setCredentials] = useState({
    username: '',
    email: '',
    password: '',
    role: '', // Role is dynamically set
    collegeName: '',
    experience: '',
    branch: '',
    year: ''
  });

  const navigate = useNavigate();
  const location = useLocation();

  // Extract role from URL query parameters
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const role = query.get('role');
    setCredentials((prev) => ({ ...prev, role }));
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
    setFormErrors((prev) => ({ ...prev, [name]: '' })); // Clear form errors on change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const baseUrl = 'http://localhost:3000';
      const endpoint = credentials.role === 'educator' ? '/register/educator' : '/register/student';
      await axios.post(`${baseUrl}${endpoint}`, credentials);
      alert('Registration successful');
      navigate('/login');
    } catch (error) {
      console.error(error);
      alert('Error registering user');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="w-1/3 p-4 border rounded">
        <h1 className="text-2xl font-bold mb-4 text-center">Register as {credentials.role.charAt(0).toUpperCase() + credentials.role.slice(1)}</h1>
        <div className="mb-4">
          <label className="block mb-2 font-bold">Username</label>
          <input
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            className="border px-2 py-1 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold">Email</label>
          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            className="border px-2 py-1 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold">Password</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            className="border px-2 py-1 w-full"
          />
        </div>
        {credentials.role === 'educator' && ( // Conditionally render fields for educators
          <>
            <div className="mb-4">
              <label className="block mb-2 font-bold">College Name</label>
              <input
                type="text"
                name="collegeName"
                value={credentials.collegeName}
                onChange={handleChange}
                className="border px-2 py-1 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-bold">Experience</label>
              <input
                type="text"
                name="experience"
                value={credentials.experience}
                onChange={handleChange}
                className="border px-2 py-1 w-full"
              />
            </div>
          </>
        )}
        {credentials.role === 'student' && ( // Conditionally render fields for students
          <>
            <div className="mb-4">
              <label className="block mb-2 font-bold">Branch</label>
              <input
                type="text"
                name="branch"
                value={credentials.branch}
                onChange={handleChange}
                className="border px-2 py-1 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-bold">Year</label>
              <input
                type="text"
                name="year"
                value={credentials.year}
                onChange={handleChange}
                className="border px-2 py-1 w-full"
              />
            </div>
          </>
        )}
        <button type="submit"  className="flex justify-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
          Register
        </button>
        <div className='font-bold my-3 text-center'>
          Already have an account? <Link to="/login" className="text-blue-500 text-center flex justify-center">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
