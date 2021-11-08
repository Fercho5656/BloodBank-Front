<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary text-white mb-3">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">BloodBank</a>
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
            <a class="nav-link active" href="#">Inicio</a>
          </li>
          <li class="nav-item" v-if="isLogged">
            <a class="nav-link" href="#">Donarores</a>
          </li>
          <li class="nav-item" v-if="isLogged">
            <a class="nav-link" href="#">Donaciones</a>
          </li>
          <li class="nav-item" v-if="isLogged">
            <a class="nav-link" href="#">Solicitudes</a>
          </li>
          <li class="nav-item" v-if="isLogged">
            <a class="nav-link" href="#">Ver Inventario</a>
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
</style>