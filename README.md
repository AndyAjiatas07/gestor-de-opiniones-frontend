gestor-de-opiniones-frontend
📘 OpinaNet API

API REST para la gestión de usuarios, publicaciones y comentarios.

📂Estructura inicial del Proyecto

Crea una carpeta (puede ser "OpinaNet").

Clona los repositorios dentro de ella:

Backend:

git clone https://github.com/AndyAjiatas07/gestor-de-opiniones-backend

Frontend:

git clone https://github.com/AndyAjiatas07/gestor-de-opiniones-frontend

La estructura final será:

OpinaNet/
├── gestor-de-opiniones-backend/
└── gestor-de-opiniones-frontend/

🖥️ Ejecución del proyecto (Backend + Frontend)

El proyecto está dividido en dos partes:

Backend → API REST (Node.js + Express + MongoDB)

Frontend → Aplicación React (Vite)

Ambos deben ejecutarse por separado.

0️⃣Crea un archivo .env en la raiz del proyecto de gestor-de-opiniones-backend con:

.env

PORT=3001
NODE_ENV=development
URL_MONGODB=mongodb://localhost:27017/OpinaNet
JWT_SECRET=supersecret_academico
JWT_EXPIRES=4h

1️⃣ Ejecutar Backend

Ubícate en la carpeta del servidor:

cd gestor-de-opiniones-backend

Instala dependencias:

npm install

Inicia el servidor:

npm run dev

Disponible en:

http://localhost:3001/OpinaNetAdmin/v1

2️⃣ Ejecutar Frontend

En otra terminal:

cd gestor-de-opiniones-frontend

Instala dependencias:

npm install

Ejecuta la aplicación:

npm run dev

Disponible en:

http://localhost:5173
🔄 ¿Qué implica ejecutar ambos?

El frontend consume la API del backend.

El backend debe estar activo para:

Autenticación

Crear publicaciones

Crear comentarios

Editar o eliminar contenido

Si el backend no está corriendo, el frontend mostrará errores 400, 404 o 500.

🛑 Requisitos previos

Node.js instalado

MongoDB activo (local o Atlas)

📦 Tecnologías

Node.js

Express

MongoDB

Mongoose

JWT Authentication

Express Validator

React (Frontend)

Vite

OpinaNet
Estructura de Rutas y Páginas

Este proyecto contiene las siguientes rutas principales y sus respectivas páginas:

1. Página Principal (Home)

Ruta: /

Componente: Home

Descripción: Muestra todas las publicaciones disponibles. Los usuarios pueden ver, eliminar, y editar las publicaciones que han creado.

2. Página de Inicio de Sesión (Login)

Ruta: /login

Componente: Login

Descripción: Página donde los usuarios pueden iniciar sesión proporcionando su correo electrónico/usuario y contraseña.

3. Página de Registro (Register)

Ruta: /register

Componente: Register

Descripción: Página donde los usuarios pueden crear una cuenta proporcionando nombre de usuario, correo y contraseña.

4. Página de Perfil (Profile)

Ruta: /profile

Componente: Profile

Descripción: Muestra la información del perfil del usuario. El usuario puede editar su perfil a través de un enlace a la página de edición.

5. Editar Perfil (EditProfilePage)

Ruta: /profile/edit

Componente: EditProfilePage

Descripción: Página donde el usuario puede actualizar su nombre de usuario, correo electrónico y contraseña.

6. Página de Detalles de la Publicación (PostDetail)

Ruta: /posts/:postId

Componente: PostDetail

Descripción: Muestra los detalles completos de una publicación, junto con los comentarios. Los usuarios pueden agregar comentarios, editar los suyos o eliminar los existentes.

7. Página de Mis Publicaciones (MyPosts)

Ruta: /my-posts

Componente: MyPosts

Descripción: Muestra las publicaciones que el usuario ha creado. El usuario puede eliminar o editar sus publicaciones desde esta página.

8. Crear/Editar Publicación (PostFormPage)

Ruta: /posts/edit/:postId (Para editar)
/posts/new (Para crear una nueva publicación)

Componente: PostFormPage

Descripción: Permite al usuario crear o editar una publicación. Si el postId está presente en la URL, se asume que se está editando una publicación existente.

9. Página de Mis Comentarios (MyComments)

Ruta: /my-comments

Componente: MyComments

Descripción: Muestra los comentarios que el usuario ha realizado en las publicaciones. El usuario puede eliminar o editar sus comentarios.

10. Página de Usuarios (Users)

Ruta: /users

Componente: Users

Descripción: Muestra una lista de todos los usuarios registrados. Cada usuario puede navegar a las publicaciones de un usuario específico.

11. Página de Publicaciones de un Usuario Específico (UserPosts)

Ruta: /users/:userId/posts

Componente: UserPosts

Descripción: Muestra las publicaciones de un usuario específico, basadas en el userId en la URL.

Menú de Navegación

El menú de navegación principal es una barra horizontal que se adapta al estado del usuario:

Si el usuario está autenticado:

Inicio: Enlace a la página principal /.

Mis publicaciones: Enlace a /my-posts.

Mis comentarios: Enlace a /my-comments.

Perfil: Enlace a /profile.

Cerrar sesión: Enlace para cerrar sesión (no detallado en el código pero se asume que está implementado).

Si el usuario no está autenticado:

Inicio: Enlace a la página principal /.

Iniciar sesión: Enlace a /login.

Registrarse: Enlace a /register.

Navegación Condicional

La navegación depende del estado de autenticación del usuario:

Usuario autenticado:
El menú de navegación muestra enlaces a "Mis publicaciones", "Mis comentarios" y "Perfil". Los usuarios pueden crear nuevas publicaciones o editar las existentes.

Usuario no autenticado:
El menú muestra solo los enlaces a "Inicio", "Iniciar sesión" y "Registrarse". Las rutas protegidas, como la creación y edición de publicaciones y comentarios, redirigen al usuario a la página de inicio de sesión si intentan acceder sin estar autenticados.

Subnavegación o Rutas Anidadas

Las rutas tienen anidaciones:

Publicaciones de un usuario específico:

Ruta /users/:userId/posts:
Muestra todas las publicaciones de un usuario específico. Al hacer clic en una publicación, se redirige al usuario a la página de detalles de la publicación (/posts/:postId).

Comentarios dentro de una publicación:

Ruta /posts/:postId:
Muestra los detalles de una publicación junto con sus comentarios. Los usuarios pueden agregar un comentario o editar/eliminar los existentes.

Redirección o Protección de Rutas

Rutas protegidas:
Las siguientes páginas requieren autenticación:

/profile/edit

/posts/new

/posts/edit/:postId

/comments/edit/:commentId

Redirección al no estar autenticado:
Si un usuario no autenticado intenta acceder a alguna de estas rutas protegidas, será redirigido automáticamente a la página de inicio de sesión (/login).

Navegación con Parámetros

Las rutas usan parámetros para identificar recursos específicos:

Publicaciones:
La ruta /posts/:postId usa el parámetro postId para cargar una publicación específica por su ID.

Comentarios:
La ruta /comments/edit/:commentId usa el parámetro commentId para cargar un comentario específico y permitir su edición.

Usuarios:
La ruta /users/:userId/posts usa el parámetro userId para cargar las publicaciones de un usuario específico.

Resumen de Componentes y Funcionalidad

Login/Registro:
Los usuarios pueden autenticarse o registrarse en la plataforma.

Crear/Editar Publicaciones:
Los usuarios pueden crear y editar publicaciones, añadiendo contenido y categoría.

Gestionar Comentarios:
Los usuarios pueden agregar, editar y eliminar comentarios en las publicaciones.

Ver y Editar Perfil:
Los usuarios pueden ver y actualizar su perfil, incluyendo nombre de usuario, correo electrónico y contraseña.

Ver Publicaciones de Otros Usuarios:
Los usuarios pueden ver las publicaciones de otros usuarios en el sistema.

👨‍💻 Autor

Proyecto académico desarrollado por Andy Ariel Ajiatas Xiquin - 2021496