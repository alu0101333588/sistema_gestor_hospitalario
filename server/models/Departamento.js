const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const departamentoSchema = new mongoose.Schema({
  codigo: { type: Number, unique: true },
  nombre: { type: String, required: true },
  operaciones: { type: [String], required: true }
});

// Aplica el plugin de autoincremento al campo `codigo`
departamentoSchema.plugin(AutoIncrement, { inc_field: 'codigo' });

module.exports = mongoose.model('Departamento', departamentoSchema);
