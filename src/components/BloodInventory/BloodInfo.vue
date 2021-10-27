<template>
  <div class="card user-card bg-primary text-white m-3">
    <div class="card-header">
      <i class="bi bi-droplet bloodicon" />
    </div>
    <div class="card-block">
      <div class="inner-block bg-warning">
          <div class="bloodgroup">
              <i class="bi bi-people-fill p-2" />
              <p class="p-2"><strong>{{bloodgroup}}</strong></p>
          </div>
          <div class="vr" />
          <div class="quantity">
              <i class="bi bi-box p-2" />
              <p class="p-2">{{quantity}} mL</p>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BloodInfo",
  props: {
    bloodgroup: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true,
    }
  }
};
</script>

<style scoped>
.card {
  border-radius: 2%;
}
.card-header {
    display: flex;
    justify-content: center;
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
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-evenly;
  width: 100%;
}
.bloodicon {
  font-size: 7em;
}
.bloodgroup, .quantity {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    font-size: 1.75rem;
}
</style>