<template>
  <h1>Historial de Donaciones</h1>
  <table class="table table-dark table-hover">
    <thead>
      <tr>
        <th>#</th>
        <th>Fecha</th>
        <th>Donador</th>
        <th>Cantidad (mL)</th>
        <th>Examen de Sangre</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>12/10/2021</td>
        <td>Fernando Moreno</td>
        <td>250 mL</td>
        <td><button class="btn btn-info">Revisar Examen</button></td>
      </tr>
      <tr>
        <td>2</td>
        <td>12/10/2021</td>
        <td>Fernando Moreno</td>
        <td>500 mL</td>
        <td><button class="btn btn-success">Anexar Examen</button></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "DonationHistory",
};
</script>

<style>
</style>