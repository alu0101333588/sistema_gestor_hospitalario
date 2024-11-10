// eliminación.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// Configuración de conexión a MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/test'; // Ajusta esto si tienes otra URI

// Conecta a la base de datos MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Conectado a MongoDB');
  return eliminarColeccionUsuarios();
})
.catch((error) => {
  console.error('Error al conectar a MongoDB:', error);
});

// Función para eliminar la colección 'usuarios'
async function eliminarColeccionUsuarios() {
  try {
    await mongoose.connection.db.collection('usuarios').drop();
    console.log('Colección "usuarios" eliminada exitosamente');
  } catch (error) {
    if (error.code === 26) {
      console.log('La colección "usuarios" no existe');
    } else {
      console.error('Error al eliminar la colección "usuarios":', error);
    }
  } finally {
    mongoose.connection.close(); // Cierra la conexión a MongoDB
    console.log('Conexión a MongoDB cerrada');
  }
}
