import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const TaskContext = createContext();

export const useTasks = () => {
  return useContext(TaskContext);
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [loading, setLoading] = useState(true);

  const apiUrl = "https://taskmanager-backend-ou5n.onrender.com/api"

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get(`${apiUrl}/tasks`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setTasks(response.data);
        } catch (error) {
          console.error('Error fetching tasks:', error);
        }
      }
      setLoading(false);
    };

    fetchTasks();
  }, [apiUrl]);

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const editTask = async (updatedData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `${apiUrl}/tasks/${taskToEdit._id}`,
        updatedData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setTasks(tasks.map((task) => (task._id === taskToEdit._id ? response.data : task)));
      setTaskToEdit(null);
    } catch (error) {
      console.error('Error editing task:', error);
    }
  };

  const setTaskForEdit = (task) => {
    setTaskToEdit(task);
  };

  const deleteTask = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${apiUrl}/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTasks(tasks.filter((task) => task._id !== id));
      toast.success('¡Tarea eliminada correctamente!');
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Ocurrió un error al eliminar la tarea.');
    }
  };

  const toggleCompleted = async (id) => {
    try {
      const task = tasks.find((task) => task._id === id);
      const updatedTask = { ...task, completed: !task.completed };

      const token = localStorage.getItem('token');
      await axios.put(
        `${apiUrl}/tasks/${id}`,
        updatedTask,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setTasks(
        tasks.map((task) =>
          task._id === id ? { ...task, completed: !task.completed } : task
        )
      );
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        taskToEdit,
        addTask,
        editTask,
        deleteTask,
        toggleCompleted,
        setTaskForEdit,
        loading,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
