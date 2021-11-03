<template>
  <h1>Formulario Solicitud de Sangre</h1>
  <p>
    Llenar este formulario con el tipo de sangre,
    la cantidad en mililitros necesarias y el hospital solicitante.
  </p>
  <p class="text-warning">* Campos requeridos</p>
  <hr>
  <form @submit.prevent="$emit('send-request')">
    <div class="mb-3">
      <label for="bloodGroup" class="form-label"
        >Grupo Sanguíneo <span class="text-warning">*</span>
      </label>
      <select required id="bloodGroup" class="form-control" v-model="selectedBloodGroup">
        <option value="" disabled>Seleccione un grupo sanguíneo</option>
        <option
          v-for="bloodGroup in bloodGroupsValue"
          :value="bloodGroup.id"
          :key="bloodGroup.id"
        >
          {{ `${bloodGroup.bloodType}${bloodGroup.rh}` }}
        </option>
      </select>
    </div>
    <div class="mb-3">
      <label for="hospital" class="form-label"
        >Hospital <span class="text-warning">*</span>
      </label>

      <select required id="hospital" class="form-control" v-model="selectedHospital">
        <option value="" disabled>Seleccione un hospital</option>
        <option
          v-for="hospital in hospitalsValue"
          :value="hospital.id"
          :key="hospital.id"
        >
          {{ hospital.name }}
        </option>
      </select>
    </div>
    <div class="mb-3">
      <label for="bloodQuantity" class="form-label"
        >Cantidad (mL) <span class="text-warning">*</span>
      </label>
      <input
        type="number"
        class="form-control"
        id="bloodQuantity"
        min="0"
        required
        placeholder="0 mL"
      />
    </div>
    <div class="mb-3 buttons">
      <button class="btn btn-success" @click="$emit('send-request')">
        Crear Solicitud
      </button>
    </div>
  </form>
</template>

<script>
import { ref } from "vue";
export default {
  name: "RequestForm",
  props: {
    bloodGroups: {
      type: Array,
      required: true,
    },
    hospitals: {
      type: Array,
      required: true,
    },
  },
  emits: ["send-request"],
  setup() {
    const selectedBloodGroup = ref(0);
    const selectedHospital = ref(0);

    return {
      selectedBloodGroup,
      selectedHospital,
    };
  },
  computed: {
    bloodGroupsValue() {
      return this.bloodGroups;
    },
    hospitalsValue() {
      return this.hospitals;
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
}
</style>