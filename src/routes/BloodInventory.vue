<template>
  <div class="container">
    <select
      v-model="selectedBloodBank"
      @change="changeBloodBank"
      class="form-control"
    >
      <option value="0" disabled>Seleccione un banco</option>
      <option
        v-for="bloodBank in bloodBanks"
        :value="bloodBank.id"
        :key="bloodBank.id"
      >
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
  <Loading text="Cargando..." v-if="isLoading" />
</template>

<script>
import BloodInfo from "../components/BloodInventory/BloodInfo.vue";
import Loading from "../components/Loading.vue";
import { getByBankId } from "../services/API/BloodGroups";
import { getAllBloodBanks } from "../services/API/BloodBanks";
import { onMounted, ref } from "vue";
export default {
  name: "BloodInventory",
  components: {
    BloodInfo,
    Loading,
  },
  setup() {
    const bloodGroups = ref([]);
    const bloodBanks = ref([]);
    const selectedBloodBank = ref(3);
    const isLoading = ref(true);

    const getBloodGroups = async (id) => await getByBankId(id);

    const getBloodBanks = async () => await getAllBloodBanks();

    const changeBloodBank = async () => {
      isLoading.value = true;
      bloodGroups.value = await getBloodGroups(selectedBloodBank.value);
      isLoading.value = false;
    };

    onMounted(async () => {
      isLoading.value = true;
      const [$bloodBanks, $bloodGroups] = await Promise.all([
        getBloodBanks(),
        getBloodGroups(selectedBloodBank.value),
      ]);
      bloodGroups.value = $bloodGroups;
      bloodBanks.value = $bloodBanks;
      isLoading.value = false;
    });

    return {
      bloodGroups,
      bloodBanks,
      selectedBloodBank,
      isLoading,
      changeBloodBank,
    };
  },
};
</script>

<style>
</style>