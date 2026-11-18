# Black Ops II Zombies - Catálogo de Perks

## Descripción

Este proyecto consiste en una página web que muestra un catálogo de las ventajas (Perks) del modo Zombies de Call of Duty: Black Ops II.

Permite consultar información de cada ventaja, incluyendo su descripción, precio, categoría y método de obtención.

También cuenta con un buscador por nombre y un filtro por categoría.

## Tecnologías utilizadas

- HTML5: estructura de la página.
- CSS3: diseño y estilos.
- JavaScript: funcionamiento de los filtros y consulta de datos.
- Bootstrap 5.3.3: diseño adaptable.
- Node.js: funcionamiento del backend.
- Express: creación del servidor.
- MySQL: almacenamiento de los datos.
- MySQL2: conexión entre Node.js y MySQL.

## Estructura del proyecto

Proyecto_Consulta_MySQL/
│
├── backend/
│   ├── server.js
│   ├── datos.sql
│   ├── package.json
│   ├── package-lock.json
│   ├── .env.example
│   └── .gitignore
│
├── frontend/
│   ├── index.html
│   └── assets/
│       ├── img/
│       │   └── (imágenes de los perks)
│       ├── css/
│       │   └── style.css
│       └── js/
│           └── script.js
│
└── README.md

## Base de datos

La base de datos utilizada se llama `bo2_zombies` y contiene tres tablas:

- `perks`: almacena el nombre, descripción, precio y relaciones de cada ventaja.
- `categorias`: almacena las categorías de las ventajas.
- `obtenciones`: almacena los métodos de obtención de las ventajas.

Las tablas están relacionadas mediante claves foráneas.

## Instalación y ejecución

### 1. Preparar la base de datos

1. Abrir MySQL Workbench.
2. Ejecutar el archivo `backend/datos.sql`.
3. Comprobar que se haya creado la base de datos `bo2_zombies` con sus tablas y registros.

### 2. Configurar el backend

1. Abrir la carpeta `backend` en Visual Studio Code.
2. Crear o configurar el archivo `.env` con los siguientes datos:

PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=bo2_zombies
DB_USER=root
DB_PASSWORD=tu_contraseña
FRONTEND_URL=http://127.0.0.1:5500

**Importante:** Reemplazar `tu_contraseña` por la contraseña configurada para el usuario `root` de MySQL en el computador donde se ejecutará el proyecto. Esta contraseña puede ser diferente en cada equipo.

3. Abrir una terminal integrada.
4. Ejecutar el siguiente comando para instalar las dependencias:

npm install

### 3. Iniciar el backend

Desde la terminal ubicada en la carpeta `backend`, ejecutar:
npm run dev

El servidor funcionará en el puerto 3000.

Para comprobar su funcionamiento, abrir:

- http://localhost:3000/
- http://localhost:3000/api/perks

### 4. Abrir el frontend

1. Abrir la carpeta `frontend` en Visual Studio Code.
2. Abrir el archivo `index.html` utilizando la extensión Live Server.
3. La página mostrará los datos obtenidos desde la base de datos.

## Funcionalidades

- Consulta de los perks almacenados en MySQL.
- Visualización de descripciones y precios.
- Clasificación por categorías.
- Información sobre los métodos de obtención.
- Búsqueda de perks por nombre.
- Filtrado dinámico por categoría.
- Limpieza de filtros.

## Autor

Martin Pacheco

Proyecto académico desarrollado para practicar el uso de bases de datos, backend, frontend y manipulación del DOM.
