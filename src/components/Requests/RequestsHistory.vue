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
      <tr v-for="(request, index) in requests" :key="request.$id">
        <td>{{ index + 1 }}</td>
        <td>{{ request.date }}</td>
        <td>{{ request.hospital.name }}</td>
        <td>{{ `${request.bloodGroup.bloodType}${request.bloodGroup.rh}` }}</td>
        <td>{{ request.quantity }} mL</td>
        <td v-if="request.status === 'Aceptada'">
          <span class="badge bg-success">Aceptada</span>
        </td>
        <td v-else>
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
    requests: Array,
  },
  computed: {
    requestsInfo() {
      return this.requests;
    },
  },
};
</script>

<style scoped>
span.badge {
  width: 100%;
  margin-right: 5px;
  font-size: 1rem;
}
</style>