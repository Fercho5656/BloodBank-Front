<template>
  <h5 v-if="isEdit">Editar Hospital</h5>
  <h5 v-else>Añadir Hospital</h5>
  <hr />
  <strong class="mb-3">Información del hospital</strong>
  <form @submit.prevent="send">
    <div class="mb-3">
      <label class="form-label" for="hospitalName">Nombre del Hospital</label>
      <input
        required
        type="text"
        class="form-control"
        id="hospitalName"
        v-model="formData.name"
      />
    </div>
    <strong>Información de contacto</strong>
    <div class="mb-3">
      <label for="hospitalAddress">Domicilio</label>
      <input
        required
        type="text"
        class="form-control"
        id="hospitalAddress"
        v-model="formData.address"
      />
    </div>
    <div class="mb-3 two-inputs">
      <div>
        <label for="hospitalPostalCode">Código Postal</label>
        <input
          required
          type="number"
          class="form-control"
          id="hospitalPostalCode"
          v-model="formData.postalCode"
        />
      </div>
      <div>
        <label for="hospitalCity">Ciudad</label>
        <input
          required
          type="text"
          class="form-control"
          id="hospitalCity"
          v-model="formData.city"
        />
      </div>
    </div>
    <div class="mb-3 two-inputs">
      <div>
        <label for="hospitalState">Estado</label>
        <input
          required
          type="text"
          class="form-control"
          id="hospitalState"
          v-model="formData.state"
        />
      </div>
      <div>
        <label for="hospitalCountry">País</label>
        <input
          type="text"
          class="form-control"
          id="hospitalCountry"
          v-model="formData.country"
        />
      </div>
    </div>
    <div class="mb-3">
      <label for="hospitalPhone">Teléfono</label>
      <input
        required
        type="tel"
        class="form-control"
        id="hospitalPhone"
        v-model="formData.phone"
      />
    </div>
    <div class="mb-3">
      <label for="hospitalEmail">Correo Electrónico</label>
      <input
        required
        type="email"
        class="form-control"
        id="hospitalEmail"
        v-model="formData.email"
      />
    </div>
    <hr />
    <button class="btn btn-success" :disabled="disabledForm">
      <template v-if="isEdit">Editar</template>
      <template v-else>Añadir</template>
    </button>
  </form>
</template>

<script>
import { onMounted, reactive, ref } from "vue";
export default {
  name: "HospitalForm",
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
  },
};
</script>

<style>
.two-inputs {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>