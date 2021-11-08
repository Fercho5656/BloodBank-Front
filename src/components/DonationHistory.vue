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
      <!--       <tr>
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
 -->
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
  setup() {},
  computed: {
    donationsList() {
      return this.donations;
    },
  },
};
</script>

<style>
</style>