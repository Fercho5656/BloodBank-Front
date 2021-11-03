<template>
  <h2 class="text-white">Historial de Peticiones</h2>
  <table class="table table-dark table-hover">
    <thead>
      <tr>
        <th>#</th>
        <th>Hospital</th>
        <th>Grupo Sanguíneo</th>
        <th>Cantidad</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      <!-- <tr>
        <td>5</td>
        <td>Hospital San Fercho</td>
        <td>AB+</td>
        <td>1500 mL</td>
        <td class="text-warning"><strong>Rechazada</strong></td>
      </tr> -->
      <tr v-for="request in requests" :key="request.$id">
        <td>{{ request.id }}</td>
        <td>{{ request.hospital.name }}</td>
        <td>{{ `${request.bloodGroup.bloodType}${request.bloodGroup.rh}` }}</td>
        <td>{{ request.quantity }} mL</td>
        <td v-if="request.status === 'Aceptada'">
          <span class="badge bg-success">Aceptada</span>
        </td>
        <td v-if="request.status === 'Rechazada'">
          <span class="badge bg-primary">Rechazada</span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "RequestsHistory",
  props: {
    requests: Array
  },
  computed: {
    requestsInfo() {
      return this.requests;
    }
  }

};
</script>

<style scoped>
  span.badge {
    width: 100%;
    margin-right: 5px;
    font-size: 1rem;
  }
</style>