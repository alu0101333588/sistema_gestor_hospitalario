<template>
    <div class="error-container">
      <img :src="require('@/assets/estados/pagina_en_desarrollo.png')" alt="Error" class="error-image" />
      <h1>Página en desarrollo</h1>
      <p>Esta página está siendo desarrollada</p>
      <v-btn class="btn-inicio" @click="volverAlInicio">Volver al inicio</v-btn>
    </div>
  </template>
  
  <script>
  export default {
    name: 'PaginaEnDesarrollo',
    methods: {
      volverAlInicio() {
        this.$router.push({ name: 'Inicio' }); // Reemplaza 'Inicio' con el nombre de la ruta de inicio en tu app
      }
    }
  };
  </script>
  
  <style scoped>
  .error-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 80vh;
    text-align: center;
  }
  
  .error-image {
    max-width: 750px;
    margin-bottom: 20px;
  }
  
  .btn-inicio {
    background-color: var(--primary-color) !important; /* Azul corporativo */
    color: white !important;
    padding: 10px 20px;
    border-radius: 8px;
    font-weight: bold;
  }
  </style>
  