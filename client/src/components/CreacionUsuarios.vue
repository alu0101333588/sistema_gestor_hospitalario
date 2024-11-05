<template>
  <div class="creacion-usuarios">
    <h2>Gestión de Usuarios</h2>

    <!-- Formulario para crear o modificar un usuario -->
    <form @submit.prevent="editarUsuarioId ? actualizarUsuario() : crearUsuario()">
      <label>
        Nombre:
        <input type="text" v-model="nuevoUsuario.name" required />
      </label>
      <label>
        Email:
        <input type="email" v-model="nuevoUsuario.email" required />
      </label>
      <label>
        Rol:
        <select v-model="nuevoUsuario.role" required>
          <option value="admin">Admin</option>
          <option value="medico">Médico</option>
          <option value="recepcionista">Recepcionista</option>
        </select>
      </label>

      <!-- Botón de Crear Usuario con color azul y letras blancas -->
      <v-btn
        class="ma-2 boton-crear"
        type="submit"
        v-if="!editarUsuarioId"
      >
        Crear Usuario
      </v-btn>

      <!-- Botón de Guardar Cambios con color verde -->
      <v-btn
        class="ma-2 boton-guardar"
        type="submit"
        v-if="editarUsuarioId"
      >
        <v-icon start icon="mdi-content-save"></v-icon>
        Guardar Cambios
      </v-btn>

      <!-- Botón de Cancelar con color gris -->
      <v-btn
        class="ma-2 boton-cancelar"
        type="button"
        @click="cancelarEdicion"
        v-if="editarUsuarioId"
      >
        <v-icon start icon="mdi-cancel"></v-icon>
        Cancelar
      </v-btn>
    </form>

    <!-- Lista de usuarios -->
    <h3>Lista de Usuarios</h3>
    <ul>
      <li v-for="usuario in usuarios" :key="usuario._id" class="user-item">
        <!-- Botones de Modificar y Eliminar a la izquierda -->
        <div class="user-actions">
          <v-btn
            class="boton-modificar ma-2"
            @click="cargarUsuario(usuario)"
          >
          <i class="bi bi-pencil-square"></i>
            
          </v-btn>


          <v-btn
            class="ma-2 boton-eliminar"
            @click="confirmarEliminacion(usuario._id, usuario.name)"
          >
          <i class="bi bi-trash"></i>
          </v-btn>
        </div>
        
        <!-- Datos del usuario alineados a la izquierda -->
        <span class="user-info">{{ usuario.name }} - {{ usuario.email }} - {{ usuario.role }}</span>
      </li>
    </ul>
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
        name: '',
        email: '',
        role: 'admin',
      },
      editarUsuarioId: null,
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
    async crearUsuario() {
      try {
        const response = await apiClient.post('/api/users', this.nuevoUsuario);
        this.usuarios.push(response.data);
        this.nuevoUsuario = { name: '', email: '', role: 'admin' };
      } catch (error) {
        console.error('Error al crear usuario:', error);
      }
    },
    confirmarEliminacion(id, nombre) {
      const confirmacion = window.confirm(`¿Realmente desea borrar el usuario ${nombre}?`);
      if (confirmacion) {
        this.eliminarUsuario(id);
      }
    },
    async eliminarUsuario(id) {
      try {
        await apiClient.delete(`/api/users/${id}`);
        this.usuarios = this.usuarios.filter(usuario => usuario._id !== id);
      } catch (error) {
        console.error('Error al eliminar usuario:', error);
      }
    },
    cargarUsuario(usuario) {
      this.nuevoUsuario = { ...usuario };
      this.editarUsuarioId = usuario._id;
    },
    async actualizarUsuario() {
      try {
        const response = await apiClient.put(`/api/users/${this.editarUsuarioId}`, this.nuevoUsuario);
        const index = this.usuarios.findIndex(usuario => usuario._id === this.editarUsuarioId);
        if (index !== -1) {
          this.usuarios.splice(index, 1, response.data);
        }
        this.cancelarEdicion();
      } catch (error) {
        console.error('Error al actualizar usuario:', error);
      }
    },
    cancelarEdicion() {
      this.nuevoUsuario = { name: '', email: '', role: 'admin' };
      this.editarUsuarioId = null;
    }
  },
  mounted() {
    this.obtenerUsuarios();
  }
};
</script>

<style scoped>
.creacion-usuarios {
  max-width: 700px;
  margin: auto;
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

label {
  margin-bottom: 10px;
}

/* Estilos para los botones */
.boton-crear {
  background-color: var(--primary-color) !important; /* Azul corporativo */
  color: white !important;
}

.boton-modificar {
  background-color: var(--warning-color) !important; /* Naranja oscuro */
  color: white !important;
}


.boton-eliminar {
  background-color: var(--error-color) !important; /* Rojo */
  color: white !important;
}

.boton-guardar {
  background-color: var(--success-color) !important; /* Verde */
  color: white !important;
}

.boton-cancelar {
  background-color: var(--color-gris) !important; /* Gris */
  color: black !important;
}

/* Estilos para alinear los elementos a la izquierda en la lista */
.user-item {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.user-actions {
  display: flex;
  gap: 10px;
  margin-right: 25px;
}

/* Alinea la información del usuario y botones a la izquierda */
.user-info {
  text-align: left;
}
</style>
