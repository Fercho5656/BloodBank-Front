<template>
  <h1>Registrar Nueva Donación</h1>
  <form @submit.prevent="send">
    <div class="mb-3">
      <label for="donor" class="form-label">Donante</label>
      <select class="form-control" id="donor" v-model="selectedDonor">
        <option disabled value="">Seleccione un donante</option>
        <option v-for="donor in donorsList" :value="donor.id" :key="donor.$id">
          {{ donor.fullName }}
        </option>
      </select>
    </div>
    <div class="mb-3">
      <label for="donationQuantity" class="form-label">Cantidad (mL)</label>
      <input
        type="number"
        min="0"
        class="form-control"
        id="donationQuantity"
        placeholder="0 mL"
        v-model="quantity"
      />
    </div>
    <div class="mb-3">
      <button class="btn btn-success">Registrar Donación</button>
    </div>
  </form>
</template>

<script>
import { ref } from "vue";
export default {
  name: "NewDonation",
  props: {
    donors: {
      type: Array,
      required: true,
    },
  },
  emits: ["send-donation"],
  setup(props, { emit }) {
    const selectedDonor = ref(0);
    const quantity = ref(0);

    const send = () => {
      const donation = {
        quantity: quantity.value,
        date: new Date(),
        donorId: selectedDonor.value,
        bloodTestId: null,
      };
      emit("send-donation", donation);
    };
    return {
      selectedDonor,
      send,
      quantity,
    };
  },
  computed: {
    donorsList() {
      return this.donors;
    },
  },
};
</script>

<style>
</style>