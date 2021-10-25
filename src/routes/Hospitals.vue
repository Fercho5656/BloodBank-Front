<template>
  <div class="container">
    <h1 class="text-white text-center">Hospitales</h1>
    <Modal :show="showModal" @close="showModal = false" @keydown.esc="showModal = false" tabindex="0">
      <HospitalForm
        :addRow="addRow"
        :editRow="updateRow"
        :form="selectedRow"
        :isEdit="editingForm"
        @close-modal="showModal = false"
      />
    </Modal>
    <DataTable
      :headers="headers"
      :content="content"
      :deleteRow="deleteRow"
      :updateRow="updateRow"
      :exclude="['id', 'contactInfoId', 'country']"
      @open-modal="showModal = true"
      @add-mode="editingForm = false; selectedRow = undefined"
      @edit-mode="(row) => {editingForm = true; selectedRow = row}"
    />
  </div>
</template>

<script>
import DataTable from "../components/DataTable.vue";
import Modal from "../components/Hospital/Modal.vue";
import HospitalForm from "../components/Hospital/HospitalForm.vue";
import { onMounted } from "@vue/runtime-core";
import { ref, reactive } from "vue";
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
  emits: ["addRow", "updateRow", "deleteRow",],
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
    const showModal = ref(false);
    const editingForm = ref(false);

    let selectedRow = reactive({});

    //CRUD Operations
    const addRow = async (data) => {
      //Adding to database
      const hospital = await addHospital(data);
      //Updating table
      content.value.push(hospital);
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
      showModal,
      editingForm,
      selectedRow,
    };
  },
};
</script>

<style>
</style>