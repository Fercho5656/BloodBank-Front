<template>
  <div class="container">
    <Modal
      :show="showModal"
      @close="showModal = false"
      @keydown.esc="showModal = false"
      tabindex="0"
    >
      <NewDonation :donors="donors" @send-donation="sendDonation" />
    </Modal>
    <Modal
      :show="showReportModal"
      @close="showReportModal = false"
      @keydown.esc="showReportModal = false"
      tabindex="0"
    >
      <DonationReport :donations="donations" />
    </Modal>
    <DonationHistory
      :donations="donations"
      @add-donation="showModal = true"
      @prepareReport="showReportModal = true"
    />
  </div>
  <Loading v-if="isLoading" />
</template>

<script>
import NewDonation from "../components/Donations/NewDonation.vue";
import DonationReport from "../components/Donations/DonationReport.vue";
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
    DonationReport,
    Loading,
    Modal,
  },
  emits: ["add-donation"],
  setup() {
    const isLoading = ref(true);
    const donations = ref([]);
    const donors = ref([]);
    const showModal = ref(false);
    const showReportModal = ref(false);

    const sendDonation = async (donation) => {
      isLoading.value = true;
      const response = await addDonation(donation);
      donations.value.push(response);
      isLoading.value = false;
      showModal.value = false;
    };

    onMounted(async () => {
      isLoading.value = true;
      const [$donations, $donors] = await Promise.all([
        getDonations(),
        getDonors(),
      ]);
      donations.value = $donations;
      donors.value = $donors;
      isLoading.value = false;
    });

    return {
      donations,
      isLoading,
      showModal,
      donors,
      sendDonation,
      showReportModal,
    };
  },
};
</script>

<style>
</style>