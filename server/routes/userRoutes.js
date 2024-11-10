const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario'); // Importa el modelo de usuario
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads'); // Directorio de destino de las imágenes
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Renombra el archivo
  }
});

const upload = multer({ storage });

// Ruta para obtener todos los usuarios
router.get('/usuarios', async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios', error });
  }
});

// Ruta para crear un usuario, incluyendo la carga de imagen
router.post('/usuarios', upload.single('foto'), async (req, res) => {
  try {
    const usuarioData = { ...req.body };
    if (req.file) {
      usuarioData.foto = `/uploads/${req.file.filename}`;
    }
    const usuario = new Usuario(usuarioData);
    await usuario.save();
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

// Ruta para actualizar un usuario, incluyendo la actualización de la imagen de perfil
router.put('/usuarios/:id', upload.single('foto'), async (req, res) => {
  try {
    const usuarioData = { ...req.body };

    // Si hay una nueva imagen, actualizamos la propiedad `foto` en el usuario
    if (req.file) {
      usuarioData.foto = `/uploads/${req.file.filename}`;
    }

    const usuario = await Usuario.findByIdAndUpdate(req.params.id, usuarioData, {
      new: true,
      runValidators: true
    });
    
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json(usuario);
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
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
