<template>
  <h2 class="text-white">Peticiones Pendientes</h2>
  <table class="table table-dark table-hover">
    <thead>
      <tr>
        <th>#</th>
        <th>Fecha</th>
        <th>Hospital</th>
        <th>Grupo Sanguíneo</th>
        <th>Cantidad (mL)</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>12/10/2021</td>
        <td>Hospital San Fercho</td>
        <td>A+</td>
        <td>500mL</td>
        <td class="buttons">
          <button class="btn btn-success">Aceptar</button>
          <button class="btn btn-primary">Rechazar</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "PendientRequests",
  components: {},
};
</script>

<style scoped>
.buttons {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-evenly;
}
</style>