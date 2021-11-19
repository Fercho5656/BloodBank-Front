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
      <tr v-for="(request, index) in requests" :key="request.$id">
        <td>{{ index + 1 }}</td>
        <td>{{ request.date }}</td>
        <td>{{ request.hospital.name }}</td>
        <td>{{ `${request.bloodGroup.bloodType}${request.bloodGroup.rh}` }}</td>
        <td>{{ request.quantity }}</td>
        <td>
          <span
            tabindex="0"
            :data-bs-toggle="!request.enoughStock ? 'tooltip' : null"
            :data-bs-placement="!request.enoughStock ? 'top' : null"
            :title="!request.enoughStock ? 'No hay suficiente stock' : null"
          >
            <button
              :disabled="!request.enoughStock"
              class="btn btn-success"
              @click="
                $emit('accept-request', {
                  request: request,
                  status: 'Aceptada',
                })
              "
            >
              Aceptar
            </button>
          </span>
          <button
            class="btn btn-primary"
            @click="
              $emit('reject-request', { request: request, status: 'Rechazada' })
            "
          >
            Rechazar
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "PendingRequests",
  components: {},
  props: {
    requests: {
      type: Array,
      required: true,
    },
  },
  emits: ["accept-request", "reject-request"],
};
</script>

<style scoped>
.buttons {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
}
.btn {
  margin: 5px;
  flex: 1 0 25%;
}
</style>