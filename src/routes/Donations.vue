<template>
  <div class="container text-white">
    <NewDonation />
    <hr />
    <DonationHistory :donations="donations" />
  </div>
  <Loading v-if="isLoading" />
</template>

<script>
import NewDonation from "../components/NewDonation.vue";
import DonationHistory from "../components/DonationHistory.vue";
import Loading from "../components/Loading.vue";
import { getDonations } from "../services/API/Donations";
import { onMounted, ref } from "vue";
export default {
  name: "Donations",
  components: {
    NewDonation,
    DonationHistory,
    Loading,
  },
  setup() {
    const isLoading = ref(true);
    const donations = ref([]);

    const getDonationsList = async () => {
      const donations = await getDonations();
      console.table(donations);
      return donations;
    };

    onMounted(async () => {
      isLoading.value = true;
      donations.value = await getDonationsList();
      isLoading.value = false;
    });

    return {
      donations,
      isLoading
    };
  },
};
</script>

<style>
</style>