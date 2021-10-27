<template>
  <div class="container">
    <h1 class="text-white text-center">Hospitales</h1>
    <Modal
      :show="showModal"
      @close="showModal = false"
      @keydown.esc="showModal = false"
      tabindex="0"
    >
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
      :isLoading="isLoading"
      @reload="getData"
      @open-modal="showModal = true"
      @add-mode="
        editingForm = false;
        selectedRow = undefined;
      "
      @edit-mode="
        (row) => {
          editingForm = true;
          selectedRow = row;
        }
      "
      @delete-row="({id}) => deleteRow(id)"
      @delete-selected="(ids) => deleteRows(ids)"
    />
  </div>
</template>

<script>
import DataTable from "../components/DataTable.vue";
import Modal from "../components/Modal.vue";
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
  emits: ["addRow", "updateRow", "deleteRow", "delete"],
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
    const isLoading = ref(true);

    let selectedRow = reactive({});

    //CRUD Operations

    const getData = async () => {
      isLoading.value = true;
      content.value = await getAll();
      isLoading.value = false;
    };

    const addRow = async (data) => {
      isLoading.value = true;
      //Adding to database
      const hospital = await addHospital(data);
      //Updating table
      content.value.push(hospital);
      isLoading.value = false;
    };

    const deleteRow = async (id) => {
      if (confirm("¿Estás seguro de que deseas eliminar este registro?")) {
        isLoading.value = true;
        //Deleting from database
        await deleteHospital(id);
        //Deleting from table
        content.value = content.value.filter((row) => row.id !== id);
        isLoading.value = false;
      }
    };

    const deleteRows = async (ids) => {
      if (confirm("¿Estás seguro de que deseas eliminar estos registros?")) {
        isLoading.value = true;
        //Deleting from database
        await Promise.all(ids.map((id) => deleteHospital(id)));
        //Deleting from table
        content.value = content.value.filter((row) => !ids.includes(row.id));
        isLoading.value = false;
      }
    };

    const updateRow = async (hospitalId, contactInfoId, newRow) => {
      isLoading.value = true;
      //Updating from database
      await editHospital(hospitalId, contactInfoId, newRow);
      console.log(newRow);
      //Updating form table
      content.value = content.value.map((item) =>
        item.id !== newRow.id ? item : newRow
      );
      isLoading.value = false;
    };

    onMounted(async () => {
      await getData();
    });

    return {
      headers,
      content,
      getData,
      addRow,
      deleteRow,
      deleteRows,
      updateRow,
      showModal,
      editingForm,
      selectedRow,
      isLoading,
    };
  },
};
</script>

<style>
</style>