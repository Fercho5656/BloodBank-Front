<template>
  <div class="container text-white">
    <NewDonation />
    <hr />
    <DonationHistory />
  </div>
</template>

<script>
import NewDonation from "../components/NewDonation.vue";
import DonationHistory from "../components/DonationHistory.vue";
export default {
  name: "Donations",
  components: {
    NewDonation,
    DonationHistory,
  },
};
</script>

<style>
</style>