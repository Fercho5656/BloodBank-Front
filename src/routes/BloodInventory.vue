<template>
  <div class="container">
    <header class="inventory-header">
      <select
        v-model="selectedBloodBank"
        @change="changeBloodBank"
        class="form-control mx-2"
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
      <button class="btn btn-success" @click="prepareReport">
        <i class="bi bi-download"></i>
      </button>
    </header>
    <div class="row">
      <div
        class="col-12 col-sm-6 col-md-4 col-lg-3"
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
  <Modal
    :show="showPrintModal"
    @close="showPrintModal = false"
    @keydown="showPrintModal = false"
    tabindex="0"
  >
    <InventoryReport
      :data="reportData"
      :title="`Inventario ${selectedBankName}`"
      description="Cantidad de sangre en mililitros"
    />
  </Modal>
</template>

<script>
import BloodInfo from "../components/BloodInventory/BloodInfo.vue";
import InventoryReport from "../components/BloodInventory/InventoryReport.vue";
import Modal from "../components/Modal.vue";
import Loading from "../components/Loading.vue";
import { getByBankId } from "../services/API/BloodGroups";
import { getAllBloodBanks } from "../services/API/BloodBanks";
import { onMounted, ref } from "vue";
export default {
  name: "BloodInventory",
  components: {
    BloodInfo,
    Loading,
    Modal,
    InventoryReport,
  },
  setup() {
    const bloodGroups = ref([]);
    const bloodBanks = ref([]);
    const selectedBloodBank = ref(3);
    const isLoading = ref(true);
    const showPrintModal = ref(false);
    const reportData = ref([]);
    const selectedBankName = ref("");

    const getBloodGroups = async (id) => await getByBankId(id);

    const getBloodBanks = async () => await getAllBloodBanks();

    const changeBloodBank = async () => {
      isLoading.value = true;
      bloodGroups.value = await getBloodGroups(selectedBloodBank.value);
      isLoading.value = false;
    };

    const prepareReport = () => {
      reportData.value = bloodGroups.value.map((bloodGroupInfo) => {
        const { bloodGroup, quantity } = bloodGroupInfo;
        return [`${bloodGroup.bloodType}${bloodGroup.rh}`, quantity];
      });
      selectedBankName.value = bloodBanks.value.filter(
        (bloodBank) => bloodBank.id === selectedBloodBank.value
      )[0].bankName;
      showPrintModal.value = true;
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
      showPrintModal,
      prepareReport,
      reportData,
      selectedBankName,
    };
  },
};
</script>

<style scoped>
.inventory-header {
  display: flex;
  flex-flow: row nowrap;
}
@media print {
  @page {
    size: letter;
  }
}
</style>