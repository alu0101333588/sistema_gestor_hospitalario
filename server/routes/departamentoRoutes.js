const express = require('express');
const router = express.Router();
const Departmento = require('../models/Departamento'); // Importa el modelo de departamento

// Ruta para obtener todos los departamentos
router.get('/departamentos', async (req, res) => {
  try {
    const departamentos = await Departmento.find();
    res.status(200).json(departamentos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener departamentos', error });
  }
});

// Ruta para crear un departamento
router.post('/departamentos', async (req, res) => {
  try {
    const departamento = new Departmento({
      nombre: req.body.nombre,
      operaciones: req.body.operaciones
    });
    await departamento.save();
    res.status(201).json(departamento);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear departamento', error });
  }
});

// Ruta para actualizar un departamento
router.put('/departamentos/:id', async (req, res) => {
  try {
    const departamento = await Departmento.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!departamento) {
      return res.status(404).json({ message: 'Departamento no encontrado' });
    }
    res.status(200).json(departamento);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar departamento', error });
  }
});

// Ruta para eliminar un departamento
router.delete('/departamentos/:id', async (req, res) => {
  try {
    const departamento = await Departmento.findByIdAndDelete(req.params.id);
    if (!departamento) {
      return res.status(404).json({ message: 'Departamento no encontrado' });
    }
    res.status(200).json({ message: 'Departamento eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar departamento', error });
  }
});

module.exports = router;
