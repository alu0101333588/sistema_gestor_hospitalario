<template>
    <div class="saludo-container">
      <div class="saludo">
        <img :src="icono" alt="Saludo Icono" class="saludo-icono" />
        <span class="saludo-texto">{{ saludo }}, <strong>Usuario</strong></span>
      </div>
      <div class="reloj">
        <span>{{ horaActual }}</span>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SaludoUsuario',
    data() {
      return {
        saludo: '',
        icono: '',
        horaActual: ''
      };
    },
    methods: {
      actualizarSaludo() {
        const ahora = new Date();
        const horaCanarias = new Date(ahora.toLocaleString("en-US", { timeZone: "Atlantic/Canary" }));
        const hora = horaCanarias.getHours();

        if (hora >= 6 && hora < 12) {
          this.saludo = "Buenos días";
          this.icono = require('@/assets/icons/buenos_dias.png');
        } else if (hora >= 12 && hora < 20) {
          this.saludo = "Buenas tardes";
          this.icono = require('@/assets/icons/buenas_tardes.png');
        } else {
          this.saludo = "Buenas noches";
          this.icono = require('@/assets/icons/buenas_noches.png');
        }
      },
      actualizarHora() {
        const ahora = new Date();
        const horaCanarias = new Date(ahora.toLocaleString("en-US", { timeZone: "Atlantic/Canary" }));
        this.horaActual = horaCanarias.toLocaleTimeString('es-ES', { hour12: false });
      }
    },
    mounted() {
      this.actualizarSaludo();
      this.actualizarHora();
      setInterval(() => {
        this.actualizarHora();
      }, 1000); // Actualiza la hora cada segundo
    }
  };
  </script>
  
  <style scoped>
  .saludo-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    font-family: 'Outfit', sans-serif;
    color: #17195e; /* Azul oscuro */
  }
  
  .saludo {
    display: flex;
    align-items: center;
  }
  
  .saludo-icono {
    width: 100px;
    height: 100px;
    margin-right: 10px;
  }
  
  .saludo-texto {
    font-size: 54px;
  }
  
  .reloj {
    font-size: 24px;
    font-weight: bold;
    color: #17195e; /* Azul oscuro */
  }
  </style>
  