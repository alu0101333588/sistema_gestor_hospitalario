const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario'); // Importa el modelo de usuario

// Ruta para obtener todos los usuarios
router.get('/usuarios', async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios', error });
  }
});

// Ruta para crear un usuario
router.post('/usuarios', async (req, res) => {
  console.log("Solicitud de creación de usuario recibida.");
  console.log("Datos recibidos en req.body:", req.body);

  try {
    const usuario = new Usuario(req.body); // `numeroUsuario` será asignado automáticamente
    await usuario.save();
    console.log("Usuario creado exitosamente:", usuario);
    res.status(201).json(usuario);
  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(400).json({ message: 'Error al crear usuario', error });
  }
});



// Ruta para eliminar un usuario
router.delete('/usuarios/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar usuario', error });
  }
});

// Ruta para actualizar un usuario
router.put('/usuarios/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json(usuario);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar usuario', error });
  }
});

// Filtrar los usuarios Médicos
router.get('/usuarios/medicos', async (req, res) => {
  try {
    const medicos = await Usuario.find({ tipo: 'Médico' });
    res.status(200).json(medicos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener médicos', error });
  }
});



module.exports = router;
