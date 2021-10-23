<template>
  <h1>Registrar Nueva Donación</h1>
  <form>
    <div class="mb-3">
      <label for="donationUser" class="form-label">Donador</label>
      <input
        type="text"
        class="form-control"
        id="donationUser"
        placeholder="Fernando Moreno"
      />
    </div>
    <div class="mb-3">
      <label for="donationQuantity" class="form-label">Cantidad (mL)</label>
      <input
        type="number"
        min="0"
        class="form-control"
        id="donationQuantity"
        placeholder="0 mL"
      />
    </div>
    <div class="mb-3">
      <button class="btn btn-success">Registrar Donación</button>
    </div>
  </form>
</template>

<script>
export default {
  name: "NewDonation",
};
</script>

<style>
</style>