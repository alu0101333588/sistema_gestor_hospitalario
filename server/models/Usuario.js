const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const userSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellidos: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  tipo: { type: String, required: true },
  departamento: { type: mongoose.Schema.Types.ObjectId, ref: 'Departamento' }, // Referencia al Departamento
  dni: { type: String },
  fechaNacimiento: { type: Date },
  genero: { type: String, enum: ['Masculino', 'Femenino'] },
  direccion: { type: String },
  telefono: { type: String },
  email: { type: String },
  fechaUltimoAcceso: { type: Date, default: null },
  estatus: { type: String, default: 'activo' },
});

// Aplica el plugin de autoincremento al esquema de usuario
userSchema.plugin(AutoIncrement, { inc_field: 'numeroUsuario' });

module.exports = mongoose.model('Usuario', userSchema);
