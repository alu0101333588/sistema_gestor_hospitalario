const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

// Ejecucción: nodemon server.js

const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config();


// Sirve la carpeta public como estática para que el frontend pueda acceder a las imágenes
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));




// Define los orígenes permitidos
const allowedOrigins = [
  'https://joyful-sopapillas-cb1211.netlify.app', // Reemplaza con la URL de tu sitio en Netlify
  'http://localhost:8080',                    // Para desarrollo local
  'http://localhost:8081',
  'https://sistema-gestor-hospitalario.onrender.com'   
];

// Configura el middleware de CORS
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`Origen no permitido por CORS: ${origin}`));
    }
  }
}));


// Middleware para procesar JSON en el cuerpo de las solicitudes
app.use(express.json());

// Middleware para loggear todas las solicitudes
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} request to ${req.url}`);
  next();
});

// Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conectado a MongoDB Atlas'))
.catch((error) => console.error('Error al conectar a MongoDB Atlas:', error));

// Ruta principal de prueba
app.get('/', (req, res) => {
  res.send('Bienvenido al backend');
});

// Rutas de usuarios
const userRoutes = require('./routes/userRoutes');
const departamentoRoutes = require('./routes/departamentoRoutes'); // Nueva ruta


app.use('/api', userRoutes); // Usa las rutas de usuario bajo el prefijo '/api'
app.use('/api', departamentoRoutes); // Ruta para departamentos

// Rutas de citas médicas
const medicoCitasRoutes = require('./routes/medicoCitas');
app.use('/api', medicoCitasRoutes); // Usa las rutas de citas bajo el prefijo '/api'

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
