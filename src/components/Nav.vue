<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary text-white mb-3">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand">BloodBank</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarColor01"
        aria-controls="navbarColor01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarColor01">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Inicio</router-link>
          </li>
          <li class="nav-item" v-if="isLogged">
            <router-link class="nav-link" to="/donations"
              >Donaciones</router-link
            >
          </li>
          <li class="nav-item" v-if="isLogged">
            <router-link class="nav-link" to="/donors">Donadores</router-link>
          </li>
          <li class="nav-item" v-if="isLogged">
            <router-link class="nav-link" to="/requests"
              >Solicitudes</router-link
            >
          </li>
          <li class="nav-item" v-if="isLogged">
            <router-link class="nav-link" to="/inventory"
              >Inventario</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { ref } from "vue";
export default {
  name: "Nav",
  setup() {
    const isLogged = ref(true);
    return {
      isLogged,
    };
  },
};
</script>
    
<style>
.navbar-brand {
  font-size: 1.5rem;
}
.bi {
  font-size: 2rem;
}
.navbar-nav .nav-link {
  font-size: 1.2rem;
}
</style>