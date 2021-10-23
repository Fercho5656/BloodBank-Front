<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <BloodInfo />
      </div>
      <div class="col-md-3">
        <BloodInfo />
      </div>
      <div class="col-md-3">
        <BloodInfo />
      </div>
      <div class="col-md-3">
        <BloodInfo />
      </div>
    </div>
  </div>
</template>

<script>
import BloodInfo from "../components/BloodInfo.vue";
export default {
  name: "BloodInventory",
  components: {
    BloodInfo,
  },
};
</script>

<style>
</style>