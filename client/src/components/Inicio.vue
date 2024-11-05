<template>
    <div id="inicio">
      <!-- Header (Navegación y Logo) -->
      <header class="header">
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <!-- Logotipo -->
        <a class="navbar-brand" href="#">
          <img :src="require('@/assets/logo.png')" alt="Logo" class="logo">
        </a>
        
        <!-- Botón para colapsar menú en pantallas pequeñas -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        
        <!-- Menú de navegación -->
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Inicio</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Especialidades</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Equipo Médico</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Eventos</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Contacto</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
  
      <!-- Hero Section (Sección principal) -->
      <section class="hero">
        <h1>Especialistas en cuidarte</h1>
        <p>Cuidando tu salud con tecnología de vanguardia y atención personalizada</p>
        <div class="d-grid gap-2 d-md-block">
            <button class="btn btn-primary boton-principal" type="button">Portal del paciente</button>
        </div>
      </section>
  
      <!-- Services Section (Unidad de medicina interna y Urgencias) -->
      <section class="services">
        <div class="service">
          <h2>Unidad de medicina interna</h2>
          <p>Atención integral y especializada para el paciente, con prevención, diagnóstico y tratamiento de enfermedades crónicas y agudas.</p>
        </div>
        <div class="service">
          <h2>Servicio de Urgencias médicas 24/7</h2>
          <p>Atención inmediata y profesional disponible las 24 horas del día, los 365 días del año para resolver emergencias médicas.</p>
        </div>
      </section>
  
      <!-- Insurers Section (Aseguradoras) -->
      <section class="insurers">
        <h2>Trabajamos con las mejores aseguradoras</h2>
        <div class="image-container">
          <img :src="require('@/assets/aseguradoras/logo-adeslas.png')" alt="Adeslas" class="same-width-img">
          <img :src="require('@/assets/aseguradoras/logo-sanitas.png')" alt="Sanitas" class="same-width-img">
          <img :src="require('@/assets/aseguradoras/logo-dkv.svg')" alt="DKV" class="same-width-img">
          <img :src="require('@/assets/aseguradoras/logo-asisa.png')" alt="Asisa" class="same-width-img">
          <img :src="require('@/assets/aseguradoras/logo-mapfre.svg')" alt="Mapfre" class="same-width-img">
          <img :src="require('@/assets/aseguradoras/logo-caser.webp')" alt="Caser" class="same-width-img">
        </div>
      </section>
  
      <!-- Personal Health Section (Área personal de salud) -->
      <section class="personal-health">
        <h2>Área personal de salud</h2>
        <p>Accede a cualquier hora del día para cuidar tu salud. En el Portal del Paciente tienes tu espacio personal privado y seguro en el que puedes solicitar y gestionar tus citas o consultar tus informes clínicos.</p>
        <div class="d-grid gap-2 d-md-block">
            <button class="btn btn-primary" color="white" type="button" >Regístrate ahora</button>
        </div>
      
      </section>
  
      <!-- Footer (Pie de página) -->
      <footer class="footer">
        <p>Portal del paciente | Intranet | Contacto</p>
        <p>Hospital Rambla - Comprometidos en ofrecer atención sanitaria de primer nivel, con dedicación y calidad humana.</p>
      </footer>
    </div>
</template>
  
<script>
export default {
  name: "PaginaInicio",
};
</script>
  
  

<style scoped>
.image-container {
  display: flex;             /* Coloca las imágenes en fila */
  justify-content: center;    /* Centra las imágenes en el contenedor */
  align-items: center;        /* Alinea verticalmente en el centro si tienen alturas diferentes */
  gap: 20px;                  /* Espacio entre las imágenes */
  padding: 20px;              /* Añade un padding opcional para espacio interno en el contenedor */
  flex-wrap: wrap;            /* Permite que el contenido se ajuste en varias filas si es necesario */
  width: 100%;                /* Hace que el contenedor ocupe el ancho completo */
  box-sizing: border-box;     /* Asegura que el padding no aumente el ancho total */
}


.same-width-img {
  width: 100px;               /* Ajusta el ancho deseado para todas las imágenes */
  height: auto;               /* Mantiene la proporción de la imagen */
}

.boton {
  background-color: var(--primary-color) !important; 
  color: white !important;
}

.boton-white {
  background-color: white !important;
  color: var(--primary-color) !important;
}


</style>