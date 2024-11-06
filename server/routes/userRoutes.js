const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Importa el modelo de usuario

// Ruta para obtener todos los usuarios
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios', error });
  }
});

// Ruta para crear un usuario
router.post('/users', async (req, res) => {
  console.log("Solicitud de creación de usuario recibida.");
  console.log("Datos recibidos en req.body:", req.body);

  try {
    const user = new User(req.body); // `numeroUsuario` será asignado automáticamente
    await user.save();
    console.log("Usuario creado exitosamente:", user);
    res.status(201).json(user);
  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(400).json({ message: 'Error al crear usuario', error });
  }
});



// Ruta para eliminar un usuario
router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar usuario', error });
  }
});

// Ruta para actualizar un usuario
router.put('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar usuario', error });
  }
});


module.exports = router;
