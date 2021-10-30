<template>
  <div class="container">
    <div class="row">
      <button class="btn btn-success btn-lg" @click="showAddDonorModal = true">
        Añadir Donador
      </button>
      <div class="col-md-4" v-for="donor in donors" :key="donor.id">
        <UserCard
          :user="donor"
          @click="
            showDonorInfoModal = true;
            selectedDonor = donor;
          "
        />
      </div>
    </div>
  </div>
  <Loading v-if="isLoading" />
  <Modal
    :show="showAddDonorModal"
    @close="showAddDonorModal = false"
    @keydown.esc="showAddDonorModal = false"
    tabindex="0"
  >
    <DonorForm />
  </Modal>
  <Modal
    :show="showDonorInfoModal"
    @close="showDonorInfoModal = false"
    @keydown.esc="showDonorInfoModal = false"
    tabindex="0"
  >
    <UserInfo :user="selectedDonor" />
  </Modal>
</template>

<script>
import UserCard from "../components/UserCard.vue";
import UserInfo from "../components/Donors/UserInfo.vue";
import DonorForm from "../components/Donors/DonorForm.vue";
import Loading from "../components/Loading.vue";
import Modal from "../components/Modal.vue";
import { onMounted, ref, reactive } from "vue";
import { getDonors } from "../services/API/Donors";
export default {
  name: "Donors",
  components: { UserCard, UserInfo, Loading, Modal, DonorForm },
  setup() {
    const donors = ref([]);
    const isLoading = ref(true);
    const showDonorInfoModal = ref(false);
    const showAddDonorModal = ref(false);
    let selectedDonor = reactive({});

    const getAllDonors = async () => {
      isLoading.value = true;
      const response = await getDonors();
      isLoading.value = false;
      return response;
    };

    onMounted(async () => {
      donors.value = await getAllDonors();
    });

    return {
      donors,
      isLoading,
      showDonorInfoModal,
      selectedDonor,
      showAddDonorModal,
    };
  },
};
</script>

<style>
</style>