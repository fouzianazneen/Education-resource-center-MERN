import React from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  return (
    // <Header/>

    <div className=" flex flex-col items-center justify-center h-screen mb-8 bg-gray-100 ">
     
      <h1 className="  text-4xl font-bold ">
       
        
        Welcome to Education Resource Center</h1>
      <div className="flex space-x-4 mt-6">
        <button
          className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
          onClick={() => navigate('/register?role=educator')}
        >
          Register as Educator
        </button>
        <button
          className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600"
          onClick={() => navigate('/register?role=student')}
        >
          Register as Student
        </button>
        </div>
      </div>
    // </div>
    // <Footer/>
  );
};

export default Index;
