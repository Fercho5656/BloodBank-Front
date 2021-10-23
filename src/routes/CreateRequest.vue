<template>
  <div class="container text-white">
    <h1>Formulario Solicitud de Sangre</h1>
    <h3>
      Llenar este formulario con el tipo de sangre y la cantidad en mililitros
      necesarias
    </h3>
    <p class="text-warning">* Campos requeridos</p>
    <form>
      <div class="mb-3">
        <label for="bloodGroup" class="form-label"
          >Grupo Sanguíneo <span class="text-warning">*</span>
        </label>
        <select name="bloodGroup" id="bloodGroup" class="form-select" required>
          <option selected disabled>
            Seleccione el tipo de sangre a solicitar
          </option>
          <option value="1">A+</option>
          <option value="2">A-</option>
          <option value="3">B+</option>
          <option value="4">B-</option>
          <option value="5">O+</option>
          <option value="6">O-</option>
          <option value="7">AB+</option>
          <option value="8">AB-</option>
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
        <button class="btn btn-success">Crear Solicitud</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "CreateRequest",
};
</script>

<style scoped>
.container {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
}
</style>