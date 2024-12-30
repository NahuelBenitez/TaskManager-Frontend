import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ErrorPage from './pages/ErrorPage';
import { TaskProvider } from './context/TaskContext';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <TaskProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/tasks" element={<DashboardPage />} />
          <Route path="/" element={<LoginPage />} /> 
          <Route path="/register" element={<RegisterPage />} /> 
          <Route path="*" element={<ErrorPage />} /> 
        </Routes>
        <ToastContainer />
      </Router>
    </TaskProvider>
  );
};

export default App;
