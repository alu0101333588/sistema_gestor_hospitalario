const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Asegúrate de que la ruta es correcta

// Ruta de prueba para insertar y obtener usuarios
router.get('/test-db', async (req, res) => {
  try {
    // Crear un usuario de prueba
    const user = new User({
      name: 'Prueba Usuario',
      email: 'prueba@example.com',
      role: 'admin'
    });
    await user.save();

    // Obtener todos los usuarios
    const users = await User.find();
    res.status(200).json({
      message: 'Conexión exitosa con MongoDB',
      users: users
    });
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
    res.status(500).json({ message: 'Error al conectar a MongoDB', error: error });
  }
});

module.exports = router;
