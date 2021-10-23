<template>
  <div class="container">
    <div class="row">
      <div class="col-md-4">
        <UserCard />
      </div>
      <div class="col-md-4">
        <UserCard />
      </div>
      <div class="col-md-4">
        <UserCard />
      </div>
    </div>
  </div>
</template>

<script>
import UserCard from "../components/UserCard.vue";
export default {
  name: "Donors",
  components: { UserCard },
};
</script>

<style>
</style>