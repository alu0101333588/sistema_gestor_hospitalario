<template>
  <div id="app">
    <PaginaInicio />
  </div>
</template>

<script>
import "@/assets/styles.css";
import PaginaInicio from "./components/Inicio.vue";



export default {
  name: 'App',
  components: {
    PaginaInicio,
  }
}
</script>
