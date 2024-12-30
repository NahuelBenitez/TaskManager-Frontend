import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTasks } from '../../context/TaskContext';
import { FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';

const TaskModal = () => {
  const { taskToEdit, editTask, setTaskForEdit } = useTasks();
  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm();
  const [open, setOpen] = useState(false); 

  
  useEffect(() => {
    if (taskToEdit) {
      setOpen(true);
      setValue('title', taskToEdit.title);
      setValue('description', taskToEdit.description);
      setValue('completed', taskToEdit.completed);
    }
  }, [taskToEdit, setValue]);

  const onSubmit = (data) => {
    editTask(data); 
    toast.success('¡Tarea modificada con éxito!'); 
    setOpen(false); 
    setTaskForEdit(null);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setTaskForEdit(null);
  };

  if (!taskToEdit) return null; 

  return (
    <>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 transition-opacity">
          <div
            className="bg-white rounded-lg shadow-lg w-96 p-6 transform transition-all"
            style={{
              animation: open ? "scaleUp 0.3s ease-in-out" : "scaleDown 0.3s ease-in-out",
            }}
          >
            <h2 className="text-2xl font-bold mb-4">Editar tarea</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Título</label>
                <input
                  {...register('title', { required: 'El título es obligatorio' })}
                  className="w-full p-2 border rounded-md"
                  defaultValue={taskToEdit.title}
                />
                {errors.title && <p className="text-red-500 text-xs">{errors.title.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Descripción</label>
                <textarea
                  {...register('description')}
                  className="w-full p-2 border rounded-md"
                  defaultValue={taskToEdit.description}
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  {...register('completed')}
                  className="mr-2"
                  defaultChecked={taskToEdit.completed}
                />
                <span className="text-sm">Completada</span>
              </div>

              <div className="flex justify-end gap-4 mt-4">
                <button
                  type="button"
                  onClick={handleCloseModal} 
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-800"
                >
                  Guardar cambios
                </button>
              </div>
            </form>
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

export default TaskModal;
