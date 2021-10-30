<template>
  <div class="card user-card bg-primary text-white m-3">
    <div class="card-header mb-3">
      <p class="text-xl-start"><b>Donador</b></p>
    </div>
    <div class="card-block">
      <div class="user-image">
        <img :src="user.profilePicURL" alt="" class="img-radius" />
      </div>
      <p class="text-center">
        <b>{{ user.fullName }}</b>
      </p>
      <p class="text-center">
        <b>{{ user.age }} años</b>
      </p>
      <div class="inner-block bg-warning p-2 mb-3">
        <i class="bi bi-droplet"
          >&nbsp;{{ `${user.bloodGroup.bloodType}${user.bloodGroup.rh}` }}</i
        >
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "UserCard",
  props: {
    user: {
      type: Object,
      required: true,
      default: () => ({
        name: "Nombre",
        age: 0,
        blood: "Tipo de Sangre, RH",
      }),
    },
  },
  setup() {
    const showModal = ref(false);

    return { showModal };
  },
};
</script>

<style>
.card {
  border-radius: 2%;
  transition: transform 0.3s ease;
}

.card:hover {
  box-shadow: 0px 0px 10px 0px rgba(255, 255, 255, 0.75);
  transform: scale(1.02);
  z-index: 1;
  cursor: pointer;
}

.card-block {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
}
.img-radius {
  border-radius: 50%;
  width: 100px;
  height: 100px;
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