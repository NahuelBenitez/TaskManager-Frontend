import React, { useState } from "react";
import Modal from "../Common/Modal";
import { GrCompliance } from "react-icons/gr";
import { MdOutlinePendingActions } from "react-icons/md";
import { RiSortAlphabetAsc } from "react-icons/ri";
import { ImSortAlphaDesc } from "react-icons/im";
import { IoMdListBox } from "react-icons/io";


const TaskFilter = ({ onFilterChange, onSearchChange, onSortChange }) => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAscending, setIsAscending] = useState(true);

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    onFilterChange(filter);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    onSearchChange(e.target.value);
  };

  const toggleSortOrder = () => {
    const newOrder = isAscending ? "desc" : "asc";
    setIsAscending(!isAscending);
    onSortChange(newOrder); 
  };

  return (
    <div className="flex flex-col sm:flex-row justify-center items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
      
      <div className="flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto">
        <Modal />
        <button
          onClick={() => handleFilterChange("all")}
          className={`w-full sm:w-40 h-12 flex items-center justify-center space-x-2 px-4 py-2 rounded-lg text-white ${
            selectedFilter === "all" ? "bg-blue-500" : "bg-gray-500"
          } hover:bg-blue-400 transition-colors duration-200`}
        >
          <IoMdListBox className="text-lg" />
          <span>Todas</span> 
        </button>
        <button
          onClick={() => handleFilterChange("completed")}
          className={`w-full sm:w-40 h-12 flex items-center justify-center space-x-2 px-4 py-2 rounded-lg text-white ${
            selectedFilter === "completed" ? "bg-green-500" : "bg-gray-500"
          } hover:bg-green-400 transition-colors duration-200`}
        >
          <GrCompliance className="text-lg" />
          <span>Completadas</span>
        </button>

        <button
          onClick={() => handleFilterChange("pending")}
          className={`w-full sm:w-40 h-12 flex items-center justify-center space-x-2 px-4 py-2 rounded-lg text-white ${
            selectedFilter === "pending" ? "bg-yellow-500" : "bg-gray-500"
          } hover:bg-yellow-400 transition-colors duration-200`}
        >
          <MdOutlinePendingActions />
          <span>Pendientes</span>
        </button>
      </div>
      
      
      <div className="flex justify-center sm:justify-start w-full sm:w-auto">
      
        <button
          onClick={toggleSortOrder}
          className="w-full sm:w-auto h-12 px-2 py-2 mr-1 rounded-lg bg-purple-500 text-white hover:bg-purple-400 transition-colors duration-200"
        >
          {isAscending ? <RiSortAlphabetAsc /> : <ImSortAlphaDesc />      }
        </button>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Buscar tarea por Titulo..."
          className="w-full sm:w-56 h-12 p-2 border border-gray-400 rounded mt-4 sm:mt-0"
        />
      </div>
      
    </div>
  );
};

export default TaskFilter;
