<template>
  <div class="card user-card bg-primary text-white m-3">
    <div class="card-header mb-3">
      <p class="text-xl-start"><b>Donador</b></p>
    </div>
    <div class="card-block">
      <div class="user-image">
        <img
          src="https://bootdey.com/img/Content/avatar/avatar7.png"
          alt=""
          class="img-radius"
        />
      </div>
      <p class="text-xl-center"><b>Nombre</b></p>
      <p class="text-xl-center"><b>21 años</b></p>
      <div class="inner-block bg-warning p-2 mb-3">
        <i class="bi bi-droplet">&nbsp;A+</i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserCard",
};
</script>

<style>
.card {
  border-radius: 2%;
}
.card-block {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
}
.img-radius {
  border-radius: 50%;
  width: 100px;
}

.lg-badge {
  font-size: 1em;
}
.inner-block {
  border-radius: 10%;
  display: flex;
  flex-flow: row-reverse nowrap;
}
.bi {
  font-size: 2em;
}
</style>