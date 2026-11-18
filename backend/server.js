/* Carga las variables de configuración del archivo .env. */
require("dotenv").config();

// Importación de las dependencias necesarias.
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

// Inicializa Express para crear el servidor.
const app = express();

// Define el puerto donde funcionará el servidor.
const PORT = process.env.PORT || 3000;

// Direcciones autorizadas para conectarse al backend.
const origenesPermitidos = [
    process.env.FRONTEND_URL,
    "http://127.0.0.1:5500",
    "http://localhost:5500",
    "http://127.0.0.1:5501",
    "http://localhost:5501"
].filter(Boolean);

// Configura CORS para permitir solicitudes desde el frontend.
app.use(cors({
    origin: function (origen, callback) {
        if (!origen || origenesPermitidos.includes(origen)) {
            return callback(null, true);
        }

        return callback(new Error("Origen no permitido por CORS"));
    }
}));

// Permite recibir y procesar información en formato JSON.
app.use(express.json());

// Crea un grupo de conexiones para reutilizar conexiones con MySQL.
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Ruta principal para comprobar que el backend está funcionando.
app.get("/", (req, res) => {
    res.send("Backend de consulta MySQL funcionando.");
});

// Ruta que obtiene los perks desde la base de datos.
app.get("/api/perks", async (req, res) => {
    try {
        // Consulta las tres tablas y relaciona sus datos.
        const consulta = `
            SELECT
                p.perk_id,
                p.nombre,
                p.descripcion,
                p.precio,
                p.imagen,
                c.nombre AS categoria,
                o.nombre AS obtencion
            FROM perks AS p
            INNER JOIN categorias AS c
                ON p.categoria_id = c.categoria_id
            INNER JOIN obtenciones AS o
                ON p.obtencion_id = o.obtencion_id
            ORDER BY p.perk_id;
        `;

        // Ejecuta la consulta y obtiene los resultados.
        const [filas] = await pool.query(consulta);

        // Envía los resultados al frontend en formato JSON.
        res.json(filas);

    } catch (error) {
        // Informa si ocurre un error al consultar MySQL.
        console.error("Error al consultar los perks:", error.message);

        res.status(500).json({
            mensaje: "Error al consultar la base de datos."
        });
    }
});

// Inicia el servidor y muestra el puerto en la terminal.
app.listen(PORT, () => {
    console.log("Servidor escuchando en el puerto " + PORT);
});