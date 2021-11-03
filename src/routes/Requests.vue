<template>
  <div class="container">
    <header class="text-white">
      <h1>Peticiones de Sangre</h1>
      <button
        class="btn btn-success btn-xl"
        @click="showCreateRequestModal = true"
      >
        Abrir Petición
      </button>
    </header>
    <!-- Add dynamic data (no placeholder -_-) -->
    <RequestsHistory :requests="requestsHistory" />
    <hr />
    <PendientRequests />
    <Modal
      :show="showCreateRequestModal"
      @close="showCreateRequestModal = false"
      @keydown.esc="showCreateRequestModal = false"
      tabindex="0"
    >
      <RequestForm
        :bloodGroups="bloodGroups"
        :hospitals="hospitals"
        @send-request="sendRequest"
      />
    </Modal>
    <Loading v-if="isLoading" />
  </div>
</template>

<script>
import RequestsHistory from "../components/Requests/RequestsHistory.vue";
import PendientRequests from "../components/Requests/PendientRequests.vue";
import RequestForm from "../components/Requests/RequestForm.vue";
import Modal from "../components/Modal.vue";
import Loading from "../components/Loading.vue";
import { getBloodGroupsInfo } from "../services/API/BloodGroups";
import { getHospitals } from "../services/API/Hospital";
import { getRequests, createRequest } from "../services/API/Requests";
import { onMounted, ref } from "vue";
export default {
  name: "Requests",
  components: {
    RequestsHistory,
    PendientRequests,
    RequestForm,
    Modal,
    Loading,
  },
  setup() {
    const showCreateRequestModal = ref(false);
    const isLoading = ref(false);

    const bloodGroups = ref([]);
    const hospitals = ref([]);

    const requestsHistory = ref([]);
    const pendientRequests = ref([]);

    const sendRequest = async (request) => {
      isLoading.value = true;
      const result = await createRequest(request);
      pendientRequests.value.push(result);
      isLoading.value = false;
    };

    onMounted(async () => {
      isLoading.value = true;
      const [bloodGroupsInfo, hospitalsInfo, requestsInfo] = await Promise.all([
        getBloodGroupsInfo(),
        getHospitals(),
        getRequests(),
      ]);

      bloodGroups.value = bloodGroupsInfo;
      hospitals.value = hospitalsInfo;
      //Requests
      requestsHistory.value = requestsInfo.filter(
        (request) => request.active === false
      );
      pendientRequests.value = requestsInfo.filter(
        (request) => request.active === true
      );

      console.log("history", requestsHistory.value);
      console.log("pending", pendientRequests.value);
      isLoading.value = false;
    });

    return {
      isLoading,
      showCreateRequestModal,
      bloodGroups,
      hospitals,
      sendRequest,
      requestsHistory,
      pendientRequests,
    };
  },
};
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>