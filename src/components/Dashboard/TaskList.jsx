import React, { useState } from 'react';
import { useTasks } from '../../context/TaskContext';
import { FaCheckCircle, FaRedo, FaTrashAlt, FaEdit } from 'react-icons/fa';
import TaskFilter from '../Dashboard/TaskFilter';
import Spinner from '../Common/Spinner';
import TaskModal from './TaskModal'; 

const TaskList = () => {
  const { tasks, deleteTask, toggleCompleted, setTaskForEdit, loading } = useTasks();
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); 


  const filteredTasks = tasks
    .filter((task) => {
      if (filter === 'completed') return task.completed;
      if (filter === 'pending') return !task.completed;
      return true;
    })
    .filter((task) => {
      return task.title.toLowerCase().includes(searchQuery.toLowerCase());
    })
    .sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.title.localeCompare(b.title); 
      } else {
        return b.title.localeCompare(a.title); 
      }
    });

  if (loading) return <Spinner />; 

  return (
    <div>
      <TaskFilter onFilterChange={setFilter} onSearchChange={setSearchQuery} onSortChange={setSortOrder} />

      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTasks.length === 0 ? (
          <div>No hay tareas disponibles.</div>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task._id}
              className={`bg-white p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 ${
                task.completed ? 'border-green-500 bg-green-100' : 'border-red-500 bg-red-100'
              }`}
            >
              <h5 className="mb-2 text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">
                {task.title}
              </h5>
              <p className="mb-4 text-sm sm:text-base text-gray-500">{task.description}</p>
              <p className={`font-semibold ${task.completed ? 'text-green-800' : 'text-red-600'}`}>
                {task.completed ? 'Completada' : 'Pendiente'}
              </p>
              <p className="text-xs sm:text-sm text-gray-400">
                Creada el: {new Date(task.createdAt).toLocaleDateString()}
              </p>

              <div className="flex justify-center gap-4 mt-4">
                <button
                  onClick={() => toggleCompleted(task._id)}
                  className="inline-flex items-center justify-center rounded-lg bg-green-500 p-2 text-white hover:bg-green-400 transition duration-300"
                >
                  {task.completed ? <FaRedo /> : <FaCheckCircle />}
                </button>

                <button
                  onClick={() => setTaskForEdit(task)} 
                  className="inline-flex items-center justify-center rounded-lg bg-blue-500 p-2 text-white hover:bg-blue-400 transition duration-300"
                >
                  <FaEdit />
                </button>

                <button
                  onClick={() => deleteTask(task._id)}
                  className="inline-flex items-center justify-center rounded-lg bg-red-500 p-2 text-white hover:bg-red-400 transition duration-300"
                >
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      
      <TaskModal />
    </div>
  );
};

export default TaskList;
