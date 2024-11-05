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
      <button type="submit">{{ editarUsuarioId ? 'Guardar Cambios' : 'Crear Usuario' }}</button>
      <button v-if="editarUsuarioId" @click="cancelarEdicion" type="button">Cancelar</button>
    </form>

    <!-- Lista de usuarios -->
    <h3>Lista de Usuarios</h3>
    <ul>
      <li v-for="usuario in usuarios" :key="usuario._id">
        <button @click="confirmarEliminacion(usuario._id, usuario.name)">Eliminar</button>
        <button @click="cargarUsuario(usuario)">Modificar</button>
        {{ usuario.name }} - {{ usuario.email }} - {{ usuario.role }}
      </li>
    </ul>
  </div>
</template>

<script>
import apiClient from '@/apiClient'; // Importa apiClient en lugar de axios

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
      editarUsuarioId: null, // ID del usuario que se está editando
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
        this.usuarios.push(response.data); // Agrega el nuevo usuario a la lista
        this.nuevoUsuario = { name: '', email: '', role: 'admin' }; // Resetea el formulario
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
        this.usuarios = this.usuarios.filter(usuario => usuario._id !== id); // Elimina el usuario de la lista local
      } catch (error) {
        console.error('Error al eliminar usuario:', error);
      }
    },
    cargarUsuario(usuario) {
      // Cargar los datos del usuario en el formulario para editar
      this.nuevoUsuario = { ...usuario };
      this.editarUsuarioId = usuario._id; // Guarda el ID del usuario en edición
    },
    async actualizarUsuario() {
      try {
        const response = await apiClient.put(`/api/users/${this.editarUsuarioId}`, this.nuevoUsuario);
        // Actualizar el usuario en la lista local
        const index = this.usuarios.findIndex(usuario => usuario._id === this.editarUsuarioId);
        if (index !== -1) {
          this.usuarios.splice(index, 1, response.data);
        }
        this.cancelarEdicion(); // Limpiar el formulario
      } catch (error) {
        console.error('Error al actualizar usuario:', error);
      }
    },
    cancelarEdicion() {
      // Restablecer el formulario y la variable editarUsuarioId
      this.nuevoUsuario = { name: '', email: '', role: 'admin' };
      this.editarUsuarioId = null;
    }
  },
  mounted() {
    this.obtenerUsuarios();
  }
};
</script>
