


import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './components/Pages/Index';
import Login from './components/Pages/Login';
import Register from './components/Pages/Register';
import EducatorProfile from './components/Educator/EducatorProfile';
import EditEducatorProfile from './components/Educator/EditEducatorProfile';
import EducatorResources from './components/Educator/EducatorResources';
import StudentProfile from './components/Student/StudentProfile';
import EditStudentProfile from './components/Student/EditStudentProfile';
import StudentResources from './components/Student/StudentResources';
import EditResourcePage from './components/Educator/EditResourcePage';
import './index.css';
import Header from './components/Head/Header';
import Footer from './components/Head/Footer';
import About from './components/Pages/About';

const App = () => {
  return (
    <Router>
      <div>
        <Header/>
        <main className='flex-1 overflow-y-auto my-4'>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/educator/profile" element={<EducatorProfile />} />
        <Route path="/educator/profile/update" element={<EditEducatorProfile />} />
        <Route path="/educator/upload" element={<EducatorResources />} />
        <Route path="/educator/resources" element={<EducatorResources />} />
        <Route path="/educator/resources/:id/edit" element={<EditResourcePage />} />
        <Route path="/student/profile" element={<StudentProfile />} />
        <Route path="/student/profile/update" element={<EditStudentProfile />} />
        <Route path="/student/resources" element={<StudentResources />} />
      </Routes>
      </main>
      <Footer/>
      </div>
    </Router>
  );
}

export default App;