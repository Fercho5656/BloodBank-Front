<template>
  <div class="actions">
    <h1 class="text-white">Historial de Donaciones</h1>
    <button class="btn btn-success btn-lg" @click="$emit('add-donation')">Añadir Donación</button>
  </div>
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
      <tr v-for="donation in donations" :key="donation.$id">
        <td>{{ donation.id }}</td>
        <td>{{ donation.date }}</td>
        <td>{{ donation.donor.fullName }}</td>
        <td>{{ donation.quantity }}</td>
        <td v-if="donation.bloodTest !== null">
          <button class="btn btn-info">Revisar Examen</button>
        </td>
        <td v-else><button class="btn btn-success">Anexar Examen</button></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "DonationHistory",
  props: {
    donations: {
      type: Array,
      required: true,
    },
  },
  emits: ["add-donation"],
  computed: {
    donationsList() {
      return this.donations;
    },
  },
};
</script>

<style scoped>
.actions {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 20px;
}
</style>