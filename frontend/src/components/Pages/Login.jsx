


import React, { useState } from 'react';
import axios from '../../api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [formError, setFormError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (credentials.email.trim() === '' || credentials.password.trim() === '') {
      setFormError('Please fill in all fields.');
      alert('Please fill in all fields.');
      return;
    }

    try {
      const { data } = await axios.post('/login', credentials, { withCredentials:true} );
      alert('Login successful');

      // Check role from backend response and navigate accordingly
      if (data.role === 'educator') {
        navigate('/educator/profile');
      } else if (data.role === 'student') {
        navigate('/student/profile');
      } else {
        alert('Unknown role received'); // This should ideally not happen if roles are managed properly
      }
    } catch (error) {
      console.error(error);
      alert('Invalid email or password');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="w-1/3 p-4 border rounded">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <div className="mb-4">
          <label className="block mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            className="border px-2 py-1 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            className="border px-2 py-1 w-full"
          />
        </div>
        {/* {formError && <p className="text-red-500 text-sm mb-2">{formError}</p>} */}
        <button type="submit" className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;