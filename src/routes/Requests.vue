<template>
  <div class="container text-white">
    <h1>Peticiones de Sangre</h1>
    <RequestsHistory />
    <hr />
    <PendientRequests />
  </div>
</template>

<script>
import RequestsHistory from "../components/RequestsHistory.vue";
import PendientRequests from "../components/PendientRequests.vue";
export default {
  name: "Requests",
  components: {
    RequestsHistory,
    PendientRequests,
  },
};
</script>

<style scoped>
</style>