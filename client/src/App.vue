<template>
  <div id="app">
    <!-- Barra de navegación -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">Gestión Hospitalaria</a>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Inicio</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/usuarios">Usuarios</router-link>
          </li>
        </ul>
      </div>
    </nav>

    <!-- Contenedor para mostrar las rutas -->
    <router-view />
  </div>
</template>

<script>
import "@/assets/styles.css";
export default {
  name: 'App',
};
</script>
