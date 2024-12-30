import React from "react";
import axios from "axios";
import { useTasks } from "../../context/TaskContext";
import { useForm } from "react-hook-form"; 
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";


const taskSchema = z.object({
  title: z
    .string()
    .min(3, "El título es obligatorio y debe tener al menos 3 caracteres."),
  description: z
    .string()
    .min(5, "La descripción es obligatoria y debe tener al menos 5 caracteres."),
});

const TaskForm = ({ handleCloseModal, onTaskAdded, task = null }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: task || { title: "", description: "" }, 
  });

  const { addTask, updateTask } = useTasks();

  const onSubmit = async (data) => {
    const { title, description } = data;

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("No se ha encontrado un token de autenticación");
      return;
    }

    try {
      if (task) {
        
        const response = await axios.put(
          `http://localhost:5000/api/tasks/${task._id}`,
          { title, description },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        updateTask(response.data); 
        toast.success("Tarea actualizada con éxito!");
      } else {
        
        const response = await axios.post(
          "http://localhost:5000/api/tasks",
          { title, description },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        addTask(response.data); 
        if (onTaskAdded) {
          onTaskAdded(response.data);
        }
        toast.success("Tarea agregada con éxito!");
      }

      handleCloseModal(); 
    } catch (error) {
      console.error("Error al guardar la tarea:", error);
      toast.error("Hubo un error al guardar la tarea.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
      
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Título
        </label>
        <input
          type="text"
          placeholder="Título de la tarea"
          {...register("title")}
          className={`block w-full mt-2 p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
            errors.title ? "border-red-500" : ""
          }`}
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Descripción
        </label>
        <textarea
          placeholder="Descripción de la tarea"
          {...register("description")}
          className={`block w-full mt-2 p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
            errors.description ? "border-red-500" : ""
          }`}
        />
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
      </div>

      <div className="flex justify-center space-x-4">
        <button
          type="button"
          onClick={handleCloseModal}
          className="px-4 py-2 bg-red-400 text-white rounded-md hover:bg-red-500"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
        >
          {task ? "Actualizar Tarea" : "Agregar Tarea"}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
