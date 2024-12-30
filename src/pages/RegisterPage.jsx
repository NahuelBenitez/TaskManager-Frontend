import React from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { MdTask } from "react-icons/md";

const registerSchema = z.object({
  username: z.string().min(3, "El nombre de usuario es obligatorio y debe tener al menos 3 caracteres."),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres."),
  confirmPassword: z.string().min(6, "La confirmación de la contraseña es obligatoria."),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

const RegisterPage = () => {
  const navigate = useNavigate();

  // Configuración de react-hook-form con zodResolver
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema),
  });

  // Función para manejar el registro
  const handleRegister = async (data) => {
    try {
      // Enviar los datos al backend para crear el usuario
      const response = await axios.post('http://localhost:5000/api/auth/register', data);
      alert(response.data.message); // Mostrar el mensaje de éxito
      navigate('/login'); // Redirigir al login después del registro
    } catch (err) {
      console.error(err);
      alert('Error al registrar el usuario');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div>
            <div className="flex items-center justify-center space-x-2 mb-6">
              <MdTask className="text-2xl text-blue-500" />
              <h2 className="text-2xl font-semibold">Coally Task Manager</h2>
            </div>
          </div>
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">
              Crear una cuenta
            </h1>

            {errors.username && <p className="text-red-500 mt-2">{errors.username.message}</p>}
            {errors.password && <p className="text-red-500 mt-2">{errors.password.message}</p>}
            {errors.confirmPassword && <p className="text-red-500 mt-2">{errors.confirmPassword.message}</p>}

            <div className="w-full flex-1 mt-8">
              <div className="mx-auto max-w-xs">
                <form onSubmit={handleSubmit(handleRegister)}>
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="text"
                    placeholder="Nombre de usuario"
                    {...register('username')}
                  />

                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    type="password"
                    placeholder="Contraseña"
                    {...register('password')}
                  />

                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    type="password"
                    placeholder="Confirmar contraseña"
                    {...register('confirmPassword')}
                  />

                  <button
                    type="submit"
                    className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  >
                    <span className="ml-3">
                      Registrarse
                    </span>
                  </button>
                </form>

                <p className="mt-6 text-xs text-gray-600 text-center">
                  Al registrarte, aceptas los
                  <a href="/privacy" className="border-b border-gray-500 border-dotted">
                    Términos de Servicio
                  </a>
                  y la
                  <a href="/privacy" className="border-b border-gray-500 border-dotted ml-1">
                    Política de Privacidad
                  </a>
                </p>
              </div>
              <p className="mt-10 text-center text-sm text-gray-500">
                ¿Ya tienes cuenta?
                <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">Inicia sesión ahora</Link>
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
          <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: "url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')" }}></div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
