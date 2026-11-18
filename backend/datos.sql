CREATE DATABASE IF NOT EXISTS bo2_zombies;
USE bo2_zombies;

-- Tabla de categorias de los perks
CREATE TABLE categorias (
    categoria_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(80) NOT NULL
);

-- Tabla de metodos de obtencion
CREATE TABLE obtenciones (
    obtencion_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(80) NOT NULL
);

-- Tabla principal de perks
CREATE TABLE perks (
    perk_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(120) NOT NULL,
    descripcion TEXT,
    precio INT NOT NULL,
    categoria_id INT NOT NULL,
    obtencion_id INT NOT NULL,

    CONSTRAINT fk_perk_categoria
    FOREIGN KEY (categoria_id)
    REFERENCES categorias(categoria_id),

    CONSTRAINT fk_perk_obtencion
    FOREIGN KEY (obtencion_id)
    REFERENCES obtenciones(obtencion_id)
);

-- Categorias
INSERT INTO categorias (nombre) VALUES
('Supervivencia'),
('Velocidad'),
('Combate'),
('Utilidad');

-- Metodos de obtencion
INSERT INTO obtenciones (nombre) VALUES
('Maquina propia'),
('Wunderfizz'),
('Ambas');
