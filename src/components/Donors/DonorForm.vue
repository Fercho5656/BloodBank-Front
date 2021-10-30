<template>
  <h5 v-if="isEdit">Editar Donador</h5>
  <h5 v-else>Añadir Donador</h5>
  <hr />
  <strong class="mb-3">Información del Donador</strong>
  <form @submit.prevent="send">
    <div class="mb-3">
      <label class="form-label" for="donorName">Nombre del Donador</label>
      <input
        required
        type="text"
        class="form-control"
        id="donorName"
        v-model="formData.name"
      />
    </div>
    <div class="row mb-3">
      <div class="col-6">
        <label class="form-label" for="donorBloodGroup">Grupo Sanguíneo</label>
        <select
          required
          class="form-control"
          id="donorBloodGroup"
          v-model="formData.blood_group"
        >
          <option value="0" selected disabled>
            Seleccione un Grupo Sanguíneo
          </option>
          <option
            v-for="bloodGroup in bloodGroups"
            :value="bloodGroup.id"
            :key="bloodGroup.id"
          >
            {{ bloodGroup.name }}
          </option>
        </select>
      </div>
      <div class="col-6">
        <label class="form-label" for="birthdate">Fecha de Nacimiento</label>
        <input
          required
          type="date"
          class="form-control"
          id="birthdate"
          v-model="formData.birthdate"
        />
      </div>
    </div>
    <strong>Información de contacto</strong>
    <div class="row">
      <div class="mb-3 col-6">
        <label for="donorAddress">Domicilio</label>
        <input
          required
          type="text"
          class="form-control"
          id="donorAddress"
          v-model="formData.address"
        />
      </div>
      <div class="mb-3 col-6">
        <label for="donorPostalCode">Código Postal</label>
        <input
          required
          type="number"
          class="form-control"
          id="donorPostalCode"
          v-model="formData.postalCode"
        />
      </div>
    </div>
    <div class="row">
      <div class="mb-3 col-6">
        <label for="donorCity">Ciudad</label>
        <input
          required
          type="text"
          class="form-control"
          id="donorCity"
          v-model="formData.city"
        />
      </div>
      <div class="mb-3 col-6">
        <label for="donorState">Estado</label>
        <input
          required
          type="text"
          class="form-control"
          id="donorState"
          v-model="formData.state"
        />
      </div>
    </div>
    <div class="row">
      <div class="mb-3 col-8">
        <label for="donorEmail">Correo Electrónico</label>
        <input
          required
          type="email"
          class="form-control"
          id="donorEmail"
          v-model="formData.email"
        />
      </div>
      <div class="mb-3 col-4">
        <label for="donorPhone">Teléfono</label>
        <input
          required
          type="tel"
          class="form-control"
          id="donorPhone"
          v-model="formData.phone"
        />
      </div>
    </div>
    <hr />
    <button class="btn btn-success" :disabled="disabledForm">
      <template v-if="isEdit">Editar</template>
      <template v-else>Añadir</template>
    </button>
  </form>
</template>

<script>
import {ref, reactive, onMounted} from 'vue'
export default {
  name: "DonorForm",
  props: {
    addRow: Function,
    editRow: Function,
    form: Object,
    isEdit: Boolean,
  },
  emits: ["add", "edit", "close-modal"],
  setup(props, { emit }) {
    const formData = reactive({ ...props.form });
    const disabledForm = ref(false);

    onMounted(() => {
      console.log("formData: ", formData);
      if (props.isEdit) {
        formData.name = props.form.name;
        formData.address = props.form.address;
        formData.postalCode = props.form.postalCode;
        formData.city = props.form.city;
        formData.state = props.form.state;
        formData.phone = props.form.phone;
        formData.email = props.form.email;
        formData.contactInfoId = props.form.contactInfoId;
      }
    });

    const send = async () => {
      disabledForm.value = true;
      props.isEdit
        ? await props.editRow(formData.id, formData.contactInfoId, formData)
        : await props.addRow(formData);
      emit("close-modal");
      disabledForm.value = false;
    };

    return {
      send,
      formData,
      disabledForm
    };
  }
};
</script>

<style>

</style>