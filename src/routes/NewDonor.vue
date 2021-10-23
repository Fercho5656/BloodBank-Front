<template>
  <div class="container text-white">
    <h1>Añadir Donante</h1>
    <p class="text-warning">* campo requerido</p>
    <form>
      <h2>Datos Personales</h2>
      <div class="mb-3">
        <label for="donorName" class="form-label"
          >Nombre completo <span class="text-warning">*</span></label
        >
        <input type="text" id="donorName" class="form-control" required />
      </div>
      <div class="mb-3">
        <label for="donorPic" class="form-label"
          >Foto de perfíl <span class="text-warning">*</span></label
        >
        <input type="file" id="donorPic" class="form-control" required />
      </div>
      <div class="mb-3">
        <label for="donorBloodGroup" class="form-label"
          >Grupo Sanguíneo <span class="text-warning">*</span></label
        >
        <select
          name="donorBloodGroup"
          id="donorBloodGroup"
          class="form-select"
          required
        >
          <option disabled selected>Seleccione un grupo sanguíneo</option>
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
      <hr />
      <h2>Datos de Contacto</h2>
      <div class="mb-3">
        <label for="donorAddress" class="form-label"
          >Domicilio <span class="text-warning">*</span></label
        >
        <input type="text" id="donorAddress" class="form-control" required />
      </div>
      <div class="mb-3">
        <label for="donorPostalCode" class="form-label"
          >Código Postal <span class="text-warning">*</span></label
        >
        <input
          type="number"
          id="donorPostalCode"
          class="form-control"
          required
        />
      </div>
      <div class="mb-3">
        <label for="donorCity" class="form-label"
          >Ciudad <span class="text-warning">*</span></label
        >
        <input type="text" id="donorCity" class="form-control" required />
      </div>
      <div class="mb-3">
        <label for="donorState" class="form-label">Estado</label>
        <input type="text" id="donorState" class="form-control" />
      </div>
      <div class="mb-3">
        <label for="donorCountry" class="form-label">País</label>
        <input type="text" id="donorCountry" class="form-control" />
      </div>
      <div class="mb-3">
        <label for="donorPhone" class="form-label"
          >Teléfono <span class="text-warning">*</span></label
        >
        <input
          type="tel"
          id="donorPhone"
          class="form-control"
          pattern="[0-9]{10,14}"
          required
        />
      </div>
      <div class="mb-3">
        <label for="donorEmail" class="form-label"
          >Correo Electrónico <span class="text-warning">*</span></label
        >
        <input type="email" id="donorEmail" class="form-control" required />
      </div>
      <div class="mb-3">
        <button class="btn btn-success">Agregar Donante</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "NewDonor",
};
</script>

<style>
</style>