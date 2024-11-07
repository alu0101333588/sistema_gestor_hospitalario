// server/models/Cita.js
const mongoose = require('mongoose');

const citaSchema = new mongoose.Schema({
  medicoId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fecha: { type: Date, required: true },
  tipo: { type: String, enum: ['Consultas', 'Intervencion'], required: true },
  horaInicio: { type: String, required: true },
  horaFinal: { type: String }, // Solo para Consultas
  duracion: { type: Number }, // Duración en minutos
  descripcion: { type: String }, // Solo para Intervencion
  observaciones: { type: String }, // Solo para Intervencion
  pacienteId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }
});

module.exports = mongoose.model('Cita', citaSchema);
