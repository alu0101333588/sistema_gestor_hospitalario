<template>
    <v-container>
      <!-- Header -->
      <v-row class="text-center my-5">
        <v-col cols="12">
          <h1 class="main-title">Especialistas en cuidarte</h1>
          <p class="subtitle">Cuidando tu salud con tecnología de vanguardia y atención personalizada</p>
          <v-btn color="primary" class="mt-4" @click="goToPortal">Portal del paciente</v-btn>
        </v-col>
      </v-row>
  
      <!-- Sección de Servicios -->
      <v-row class="my-5">
        <v-col cols="12" md="6">
          <v-card color="light-green lighten-5" class="pa-5">
            <v-img src="/images/medicina-interna.jpg" height="200px"></v-img>
            <h3 class="service-title">Unidad de medicina interna</h3>
            <p>Atención médica integral y especializada para la prevención, diagnóstico y tratamiento de enfermedades complejas.</p>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <v-card color="pink lighten-5" class="pa-5">
            <v-img src="/images/urgencias.jpg" height="200px"></v-img>
            <h3 class="service-title">Servicio de Urgencias médicas 24/7</h3>
            <p>Asistencia inmediata y profesional disponible las 24 horas, todos los días del año, para responder a emergencias médicas.</p>
          </v-card>
        </v-col>
      </v-row>
  
      <!-- Aseguradoras -->
      <v-row class="text-center my-5">
        <v-col cols="12">
          <h3>Trabajamos con las mejores aseguradoras</h3>
        </v-col>
        <v-col cols="12" md="2" v-for="aseguradora in aseguradoras" :key="aseguradora">
          <v-img :src="`/images/${aseguradora}.png`" height="50px" contain></v-img>
        </v-col>
      </v-row>
  
      <!-- Área personal de salud -->
      <v-row class="my-5">
        <v-col cols="12" class="text-center">
          <v-card color="blue lighten-5" class="pa-5 text-center">
            <h3>Área personal de salud</h3>
            <p>Accede a tu área de salud y gestiona tus informes clínicos sin esperas ni desplazamientos.</p>
            <v-btn color="primary" class="mt-4" @click="registerNow">Regístrate ahora</v-btn>
          </v-card>
        </v-col>
      </v-row>
  
      <!-- Footer -->
      <v-row class="text-center my-5">
        <v-col cols="12">
          <p class="footer-text">Somos un centro hospitalario comprometido en ofrecerte atención sanitaria de primer nivel, con dedicación y calidad humana.</p>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        aseguradoras: ["adeslas", "sanitas", "dkv", "asisa", "mapfre", "caser"],
      };
    },
    methods: {
      goToPortal() {
        // Redirige al portal del paciente
        window.location.href = "/portal";
      },
      registerNow() {
        // Redirige a la página de registro
        window.location.href = "/register";
      },
    },
  };
  </script>
  
  <style scoped>
  .main-title {
    font-size: 3rem;
    font-weight: 700;
  }
  
  .subtitle {
    font-size: 1.25rem;
    color: #666;
  }
  
  .service-title {
    font-size: 1.5rem;
    font-weight: bold;
  }
  
  .footer-text {
    font-size: 0.9rem;
    color: #666;
  }
  </style>
  