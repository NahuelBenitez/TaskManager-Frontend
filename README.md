
# React + Vite

  

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

  

Currently, two official plugins are available:

  

-  [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh

-  [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

  
  

# Coally Task Manager - Frontend

  

Este es el frontend para la aplicación "Coally Task Manager", una herramienta para la gestión de tareas. El proyecto está desarrollado con React y tiene una estructura organizada utilizando Tailwind CSS para el diseño, con funcionalidades de gestión de tareas como creación, edición, eliminación y filtrado de tareas.

  

## Tecnologías utilizadas

  

-  **React**: Librería para construir la interfaz de usuario.

-  **React Router DOM**: Gestión de rutas dentro de la aplicación.

-  **React Hook Form**: Para manejar formularios de manera eficiente.

-  **Zod**: Validación de esquemas de datos.

-  **@hookform/resolvers**: Resolver validaciones para react-hook-form utilizando Zod.

-  **react-toastify**: Para mostrar notificaciones.

-  **react-icons**: Íconos para la interfaz de usuario.

-  **Tailwind CSS**: Framework CSS para un diseño responsivo y personalizado.
  

## Estructura del proyecto
  

La estructura del proyecto dentro de la carpeta `src` es la siguiente:

  

### Detalle de carpetas

  

-  **`components/commons`**: Componentes reutilizables a lo largo de la aplicación.

-  **`components/Dashboard`**: Componentes relacionados con el panel de control (Dashboard) de las tareas.

-  **`components/Menu`**: Componente que contiene la navegación principal de la aplicación.

-  **`context/`**: Gestión del estado global de la aplicación, que contiene el contexto de las tareas.

-  **`pages/`**: Páginas principales de la aplicación, como el formulario de login y la vista de tareas.

  

## Instalación

  

**1. Clona el repositorio:**

  



git clone https://github.com/tu-usuario/coally-task-manager-frontend.git

Navega al directorio del proyecto:

cd coally-task-manager-frontend

**2. Instala las dependencias:**

  
npm install

**3. Ejecuta la aplicación:**

  

npm run dev

La aplicación se ejecutará en http://localhost:5173.

  

**Variables de entorno**

La aplicación usa variables de entorno para configurar la URL del backend. Asegúrate de tener el archivo .env en la raíz del proyecto con la siguiente configuración:



VITE_API_URL=http://localhost:5000/api

**Descripción de funcionalidades**

**Formulario de Login:** Los usuarios pueden iniciar sesión proporcionando su nombre de usuario y contraseña. El sistema utiliza JWT para la autenticación.

**Gestión de tareas:** Los usuarios pueden crear, leer, actualizar y eliminar tareas.

**Notificaciones:** Se usan notificaciones para informar al usuario de los cambios en las tareas (añadir, editar, eliminar).

**Formulario de registro:** Permite a los nuevos usuarios registrarse creando un nombre de usuario y contraseña.

**Rutas**

/login: Página de inicio de sesión.

/tasks: Página donde se gestionan las tareas (crear, editar, eliminar).

**Autenticación**

El sistema utiliza JWT (JSON Web Tokens) para la autenticación del usuario. Asegúrate de que el backend esté configurado para generar y validar estos tokens correctamente.

  

Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.

  

Este README contiene información sobre las tecnologías que estás usando, la estructura de tu proyecto, las rutas disponibles, y cómo instalar y ejecutar la aplicación. Puedes modificarlo según necesites para adaptarlo aún más a tu proyecto.

  
  
  
  
  
  