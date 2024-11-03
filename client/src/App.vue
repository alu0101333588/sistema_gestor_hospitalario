<template>
  <div id="app">
    <HeaderComponent />
    <HeroComponent />
    <ServicesComponent />
    <InsurersComponent />
    <PersonalHealthComponent />
    <FooterComponent />
  </div>
</template>

<script>
import "@/assets/styles.css";
import HeaderComponent from "./components/HeaderComponent.vue";
import HeroComponent from "./components/HeroComponent.vue";
import ServicesComponent from "./components/ServicesComponent.vue";
import InsurersComponent from "./components/InsurersComponent.vue";
import PersonalHealthComponent from "./components/PersonalHealthComponent.vue";
import FooterComponent from "./components/FooterComponent.vue";



export default {
  name: 'App',
  components: {
    HeaderComponent,
    HeroComponent,
    ServicesComponent,
    InsurersComponent,
    PersonalHealthComponent,
    FooterComponent,
  }
}
</script>


