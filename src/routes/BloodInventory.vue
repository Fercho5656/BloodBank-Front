<template>

  <div class="container">
    <select v-model="selectedBloodBank" @change="getBloodGroups" class="form-control">
      <option value="0" selected disabled>Seleccione un banco</option>
      <option v-for="bloodBank in bloodBanks" :value="bloodBank.id" :key="bloodBank.id">
        {{ bloodBank.bankName }}
      </option>
    </select>
    <div class="row">
      <div
        class="col-md-3"
        v-for="{ id, bloodGroup, quantity } in bloodGroups"
        :key="id"
      >
        <BloodInfo
          :bloodgroup="`${bloodGroup.bloodType}${bloodGroup.rh}`"
          :quantity="quantity"
        />
      </div>
    </div>
  </div>
</template>

<script>
import BloodInfo from "../components/BloodInfo.vue";
import { getByBankId } from "../services/API/BloodGroups";
import {getAllBloodBanks} from '../services/API/BloodBanks'
import { onMounted, onUpdated, ref } from "vue";
export default {
  name: "BloodInventory",
  components: {
    BloodInfo,
  },
  setup() {
    const bloodGroups = ref([]);
    const bloodBanks = ref([]);
    const selectedBloodBank = ref(0);

    const getBloodGroups = async () => {
      const { $values } = await getByBankId(selectedBloodBank.value);
      return $values;
    };

    const getBloodBanks = async () => {
      const { $values } = await getAllBloodBanks();
      console.log($values);
      return $values;
    };

    onMounted(async () => {
      bloodGroups.value = await getBloodGroups();
      bloodBanks.value = await getBloodBanks();
    });

    onUpdated(async () => {
      bloodGroups.value = await getBloodGroups();
    });

    return {
      bloodGroups,
      bloodBanks,
      selectedBloodBank
    };
  },
};
</script>

<style>
</style>