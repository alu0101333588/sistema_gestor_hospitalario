const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose); // Asegúrate de que esta línea esté así

const userSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellidos: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  tipo: { type: String, required: true },
  departamento: { type: String },
  dni: { type: String },
  fechaNacimiento: { type: Date },
  genero: { type: String, enum: ['Masculino', 'Femenino'] },
  direccion: { type: String },
  telefono: { type: String },
  email: { type: String, unique: true },
  fechaUltimoAcceso: { type: Date, default: null }
});

// Aplica el plugin de autoincremento al esquema de usuario
userSchema.plugin(AutoIncrement, { inc_field: 'numeroUsuario' });

module.exports = mongoose.model('User', userSchema);
