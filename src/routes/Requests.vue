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
    <RequestsHistory :requests="requestsHistory" />
    <hr />
    <PendingRequests
      :requests="pendingRequests"
      @accept-request="solveRequest"
      @reject-request="solveRequest"
    />
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
import PendingRequests from "../components/Requests/PendingRequests.vue";
import RequestForm from "../components/Requests/RequestForm.vue";
import Modal from "../components/Modal.vue";
import Loading from "../components/Loading.vue";
import { getBloodGroupsInfo } from "../services/API/BloodGroups";
import { getHospitals } from "../services/API/Hospital";
import {
  getRequests,
  createRequest,
  updateRequest,
} from "../services/API/Requests";
import { onMounted, ref } from "vue";
export default {
  name: "Requests",
  components: {
    RequestsHistory,
    PendingRequests,
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
    const pendingRequests = ref([]);

    const sendRequest = async (request) => {
      isLoading.value = true;
      const result = await createRequest(request);
      pendingRequests.value.push(result);
      isLoading.value = false;
    };

    // Sets request status as accepted or rejected
    const solveRequest = async ({ request, status }) => {
      const messageStatus = status === "Aceptada" ? "aceptar" : "rechazar";
      if (confirm(`¿Deseas ${messageStatus} esta petición?`)) {
        isLoading.value = true;
        const newRequest = {
          quantity: request.quantity,
          active: false,
          status,
          date: new Date(request.date),
          hospitalId: request.hospital.id,
          bloodGroupId: request.bloodGroup.id,
        };
        const result = await updateRequest(newRequest, request.id);
        const index = pendingRequests.value.findIndex(
          (r) => r.id === request.id
        );
        //Updates the request in the pending and history requests arrays
        pendingRequests.value.splice(index, 1);
        requestsHistory.value.push(result);
        isLoading.value = false;
      }
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
      pendingRequests.value = requestsInfo.filter(
        (request) => request.active === true
      );
      isLoading.value = false;
    });

    return {
      isLoading,
      showCreateRequestModal,
      bloodGroups,
      hospitals,
      sendRequest,
      requestsHistory,
      pendingRequests,
      solveRequest,
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