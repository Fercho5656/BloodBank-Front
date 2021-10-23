<template>
  <div class="container login-form bg-dark text-white">
      <i class="bi bi-person-circle"></i>
      <form>
          <label for="username">Nombre de Usuario</label>
          <input class="form-control" type="text" id="username">
          <label for="password">Contraseña</label>
          <input class="form-control" type="password" id="password">
      </form>
      <button class="btn btn-success mt-3">Iniciar Sesión</button>
  </div>
</template>

<script>
export default {
    name: 'Login'
}
</script>

<style scoped>
.login-form {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
}

.bi {
    font-size: 5rem;
}
</style>