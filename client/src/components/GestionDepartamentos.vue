<template>
    <div class="contenedor-principal">
      <!-- Columna izquierda: Formulario de creación de departamentos -->
      <div class="columna-formulario">
        <h2>Gestión de Especialidades médicas</h2>
  
        <!-- Formulario para crear o editar un departamento -->
        <form @submit.prevent="editarDepartamentoId ? actualizarDepartamento() : crearDepartamento()">
          <img v-if="fotoPreview" :src="fotoPreview" alt="Previsualización de Foto de Perfil" class="foto-preview"/>

          <!-- Campo de Nombre -->
          <label>Nombre:
            <input type="text" v-model="nuevoDepartamento.nombre" required />
          </label>
  
          <!-- Campo de Operaciones -->
          <label>Operaciones:
            <select v-model="operacionTemp">
                <option disabled value="">Selecciona una operación</option>
                <option value="Consulta">Consulta</option>
                <option value="Intervención">Intervención</option>
            </select>
            <button @click.prevent="agregarOperacion" class="boton-agregar">Agregar</button>
            </label>
  
          <!-- Lista de Operaciones Añadidas -->
          <ul>
            <li v-for="(operacion, index) in nuevoDepartamento.operaciones" :key="index">
              {{ operacion }}
              <button @click.prevent="eliminarOperacion(index)" class="boton-eliminar-operacion">Eliminar</button>
            </li>
          </ul>
  
          <!-- Botones de acción para crear o actualizar el departamento -->
          <v-btn class="ma-2 boton-crear" type="submit" v-if="!editarDepartamentoId">
            Crear Departamento
          </v-btn>
          <v-btn class="ma-2 boton-guardar" type="button" v-if="editarDepartamentoId" @click="actualizarDepartamento">
            Guardar Cambios
          </v-btn>
          <v-btn class="ma-2 boton-cancelar" type="button" v-if="editarDepartamentoId" @click="cancelarEdicion">
            Cancelar
          </v-btn>
        </form>
      </div>
  
      <!-- Columna derecha: Lista de departamentos -->
      <div class="columna-lista">
        <h3>Lista de Especialidades</h3>
  
        <!-- Indicador de error y carga -->
        <v-alert
          v-if="errorServidor"
          type="error"
          class="alerta-error"
          prominent
          color="red lighten-3"
        >
          <span class="alert-text">Fallo de comunicación con el servidor</span>
        </v-alert>
  
        <div v-if="cargando && !errorServidor" class="text-center">
          <v-progress-circular
            :size="70"
            :width="7"
            color="#17195e"
            indeterminate
          ></v-progress-circular>
        </div>
  
        <div v-if="!cargando && !errorServidor && departamentos.length === 0" class="texto-centrado">
          <p>La lista está vacía</p>
        </div>
  

      



        <!-- Lista de departamentos -->
        <!-- Tabla de departamentos -->
  <table class="department-table">
    <thead>
      <tr>
        <th></th>
        <th>Nombre</th>
        <th>Operaciones</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="departamento in departamentos" :key="departamento._id">
        <td class="department-actions">
          <v-btn class="boton-modificar" @click="cargarDepartamento(departamento)">
            <i class="bi bi-pencil-square"></i>
          </v-btn>
          <v-btn class="boton-eliminar" @click="confirmarEliminacion(departamento._id, departamento.nombre)">
            <i class="bi bi-trash"></i>
          </v-btn>
        </td>
        <td>{{ departamento.nombre }}</td>
        <td>{{ departamento.operaciones.join(', ') }}</td> <!-- Muestra las operaciones separadas por comas -->
      </tr>
    </tbody>
  </table>

      </div>
    </div>
  </template>
  
  <script>
  import apiClient from '@/apiClient';
  
  export default {
    name: 'GestionDepartamentos',
  data() {
    return {
      departamentos: [],
      nuevoDepartamento: {
        nombre: '',
        operaciones: []
      },
      fotoPreview: require('@/assets/estados/departamento_defecto.png'),
      operacionTemp: '', // Operación temporal
      editarDepartamentoId: null,
      cargando: false,
      errorServidor: false,
    };
    },
    methods: {
      async obtenerDepartamentos() {
        this.cargando = true;
        this.errorServidor = false;
        try {
          const response = await apiClient.get('/api/departamentos');
          this.departamentos = response.data;
        } catch (error) {
          this.errorServidor = true;
        } finally {
          this.cargando = false;
        }
      },
      agregarOperacion() {
        if (this.operacionTemp && !this.nuevoDepartamento.operaciones.includes(this.operacionTemp)) {
            this.nuevoDepartamento.operaciones.push(this.operacionTemp);
        }
        this.operacionTemp = ''; // Limpia el campo después de agregar
      },
      eliminarOperacion(index) {
        this.nuevoDepartamento.operaciones.splice(index, 1);
      },
      async crearDepartamento() {
        try {
          await apiClient.post('/api/departamentos', this.nuevoDepartamento);
          this.obtenerDepartamentos();
          this.resetFormulario();
        } catch (error) {
          console.error('Error al crear departamento:', error);
        }
      },
      cargarDepartamento(departamento) {
        this.nuevoDepartamento = { ...departamento };
        this.editarDepartamentoId = departamento._id;
      },
      async actualizarDepartamento() {
        try {
          await apiClient.put(`/api/departamentos/${this.editarDepartamentoId}`, this.nuevoDepartamento);
          this.obtenerDepartamentos();
          this.resetFormulario();
        } catch (error) {
          console.error('Error al actualizar departamento:', error);
        }
      },
      async confirmarEliminacion(id) {
        const confirmacion = window.confirm('¿Está seguro de que desea eliminar este departamento?');
        if (confirmacion) {
          this.eliminarDepartamento(id);
        }
      },
      async eliminarDepartamento(id) {
        try {
          await apiClient.delete(`/api/departamentos/${id}`);
          this.obtenerDepartamentos();
        } catch (error) {
          console.error('Error al eliminar departamento:', error);
        }
      },
      cancelarEdicion() {
        this.resetFormulario();
      },
      resetFormulario() {
        this.nuevoDepartamento = { nombre: '', operaciones: [] };
        this.editarDepartamentoId = null;
        this.fotoPreview = require('@/assets/estados/departamento_defecto.png');
      },
      
    },
    mounted() {
        this.obtenerDepartamentos();
        this.intervalId = setInterval(() => {
            this.obtenerDepartamentos();
        }, 10000); // Cada 10 segundos
    },
    beforeDestroy() {
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
  
  /* Columna para el formulario de creación de departamentos */
  .columna-formulario {
    flex: 1;
    max-width: 40%; /* Controla el ancho de la columna del formulario */
  }
  
  /* Columna para la lista de departamentos */
  .columna-lista {
    flex: 2;
    max-width: 60%; /* Controla el ancho de la columna de la lista */
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
  
  .boton-agregar {
    background-color: var(--success-color) !important; /* Verde */
    color: white !important;
    padding: 5px 10px;
    margin-left: 10px;
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
    border-radius: 8px;
  }
  
  .user-item {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    padding: 8px;
    border-radius: 8px;
    background-color: var(--background-color);
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .user-actions {
    display: flex;
    gap: 10px;
    margin-left: auto;
  }
  
  /* Estilo para la alerta de error */
  .alerta-error {
    background-color: #f44336 !important;
    color: white !important;
  }
  
  .alert-text {
    margin-left: 20px;
  }
  
  .texto-centrado {
    text-align: center;
  }

  .foto-preview {
  width: 120px;
  height: 120px;
  border-radius: 20%;
  margin-top: 10px;
  object-fit: cover;
  margin-bottom: 30px;
  align-self: center;
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

.department-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.department-table th,
.department-table td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.department-table tr {
  margin: 0;
  padding: 0;
}

.department-table th {
  background-color: #f4f4f4;
  font-weight: bold;
}

.department-table td {
  vertical-align: middle;
}

.department-actions {
  display: flex;
  gap: 5px; /* Espacio entre botones */
  align-items: center;
  justify-content: flex-start;
}




</style>
  