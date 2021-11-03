<template>
  <h2 class="text-white">Historial de Peticiones</h2>
  <table class="table table-dark table-hover">
    <thead>
      <tr>
        <th>#</th>
        <th>Fecha</th>
        <th>Hospital</th>
        <th>Grupo Sanguíneo</th>
        <th>Cantidad</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>5</td>
        <td>11/10/2021</td>
        <td>Hospital San Fercho</td>
        <td>AB+</td>
        <td>1500 mL</td>
        <td class="text-warning"><strong>Rechazada</strong></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "RequestsHistory",
};
</script>

<style>
</style>