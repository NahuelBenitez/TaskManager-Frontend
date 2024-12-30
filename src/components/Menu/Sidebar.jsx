import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiChartPie, HiUser } from "react-icons/hi";
import { ImExit } from "react-icons/im";
import { FaBars } from "react-icons/fa"; 

const Sidebar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); 

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen); 
  };

  return (
    <div>

      <div className="bg-gray-800 text-white w-64 h-full min-h-screen p-5 fixed left-0 top-0 hidden lg:block">
        <div className="flex items-center justify-center space-x-2 mb-6">
          <h2 className="text-2xl font-semibold text-blue-500">Menu</h2>
        </div>

        <ul>
          <li className="mb-4 hover:bg-gray-900 p-4 rounded-md">
            <Link to="/tasks" className="flex items-center space-x-3 hover:text-indigo-500">
              <HiChartPie className="text-xl" />
              <span>Tareas</span>
            </Link>
          </li>
          <li className="mb-4 hover:bg-gray-900 p-4 rounded-md">
            <Link to="/profile" className="flex items-center space-x-3 hover:text-indigo-500">
              <HiUser className="text-xl" />
              <span>Perfil</span>
            </Link>
          </li>
        </ul>

        <div className="absolute bottom-6 left-0 w-full p-2">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-md"
          >
            <ImExit className="text-xl" />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </div>


      <div className="lg:hidden">
        <button
          onClick={toggleMenu}
          className="text-black p-4 bg-white fixed top-0 left-0 z-50">
          <FaBars />
        </button>

        
        <div
          className={`${
            isOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
          } bg-gray-800 text-white fixed top-0 left-0 w-full h-full z-40 transition-all duration-300 ease-in-out`}
        >
          <div className="flex items-center justify-center space-x-2 mb-6 p-6">
            <h2 className="text-2xl font-semibold text-blue-500">Menu</h2>
          </div>

          <ul>
            <li className="mb-4 hover:bg-gray-900 p-4 rounded-md">
              <Link to="/tasks" className="flex items-center space-x-3 hover:text-indigo-500">
                <HiChartPie className="text-xl" />
                <span>Tareas</span>
              </Link>
            </li>
            <li className="mb-4 hover:bg-gray-900 p-4 rounded-md">
              <a href="/profile" className="flex items-center space-x-3 hover:text-indigo-500">
                <HiUser className="text-xl" />
                <span>Perfil</span>
              </a>
            </li>
          </ul>

          <div className="absolute bottom-6 left-0 w-full p-2">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-md"
            >
              <ImExit className="text-xl" />
              <span>Cerrar sesión</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
