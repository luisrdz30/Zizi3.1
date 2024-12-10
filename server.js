const express = require('express');
const cors = require('cors');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3001;

// Middleware para habilitar CORS
app.use(cors());

// Middleware para procesar datos JSON
app.use(bodyParser.json());

// Servir archivos estáticos

app.use(express.static('.')); // Servir archivos estáticos

// Ruta para manejar el registro de usuarios
app.post('/submit', (req, res) => {
    console.log('Solicitud recibida:', req.body); // <-- Verificar que se reciban los datos

    const { firstName, lastName, email, address, phone, gender, age, dob, username, password } = req.body;

    if (!firstName || !lastName || !email || !address || !phone || !gender || !age || !dob || !username || !password) {
        console.log('Faltan campos en la solicitud');
        return res.status(400).json({ success: false, message: 'Todos los campos son obligatorios.' });
    }

    const data = `Nombre: ${firstName} ${lastName}, Email: ${email}, Dirección: ${address}, Teléfono: ${phone}, Sexo: ${gender}, Edad: ${age}, Fecha de Nacimiento: ${dob}, Usuario: ${username}\n`;

    const filePath = path.join(__dirname, 'usuarios.txt');
    console.log('Guardando en:', filePath); // <-- Verificar la ruta completa del archivo

    fs.appendFile(filePath, data, (err) => {
        if (err) {
            console.error('Error al guardar el archivo:', err); // <-- Mostrar error específico
            return res.status(500).json({ success: false, message: 'No se pudo guardar el registro.' });
        }
        console.log('Registro guardado correctamente');
        res.status(200).json({ success: true, message: 'Registro guardado exitosamente.' });
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
