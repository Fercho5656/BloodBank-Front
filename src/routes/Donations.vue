<template>
  <div class="container">
    <Modal
      :show="showModal"
      @close="showModal = false"
      @keydown.esc="showModal = false"
      tabindex="0"
    >
      <NewDonation :donors="donors" @send-donation="sendDonation"/>
    </Modal>
    <DonationHistory :donations="donations" @add-donation="showModal = true" />
  </div>
  <Loading v-if="isLoading" />
</template>

<script>
import NewDonation from "../components/Donations/NewDonation.vue";
import Modal from "../components/Modal.vue";
import DonationHistory from "../components/Donations/DonationHistory.vue";
import Loading from "../components/Loading.vue";
import { getDonations, addDonation } from "../services/API/Donations";
import { getDonors } from "../services/API/Donors";
import { onMounted, ref } from "vue";
export default {
  name: "Donations",
  components: {
    NewDonation,
    DonationHistory,
    Loading,
    Modal,
  },
  emits: ["add-donation"],
  setup() {
    const isLoading = ref(true);
    const donations = ref([]);
    const donors = ref([]);
    const showModal = ref(false);

    const getDonationsList = async () => {
      const donations = await getDonations();
      console.table(donations);
      return donations;
    };

    const getDonorsList = async () => {
      const donors = await getDonors();
      console.table(donors);
      return donors;
    }

    const sendDonation = async (donation) => {
      isLoading.value = true;
      const response = await addDonation(donation);
      donations.value.push(response);
      isLoading.value = false;
      showModal.value = false;
    }

    onMounted(async () => {
      isLoading.value = true;
      donations.value = await getDonationsList();
      donors.value = await getDonorsList();
      isLoading.value = false;
    });

    return {
      donations,
      isLoading,
      showModal,
      donors,
      sendDonation
    };
  },
};
</script>

<style>
</style>