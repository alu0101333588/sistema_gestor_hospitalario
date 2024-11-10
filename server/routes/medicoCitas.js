const express = require('express');
const router = express.Router();
const Cita = require('../models/Cita');
const Usuario = require('../models/Usuario');

// Ruta para abrir disponibilidad de consultas
router.post('/citas/abrir', async (req, res) => {
  try {
    const { medicoId, fecha, tipo, horaInicio, horaFinal, duracion } = req.body;

    // Verifica si hay conflictos en las franjas
    const conflicto = await Cita.findOne({
      medicoId,
      fecha,
      $or: [
        { horaInicio: { $lt: horaFinal, $gte: horaInicio } },
        { horaFinal: { $gt: horaInicio, $lte: horaFinal } }
      ]
    });

    if (conflicto) {
      return res.status(400).json({ message: 'El médico ya tiene citas en esta franja horaria.' });
    }

    // Calcula citas disponibles
    const citas = [];
    let horaActual = new Date(`${fecha}T${horaInicio}`);
    const horaFin = new Date(`${fecha}T${horaFinal}`);
    
    while (horaActual < horaFin) {
      citas.push({
        medicoId,
        fecha,
        tipo,
        horaInicio: horaActual.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        pacienteId: null
      });
      horaActual.setMinutes(horaActual.getMinutes() + duracion);
    }

    await Cita.insertMany(citas);
    res.status(201).json(citas);
  } catch (error) {
    res.status(500).json({ message: 'Error al abrir disponibilidad', error });
  }
});

// Ruta para fijar intervención
router.post('/citas/fijar', async (req, res) => {
  try {
    const { medicoId, fecha, horaInicio, duracion, descripcion, observaciones, pacienteId } = req.body;

    // Verifica conflictos con citas
    const conflicto = await Cita.findOne({
      medicoId,
      fecha,
      horaInicio: { $lt: new Date(`${fecha}T${horaInicio}`).setMinutes(new Date(horaInicio).getMinutes() + duracion) }
    });

    if (conflicto) {
      return res.status(400).json({ message: 'El médico ya tiene citas en esta franja horaria.' });
    }

    // Crea la intervención
    const intervencion = await Cita.create({
      medicoId,
      fecha,
      tipo: 'Intervencion',
      horaInicio,
      duracion,
      descripcion,
      observaciones,
      pacienteId
    });
    res.status(201).json(intervencion);
  } catch (error) {
    res.status(500).json({ message: 'Error al fijar intervención', error });
  }
});

// Rutas para editar y eliminar citas
router.delete('/citas/:id', async (req, res) => {
  try {
    await Cita.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Cita eliminada' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar cita', error });
  }
});

module.exports = router;
