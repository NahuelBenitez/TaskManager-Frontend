import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "../components/Menu/Menu";
import TaskList from "../components/Dashboard/TaskList";
import Modal from "../components/Common/Modal";
import { MdTask } from "react-icons/md";
import Sidebar from "../components/Menu/Sidebar";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex">
      
      <Sidebar />
      
      <div className="lg:ml-64 ml-0 w-full p-6 transition-all duration-300">
        <div className="flex items-center justify-center space-x-2 mb-6">
          <MdTask className="text-2xl text-blue-500" />
          <h2 className="text-2xl font-semibold">Task Manager</h2>
        </div>

      
        <TaskList />
      </div>
    </div>
  );
};

export default Dashboard;
