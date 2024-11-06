<template>
  <div class="contenedor-principal">
    <!-- Columna izquierda: Formulario de creación de usuarios -->
    <div class="columna-formulario">
      <h2>Gestión de Usuarios</h2>

      <!-- Formulario para crear un usuario -->
      <form @submit.prevent="crearUsuario">
        <label>
          Nombre:
          <input type="text" v-model="nuevoUsuario.nombre" @input="generarUsername" required />
        </label>
        <label>
          Apellidos:
          <input type="text" v-model="nuevoUsuario.apellidos" @input="generarUsername" required />
        </label>
        <label>
          Contraseña:
          <input type="password" v-model="nuevoUsuario.password" required />
        </label>
        <label>
        Tipo:
        <select v-model="nuevoUsuario.tipo" @change="actualizarOpcionesDepartamento" required>
          <option value="" disabled selected>Seleccione tipo</option> <!-- Placeholder no seleccionable -->
        <option value="Administración">Administración</option>
        <option value="Paciente">Paciente</option>
          <option value="Médico">Médico</option>
          </select>
        </label>

        <!-- Campo de Departamento (solo se muestra si corresponde) -->
        <label v-if="departamentosDisponibles.length > 0">
          Departamento:
          <select v-model="nuevoUsuario.departamento" required>
            <option v-for="dep in departamentosDisponibles" :key="dep" :value="dep">{{ dep }}</option>
          </select>
        </label>

        <!-- Campos opcionales -->
        <label>
          DNI:
          <input type="text" v-model="nuevoUsuario.dni" />
        </label>
        <label>
          Fecha de Nacimiento:
          <input type="date" v-model="nuevoUsuario.fechaNacimiento" />
        </label>
        <label>
          Género:
          <select v-model="nuevoUsuario.genero" required>
          <option value="" disabled selected>Seleccione género</option> <!-- Placeholder no seleccionable -->
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
          </select>
        </label>
        <label>
          Dirección:
          <input type="text" v-model="nuevoUsuario.direccion" />
        </label>
        <label>
          Teléfono:
          <input type="text" v-model="nuevoUsuario.telefono" />
        </label>
        <label>
          Correo Electrónico:
          <input type="email" v-model="nuevoUsuario.email"/>
        </label>

        <!-- Botón de Crear Usuario (solo se muestra cuando no se está editando un usuario) -->
        <v-btn class="ma-2 boton-crear" type="submit" v-if="!editarUsuarioId">
          Crear Usuario
        </v-btn>

        <!-- Botón de Guardar Cambios (solo se muestra cuando se está editando un usuario) -->
        <v-btn class="ma-2 boton-guardar" type="button" v-if="editarUsuarioId" @click="actualizarUsuario">
          Guardar Cambios
        </v-btn>

        <!-- Botón de Cancelar (solo se muestra cuando se está editando un usuario) -->
        <v-btn class="ma-2 boton-cancelar" type="button" v-if="editarUsuarioId" @click="cancelarEdicion">
          Cancelar
        </v-btn>

      </form>
    </div>


    
    <!-- Columna derecha: Lista de usuarios -->
    <div class="columna-lista">
      <h3>Lista de Usuarios</h3>
      
      <ul>
        
        <!-- Cabecera de la lista de usuarios -->
<div class="user-list-header">
  <span class="user-column tipo"></span>
  <span class="user-column nombre">Nombre</span>
  <span class="user-column apellidos">Apellidos</span>
  <span class="user-column username">Nombre usuario</span>
  <span class="user-column tipo">Tipo de usuario</span>
</div>
  <li v-for="usuario in usuarios" :key="usuario._id" class="user-item">
    <!-- Botones de Modificar y Eliminar -->
    <div class="user-actions">
      <v-btn class="boton-modificar ma-2" @click="cargarUsuario(usuario)">
        <i class="bi bi-pencil-square"></i>
      </v-btn>
      <v-btn class="ma-2 boton-eliminar" @click="confirmarEliminacion(usuario._id, usuario.nombre)">
        <i class="bi bi-trash"></i>
      </v-btn>
    </div>
    
    <!-- Información del usuario organizada en columnas -->
    <div class="user-info">
      <span class="user-column nombre">{{ usuario.nombre }}</span>
      <span class="user-column apellidos">{{ usuario.apellidos }}</span>
      <span class="user-column username">{{ usuario.username }}</span>
      <span class="user-column tipo">{{ usuario.tipo }}</span>
    </div>
  </li>
</ul>
    </div>
  </div>
</template>

<script>
import apiClient from '@/apiClient';

export default {
  name: 'CreacionUsuarios',
  data() {
  return {
    usuarios: [],
    nuevoUsuario: {
      nombre: '',
      apellidos: '',
      username: '',
      password: '',
      tipo: '', // Deja el tipo vacío para que no tenga un valor predeterminado
      departamento: '',
      dni: '',
      fechaNacimiento: '',
      genero: '',
      direccion: '',
      telefono: '',
      email: '',
    },
    departamentosDisponibles: [],
  };
  },
  methods: {
    async obtenerUsuarios() {
      try {
        const response = await apiClient.get('/api/users');
        this.usuarios = response.data;
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      }
    },
    generarUsername() {
      if (this.nuevoUsuario.nombre && this.nuevoUsuario.apellidos) {
        const iniciales = this.nuevoUsuario.nombre.charAt(0).toLowerCase() + 
                          this.nuevoUsuario.apellidos.replace(/\s+/g, '').slice(0, 2).toLowerCase();
        const numeroAleatorio = Math.floor(1000 + Math.random() * 9000);
        this.nuevoUsuario.username = `${iniciales}${numeroAleatorio}`;
      }
    },
    actualizarOpcionesDepartamento() {
      if (this.nuevoUsuario.tipo === 'Médico') {
        this.departamentosDisponibles = ['Oncología', 'Pediatría', 'Medicina Interna', 'Cirugía General', 'Urgencias'];
      } else if (this.nuevoUsuario.tipo === 'Administración') {
        this.departamentosDisponibles = ['Call Center', 'Admisión'];
      } else {
        this.departamentosDisponibles = [];
        this.nuevoUsuario.departamento = '';
      }
    },
    async crearUsuario() {
      try {
        await apiClient.post('/api/users', this.nuevoUsuario);
        this.obtenerUsuarios();
        this.resetFormulario(); // Limpia el formulario tras la creación
      } catch (error) {
        console.error('Error al crear usuario:', error);
      }
    },
    resetFormulario() {
      this.nuevoUsuario = {
        nombre: '',
        apellidos: '',
        username: '',
        password: '',
        tipo: 'Administración',
        departamento: '',
        dni: '',
        fechaNacimiento: '',
        genero: '',
        direccion: '',
        telefono: '',
        email: '',
      };
    },
    // Método para cargar un usuario en el formulario para editarlo
    cargarUsuario(usuario) {
      this.nuevoUsuario = { ...usuario };
      this.editarUsuarioId = usuario._id;
    },
    // Método para confirmar y eliminar un usuario
    confirmarEliminacion(id, nombre) {
      const confirmacion = window.confirm(`¿Está seguro de que desea eliminar el usuario ${nombre}?`);
      if (confirmacion) {
        this.eliminarUsuario(id);
      }
    },
    // Método para realizar la eliminación del usuario
    async eliminarUsuario(id) {
      try {
        await apiClient.delete(`/api/users/${id}`);
        this.obtenerUsuarios(); // Actualiza la lista de usuarios tras la eliminación
      } catch (error) {
        console.error('Error al eliminar usuario:', error);
    }
  },
  // Método para actualizar un usuario existente
  async actualizarUsuario() {
    try {
      await apiClient.put(`/api/users/${this.editarUsuarioId}`, this.nuevoUsuario);
      this.obtenerUsuarios(); // Vuelve a cargar la lista de usuarios
      this.resetFormulario(); // Limpia el formulario
      this.editarUsuarioId = null; // Resetea el modo de edición
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
    }
  },

  // Método para cancelar la edición
  cancelarEdicion() {
    this.resetFormulario(); // Limpia el formulario
    this.editarUsuarioId = null; // Resetea el modo de edición
  },
  },
  mounted() {
    this.obtenerUsuarios(); // Llama a la función una vez al montar el componente

    // Establece un intervalo para actualizar la lista de usuarios cada 10 segundos
    this.intervalId = setInterval(() => {
      this.obtenerUsuarios();
    }, 10000); // 10000 ms = 10 segundos
  },
  beforeDestroy() {
    // Limpia el intervalo cuando el componente se destruye para evitar fugas de memoria
    clearInterval(this.intervalId);
  },
};
</script>


<style scoped>
/* Contenedor principal para organizar formulario y lista en columnas */
.contenedor-principal {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 20px;
}

/* Columna para el formulario de creación de usuarios */
.columna-formulario {
  flex: 1;
  max-width: 40%; /* Controla el ancho de la columna del formulario */
}

/* Columna para la lista de usuarios */
.columna-lista {
  flex: 2;
  max-width: 60%; /* Controla el ancho de la columna de la lista */
}

/* Estilos del formulario y su contenedor */
.creacion-usuarios {
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

label {
  margin-bottom: 10px;
  text-align: left; /* Alinea los labels a la izquierda para mejor legibilidad */
  font-weight: bold; /* Resalta los labels */
}

/* Botones estilizados */
.boton-crear {
  background-color: var(--primary-color) !important; /* Azul corporativo */
  color: white !important;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: bold;
}

.boton-modificar {
  background-color: var(--warning-color) !important; /* Naranja */
  color: white !important;
  width: 40px; /* Hace el botón cuadrado */
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.boton-eliminar {
  background-color: var(--error-color) !important; /* Rojo */
  color: white !important;
  width: 40px; /* Hace el botón cuadrado */
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.boton-guardar {
  background-color: var(--success-color) !important; /* Verde */
  color: white !important;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: bold;
}

.boton-cancelar {
  background-color: var(--color-gris) !important; /* Gris */
  color: black !important;
  padding: 10px 20px;
  border-radius: 8px
}

/* Estilos de la lista de usuarios */
.user-item {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  padding: 8px;
  border-radius: 8px;
  background-color: var(--background-color);
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Sombras suaves */
}

.user-actions {
  display: flex;
  gap: 10px;
  margin-right: 15px;
}

.user-info {
  display: flex;
  width: 100%;
}

.user-column {
  padding: 0 10px; /* Espacio entre columnas */
  flex: 1; /* Distribuye el espacio de manera uniforme */
  text-align: left;
}

/* Ajusta el ancho específico para cada columna según necesidad */
.user-column.nombre {
  flex: 2; /* Ocupa un poco más de espacio para nombres largos */
}

.user-column.apellidos {
  flex: 2;
}

.user-column.username {
  flex: 1;
}

.user-column.tipo {
  flex: 1;
}

/* Estilo para la cabecera de la lista de usuarios */
.user-list-header {
  display: flex;
  padding: 8px 0;
  font-weight: bold;
  color: var(--primary-color); /* Azul corporativo */
  border-bottom: 2px solid var(--color-gris); /* Línea separadora */
  margin-bottom: 10px;
}

.user-list-header .user-column {
  flex: 1;
  padding: 0 10px;
  text-align: left;
}

/* Ajusta el ancho específico para cada columna */
.user-list-header .user-column.nombre {
  flex: 2;
}

.user-list-header .user-column.apellidos {
  flex: 2;
}

.user-list-header .user-column.username {
  flex: 1;
}

.user-list-header .user-column.tipo {
  flex: 1;
}





/* Estilo para los campos de entrada de texto, email y el selector */
input[type="text"],
input[type="email"],
select {
  background-color: #C6DEFD; /* Color de fondo del campo */
  padding: 8px;
  border-radius: 5px;
  outline: none;
  font-family: 'Outfit', sans-serif; /* Asegura que la fuente sea uniforme */
}

/* Cambia el color del borde y añade un efecto cuando el campo está enfocado */
input[type="text"]:focus,
input[type="email"]:focus,
select:focus {
  border-color: var(--color-azul); /* Cambia el color del borde al hacer foco */
  box-shadow: 0 0 5px var(--color-azul); /* Añade sombra al hacer foco */
  background-color: #C6DEFD; /* Mantiene el color de fondo al hacer foco */
}


</style>
