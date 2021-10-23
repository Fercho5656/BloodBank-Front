<template>
  <div class="container">
    <DataTable
      :headers="headers"
      :content="content"
      :deleteRow="deleteRow"
      :updateRow="updateRow"
      @open-modal="showingModal = true"
    />
    <Modal v-show="showingModal" @close="showingModal = false">
      <HospitalForm
        :addRow="addRow"
        :editRow="updateRow"
        :hideModal="setShowingModal"
        :form="selectedRow"
      />
    </Modal>
  </div>
</template>

<script>
import DataTable from "../components/DataTable.vue";
import Modal from "../components/Hospital/Modal.vue";
import HospitalForm from "../components/Hospital/HospitalForm.vue";
import { onMounted } from "@vue/runtime-core";
import { ref } from "vue";
import {
  getAll,
  deleteHospital,
  addHospital,
  editHospital,
} from "../services/API/Hospital";
export default {
  name: "Hospitals",
  components: {
    DataTable,
    Modal,
    HospitalForm,
  },
  setup() {
    const headers = [
      "Nombre",
      "Domicilio",
      "Código Postal",
      "Ciudad",
      "Estado",
      "Teléfono",
      "Correo Electrónico",
    ];
    const content = ref([]);

    const showingModal = ref(false);

    //CRUD Operations
    const addRow = async (data) => {
      //Adding to database
      await addHospital(data);
      //Updating table
      content.value.push(data);
    };

    const deleteRow = async (id) => {
      //Deleting from database
      await deleteHospital(id);
      //Deleting from table
      content.value = content.value.filter((item) => item.id != id);
    };

    const updateRow = async (hospitalId, contactInfoId, newRow) => {
      //Updating from database
      await editHospital(hospitalId, contactInfoId, newRow);
      console.log(newRow);
      //Updating form table
      content.value = content.value.map((item) =>
        item.id !== newRow.id ? item : newRow
      );
    };

    onMounted(async () => (content.value = await getAll()));

    return {
      headers,
      content,
      addRow,
      deleteRow,
      updateRow,
      showingModal,
    };
  },
};
</script>

<style>
</style>