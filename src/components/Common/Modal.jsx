import React, { useState } from "react";
import TaskForm from "../Dashboard/TaskForm";
import { FaPlusCircle } from "react-icons/fa";

const Modal = ({ onTaskAdded }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <button
        onClick={handleOpen}
        className=" w-full sm:w-40 h-12 flex items-center -center space-x-2 px-6 py-2 bg-emerald-600 text-white font-semibold rounded-lg shadow-md hover:bg-emerald-800 transform transition-all"
      >
        <FaPlusCircle className="text-lg" />
        <span>Agregar Tarea</span>
      </button>

      {open && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 transition-opacity">
          <div
            className="bg-white rounded-lg shadow-lg w-96 p-6 transform transition-all"
            style={{
              animation: open
                ? "scaleUp 0.3s ease-in-out"
                : "scaleDown 0.3s ease-in-out",
            }}
          >
            <h2 className="text-2xl font-bold mb-4">Agregar una nueva tarea</h2>

            <TaskForm handleCloseModal={handleOpen} onTaskAdded={onTaskAdded} />
          </div>
        </div>
      )}

      <style>
        {`
          @keyframes scaleUp {
            0% { transform: scale(0.9) translateY(-50px); }
            100% { transform: scale(1) translateY(0); }
          }

          @keyframes scaleDown {
            0% { transform: scale(1) translateY(0); }
            100% { transform: scale(0.9) translateY(-50px); }
          }
        `}
      </style>
    </>
  );
};

export default Modal;
