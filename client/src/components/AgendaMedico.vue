<template>
    <div class="contenedor-principal">
      <div class="columna-formulario agenda-medico">
        <h2>Punto de vista: Usuario Médico</h2>
  
        <!-- Verificación temporal de lista de médicos cargados -->
        <div>
          <h3>Lista de médicos cargados (verificación temporal):</h3>
          <ul>
            <li v-for="medico in medicos" :key="medico._id">{{ medico.nombreCompleto }}</li>
          </ul>
        </div>
  
        <!-- Selección de Médico -->
        <label for="medicoSelect">Seleccionar médico</label>
        <select id="medicoSelect" v-model="selectedMedico" @change="cargarCitasMedico" required>
          <option value="" disabled selected>Seleccione médico</option>
          <option v-for="medico in medicos" :key="medico._id" :value="medico._id">
            {{ medico.nombreCompleto }}
          </option>
        </select>
  
        <!-- Selector de fecha (solo fechas futuras) -->
        <label for="fechaSelect">Seleccionar fecha</label>
        <input type="date" id="fechaSelect" v-model="selectedDate" :min="new Date().toISOString().substr(0, 10)" @change="resetForm" />
  
        <!-- Tipo de Cita -->
        <label for="tipoCitaSelect">Tipo de Cita</label>
        <select id="tipoCitaSelect" v-model="tipoCita" @change="resetForm" required>
          <option value="" disabled selected>Seleccione tipo de cita</option>
          <option value="Consultas">Consultas</option>
          <option value="Intervención">Intervención</option>
        </select>
  
        <!-- Formulario de Consultas -->
        <div v-if="tipoCita === 'Consultas'">
          <label for="horaInicioConsulta">Hora Inicio</label>
          <input type="time" id="horaInicioConsulta" v-model="horaInicio" required />
  
          <label for="horaFinalConsulta">Hora Final</label>
          <input type="time" id="horaFinalConsulta" v-model="horaFinal" required />
  
          <label for="duracionConsulta">Duración de cada consulta (min)</label>
          <input type="number" id="duracionConsulta" v-model="duracionConsulta" required />
  
          <button class="boton-crear" @click="abrirDisponibilidad">Abrir disponibilidad</button>
        </div>
  
        <!-- Formulario de Intervención -->
        <div v-if="tipoCita === 'Intervención'">
          <label for="horaInicioIntervencion">Hora Inicio</label>
          <input type="time" id="horaInicioIntervencion" v-model="horaInicio" required />
  
          <label for="duracionIntervencion">Duración estimada (min)</label>
          <input type="number" id="duracionIntervencion" v-model="duracionIntervencion" required />
  
          <label for="descripcionIntervencion">Descripción</label>
          <input type="text" id="descripcionIntervencion" v-model="descripcion" />
  
          <label for="observacionesIntervencion">Observaciones y/o recomendaciones</label>
          <input type="text" id="observacionesIntervencion" v-model="observaciones" />
  
          <label for="pacienteSelect">Seleccionar paciente</label>
          <select id="pacienteSelect" v-model="selectedPaciente" required>
            <option value="" disabled selected>Seleccione paciente</option>
            <option v-for="paciente in pacientes" :key="paciente._id" :value="paciente._id">
              {{ paciente.nombreCompleto }}
            </option>
          </select>
  
          <button class="boton-guardar" @click="fijarIntervencion">Fijar intervención</button>
        </div>
      </div>
  
      <!-- Franjas Programadas -->
      <div class="columna-lista">
        <h3>Franjas programadas</h3>
        <div v-if="citas.length">
          <div v-for="cita in citas" :key="cita._id" class="franja-programada">
            <span>{{ formatDate(cita.fecha) }} - {{ cita.tipo }}</span>
            <span v-if="cita.tipo === 'Consultas'">{{ cita.horaInicio }} - {{ cita.horaFinal }}</span>
            <span v-else>{{ cita.horaInicio }} ({{ cita.duracion }} min)</span>
            <button class="boton-modificar" @click="editarCita(cita)">Editar</button>
            <button class="boton-eliminar" @click="eliminarCita(cita)">Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import apiClient from '@/apiClient';
  
  export default {
    data() {
      return {
        medicos: [],
        selectedMedico: null,
        selectedDate: null,
        tipoCita: '',
        horaInicio: '',
        horaFinal: '',
        duracionConsulta: 15,
        duracionIntervencion: 60,
        descripcion: '',
        observaciones: '',
        pacientes: [],
        selectedPaciente: null,
        citas: []
      };
    },
    methods: {
      async cargarMedicos() {
        try {
          const response = await apiClient.get('/api/usuarios/medicos');
          this.medicos = response.data.map(medico => ({
            ...medico,
            nombreCompleto: `${medico.nombre} ${medico.apellidos}`
          }));
          console.log('Médicos cargados:', this.medicos);
        } catch (error) {
          console.error('Error al cargar médicos:', error);
        }
      },
  
      async cargarPacientes() {
        try {
          const response = await apiClient.get('/api/usuarios?tipo=Paciente');
          this.pacientes = response.data.map(paciente => ({
            ...paciente,
            nombreCompleto: `${paciente.nombre} ${paciente.apellidos}`
          }));
        } catch (error) {
          console.error('Error al cargar pacientes:', error);
        }
      },
  
      async cargarCitasMedico() {
        if (this.selectedMedico) {
          try {
            const response = await apiClient.get(`/api/citas?medico=${this.selectedMedico}`);
            this.citas = response.data;
          } catch (error) {
            console.error('Error al cargar citas del médico:', error);
          }
        }
      },
  
      abrirDisponibilidad() {
        const payload = {
          medicoId: this.selectedMedico,
          fecha: this.selectedDate,
          tipo: 'Consultas',
          horaInicio: this.horaInicio,
          horaFinal: this.horaFinal,
          duracion: this.duracionConsulta
        };
        apiClient.post('/api/citas/abrir', payload).then(this.cargarCitasMedico);
      },
  
      fijarIntervencion() {
        const payload = {
          medicoId: this.selectedMedico,
          fecha: this.selectedDate,
          tipo: 'Intervencion',
          horaInicio: this.horaInicio,
          duracion: this.duracionIntervencion,
          descripcion: this.descripcion,
          observaciones: this.observaciones,
          pacienteId: this.selectedPaciente
        };
        apiClient.post('/api/citas/fijar', payload).then(this.cargarCitasMedico);
      },
  
      editarCita(cita) {
        console.log('Editar cita', cita);
      },
  
      eliminarCita(cita) {
        apiClient.delete(`/api/citas/${cita._id}`).then(this.cargarCitasMedico);
      },
  
      resetForm() {
        this.tipoCita = '';
        this.horaInicio = '';
        this.horaFinal = '';
        this.duracionConsulta = 15;
        this.duracionIntervencion = 60;
        this.descripcion = '';
        this.observaciones = '';
        this.selectedPaciente = null;
      },
  
      formatDate(date) {
        return new Date(date).toLocaleDateString();
      }
    },
  
    mounted() {
      this.cargarMedicos();
      this.cargarPacientes();
    }
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
  
  
  .filtro-tipo-usuario {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
  }
  
  .filtro-tipo-usuario label {
    margin-right: 10px;
    font-weight: bold;
  }
  
  .filtro-tipo-usuario select {
    padding: 5px;
    border-radius: 5px;
    border: 1px solid var(--color-gris);
  }
  
  </style>