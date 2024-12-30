import React from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { MdTask } from "react-icons/md";


const loginSchema = z.object({
  username: z.string().min(3, "El nombre de usuario es obligatorio y debe tener al menos 3 caracteres."),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres."),
});

const LoginPage = () => {
  const navigate = useNavigate();


  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = async (data) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', data);
      localStorage.setItem('token', response.data.token);
      navigate('/tasks');
    } catch (err) {
      console.error(err);
      alert('Usuario o contraseña incorrectos');
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
              Iniciar sesión
            </h1>

            {errors.username && <p className="text-red-500 mt-2">{errors.username.message}</p>}
            {errors.password && <p className="text-red-500 mt-2">{errors.password.message}</p>}

            <div className="w-full flex-1 mt-8">
              <div className="mx-auto max-w-xs">
                <form onSubmit={handleSubmit(handleLogin)}>
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

                  <button
                    type="submit"
                    className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  >
                    <span className="ml-3">
                      Iniciar sesión
                    </span>
                  </button>
                </form>

                <p className="mt-6 text-xs text-gray-600 text-center">
                  Al iniciar sesión, aceptas los
                  <Link to="/privacy" className="border-b border-gray-500 border-dotted">
                    Términos de Servicio
                  </Link>
                  y la
                  <Link to="/privacy" className="border-b border-gray-500 border-dotted ml-1">
                    Política de Privacidad
                  </Link>
                </p>
              </div>
              <p className="mt-10 text-center text-sm/6 text-gray-500">
                No tienes usuario?
                <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-500">Registrate ahora</Link>
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

export default LoginPage;
